#!/usr/bin/env python3
"""
IAM Frontend Deployment Script

This script deploys the IAM frontend to S3 and invalidates CloudFront cache.
It uploads the dist folder to a versioned path based on the git commit hash,
then copies the index.html to the base path for the current deployment.

Usage:
    python deploy.py [--env {iam|iam-test}] [--dry-run]

Environment Variables:
    S3_BUCKET: S3 bucket name (default: iam-cloudfront-data-dev-static-site)
    CLOUDFRONT_DISTRIBUTION_ID: CloudFront distribution ID (default: E1KF6H7QT88O0A)
    AWS_PROFILE: AWS profile to use (must be set by user)
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path
from typing import Optional


class DeploymentConfig:
    """Configuration for deployment"""

    def __init__(
        self,
        s3_bucket: str,
        cloudfront_distribution_id: str,
        deployment_env: str,
        dry_run: bool = False
    ):
        self.s3_bucket = s3_bucket
        self.cloudfront_distribution_id = cloudfront_distribution_id
        self.deployment_env = deployment_env
        self.dry_run = dry_run
        self.git_sha: Optional[str] = None
        self.dist_path = Path(__file__).parent / "dist"

    @property
    def s3_base_path(self) -> str:
        """Get the S3 base path for the deployment environment"""
        return f"s3://{self.s3_bucket}/{self.deployment_env}"

    @property
    def s3_versioned_path(self) -> str:
        """Get the S3 versioned path including git SHA"""
        if not self.git_sha:
            raise ValueError("Git SHA not set")
        return f"{self.s3_base_path}/{self.git_sha}"

    @property
    def cloudfront_invalidation_path(self) -> str:
        """Get the CloudFront path to invalidate"""
        return f"/{self.deployment_env}/*"


class DeploymentError(Exception):
    """Custom exception for deployment errors"""
    pass


def run_command(cmd: list[str], check: bool = True, capture_output: bool = False) -> subprocess.CompletedProcess:
    """
    Run a shell command and handle errors

    Args:
        cmd: Command and arguments as a list
        check: Whether to raise an exception on non-zero exit code
        capture_output: Whether to capture stdout/stderr

    Returns:
        CompletedProcess object

    Raises:
        DeploymentError: If command fails and check=True
    """
    try:
        print(f"Running: {' '.join(cmd)}")
        result = subprocess.run(
            cmd,
            check=check,
            capture_output=capture_output,
            text=True
        )
        return result
    except subprocess.CalledProcessError as e:
        raise DeploymentError(f"Command failed: {' '.join(cmd)}\nError: {e.stderr if capture_output else str(e)}")


def get_git_sha() -> str:
    """
    Get the current git commit SHA

    Returns:
        Full git commit SHA

    Raises:
        DeploymentError: If git command fails
    """
    try:
        result = run_command(
            ["git", "rev-parse", "HEAD"],
            capture_output=True
        )
        return result.stdout.strip()
    except DeploymentError:
        raise DeploymentError("Failed to get git commit SHA. Ensure you're in a git repository.")


def verify_aws_credentials() -> None:
    """
    Verify AWS credentials are configured

    Raises:
        DeploymentError: If AWS credentials are not configured
    """
    if not os.environ.get("AWS_PROFILE"):
        raise DeploymentError(
            "AWS_PROFILE environment variable not set. "
            "Please export AWS_PROFILE before running this script."
        )

    try:
        run_command(["aws", "sts", "get-caller-identity"], capture_output=True)
    except DeploymentError:
        raise DeploymentError(
            "AWS credentials not configured or invalid. "
            "Please check your AWS_PROFILE and credentials."
        )


def verify_dist_folder(dist_path: Path) -> None:
    """
    Verify the dist folder exists and contains index.html

    Args:
        dist_path: Path to the dist folder

    Raises:
        DeploymentError: If dist folder is invalid
    """
    if not dist_path.exists():
        raise DeploymentError(
            f"dist folder not found at {dist_path}. "
            "Please run 'pnpm build' first."
        )

    index_html = dist_path / "index.html"
    if not index_html.exists():
        raise DeploymentError(
            f"index.html not found in {dist_path}. "
            "Please ensure the build completed successfully."
        )


def upload_to_s3(config: DeploymentConfig) -> None:
    """
    Upload dist folder contents to S3

    Args:
        config: Deployment configuration

    Raises:
        DeploymentError: If upload fails
    """
    print(f"\n{'[DRY RUN] ' if config.dry_run else ''}Uploading dist folder to S3...")
    print(f"Source: {config.dist_path}")
    print(f"Destination: {config.s3_versioned_path}")

    if config.dry_run:
        print("[DRY RUN] Would upload files to S3 (skipping actual upload)")
        return

    # Upload all files except index.html with long cache
    sync_cmd = [
        "aws", "s3", "sync",
        str(config.dist_path),
        f"{config.s3_versioned_path}/",
        "--delete",
        "--cache-control", "public, max-age=31536000, immutable",
        "--exclude", "index.html"
    ]
    run_command(sync_cmd)

    # Upload index.html to versioned path with no-cache
    versioned_index_cmd = [
        "aws", "s3", "cp",
        str(config.dist_path / "index.html"),
        f"{config.s3_versioned_path}/index.html",
        "--cache-control", "no-cache, no-store, must-revalidate"
    ]
    run_command(versioned_index_cmd)

    # Upload index.html to base path (current deployment)
    base_index_cmd = [
        "aws", "s3", "cp",
        str(config.dist_path / "index.html"),
        f"{config.s3_base_path}/index.html",
        "--cache-control", "no-cache, no-store, must-revalidate"
    ]
    run_command(base_index_cmd)

    print("✓ Upload completed successfully")


def invalidate_cloudfront(config: DeploymentConfig) -> None:
    """
    Invalidate CloudFront cache

    Args:
        config: Deployment configuration

    Raises:
        DeploymentError: If invalidation fails
    """
    print(f"\n{'[DRY RUN] ' if config.dry_run else ''}Invalidating CloudFront cache...")
    print(f"Distribution: {config.cloudfront_distribution_id}")
    print(f"Path: {config.cloudfront_invalidation_path}")

    if config.dry_run:
        print("[DRY RUN] Would create CloudFront invalidation (skipping)")
        return

    invalidation_cmd = [
        "aws", "cloudfront", "create-invalidation",
        "--distribution-id", config.cloudfront_distribution_id,
        "--paths", config.cloudfront_invalidation_path,
        "--no-cli-pager"
    ]
    run_command(invalidation_cmd)

    print("✓ CloudFront invalidation created successfully")


def main() -> int:
    """
    Main deployment function

    Returns:
        Exit code (0 for success, 1 for failure)
    """
    # Parse command line arguments
    parser = argparse.ArgumentParser(
        description="Deploy IAM Frontend to S3 and invalidate CloudFront cache",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Deploy to iam-test (default)
  python deploy.py

  # Deploy to iam (production)
  python deploy.py --env iam

  # Dry run to see what would happen
  python deploy.py --env iam --dry-run

Environment Variables:
  AWS_PROFILE                    AWS profile to use (required)
  S3_BUCKET                      S3 bucket name (default: iam-cloudfront-data-dev-static-site)
  CLOUDFRONT_DISTRIBUTION_ID     CloudFront distribution ID (default: E1KF6H7QT88O0A)
        """
    )
    parser.add_argument(
        "--env",
        choices=["iam", "iam-test"],
        default="iam-test",
        help="Deployment environment (default: iam-test)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without actually doing it"
    )

    args = parser.parse_args()

    # Get configuration from environment or use defaults
    s3_bucket = os.environ.get("S3_BUCKET", "iam-cloudfront-data-dev-static-site")
    cloudfront_distribution_id = os.environ.get("CLOUDFRONT_DISTRIBUTION_ID", "E1KF6H7QT88O0A")

    try:
        # Create deployment configuration
        config = DeploymentConfig(
            s3_bucket=s3_bucket,
            cloudfront_distribution_id=cloudfront_distribution_id,
            deployment_env=args.env,
            dry_run=args.dry_run
        )

        # Print deployment info
        print("=" * 70)
        print("IAM Frontend Deployment")
        print("=" * 70)
        print(f"Environment: {config.deployment_env}")
        print(f"S3 Bucket: {config.s3_bucket}")
        print(f"CloudFront Distribution: {config.cloudfront_distribution_id}")
        if config.dry_run:
            print("\n⚠️  DRY RUN MODE - No changes will be made")
        print("=" * 70)

        # Pre-flight checks
        print("\n📋 Running pre-flight checks...")
        verify_aws_credentials()
        print("✓ AWS credentials verified")

        verify_dist_folder(config.dist_path)
        print(f"✓ dist folder verified at {config.dist_path}")

        config.git_sha = get_git_sha()
        print(f"✓ Git commit SHA: {config.git_sha}")

        # Perform deployment
        upload_to_s3(config)
        invalidate_cloudfront(config)

        # Print success message
        print("\n" + "=" * 70)
        print("✅ Deployment completed successfully!")
        print("=" * 70)
        print(f"Version: {config.git_sha}")
        print(f"S3 Path: {config.s3_versioned_path}")
        print(f"CloudFront Path: {config.cloudfront_invalidation_path}")

        if not config.dry_run:
            print("\n⏰ Note: CloudFront invalidation may take a few minutes to complete.")
            print("You can check the status in the AWS Console or with:")
            print(f"  aws cloudfront list-invalidations --distribution-id {config.cloudfront_distribution_id}")

        return 0

    except DeploymentError as e:
        print(f"\n❌ Deployment failed: {e}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print("\n\n⚠️  Deployment interrupted by user", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
