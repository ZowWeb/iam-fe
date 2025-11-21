import type { ServerErrorSchema } from '~/types/data'
import { handleErrorMessage } from './errors'

type Config = RequestInit & {
  endpoint: string
}

/**
 * Makes an HTTP request to the IAM server with enhanced error handling.
 *
 * @param {string} endpoint - The API endpoint to call (e.g., `/teams/team-123`)
 * @param {...RequestInit} fetchConfig - Any other valid fetch options (method, headers, etc.)
 *
 * @throws {Error} Throws with 'ENV_ERROR' prefix if VITE_IAM_SERVER_URL is not configured
 * @throws {Error} Throws with 'SERVER_ERROR_RESPONSE' prefix if server responds with error data
 * @throws {Error} Throws with 'ERR_NAME_NOT_RESOLVED' prefix for DNS/VPN connectivity issues
 *
 * @returns {Promise<Response>} The fetch Response object if the request is successful
 *
 * @example
 * // Basic GET request
 * const response = await apiServerWithThrow({ endpoint: '/users/123' });
 *
 * // POST request with body
 * const response = await apiServerWithThrow({
 *   endpoint: '/users',
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John' })
 * });
 */
export default async function apiServerWithThrow({ endpoint, ...fetchConfig }: Config): Promise<Response> {
  try {
    const serverUrl = import.meta.env.VITE_IAM_SERVER_URL as string | undefined
    if (!serverUrl) {
      console.error(`ENV_ERROR: Please provide VITE_IAM_SERVER_URL`)
      throw new Error(
        `ENV_ERROR: Server Base URL is not configured. Please check VITE_IAM_SERVER_URL environment variable.`,
      )
    }

    const url = new URL(endpoint, serverUrl)
    const response = await fetch(url, fetchConfig)

    if (response.status > 400) {
      const resData = (await response.json()) as ServerErrorSchema

      if ('error' in resData) {
        throw new Error(`SERVER_ERROR_RESPONSE: ${resData.error_description}`)
      }
    }

    return response
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network or DNS resolution error:', error)
      /**
       * Since this is a crucial error and user can't navigate the app without VPN
       * throw this error so that app ErrorBoundary can catch it
       */
      throw new Error(`ERR_NAME_NOT_RESOLVED: Either VPN or DNS issue!`)
    }
    throw new Error(handleErrorMessage(error))
  }
}

/**
 * Makes an HTTP request to the IAM server with enhanced error handling.
 *
 * @param {string} endpoint - The API endpoint to call (e.g., `/api/proxy/oauth2/v3/whoami`)
 * @param {...RequestInit} fetchConfig - Any other valid fetch options (method, headers, etc.)
 *
 * @throws {Error} Throws with 'ENV_ERROR' prefix if VITE_IAM_CLOUDFRONT_URL is not configured
 * @throws {Error} Throws with 'SERVER_ERROR_RESPONSE' prefix if server responds with error data
 * @throws {Error} Throws with 'ERR_NAME_NOT_RESOLVED' prefix for DNS/VPN connectivity issues
 *
 * @returns {Promise<Response>} The fetch Response object if the request is successful
 *
 * @example
 * // Basic GET request
 * const response = await apiServerWithThrow({ endpoint: '/users/123' });
 *
 * // POST request with body
 * const response = await apiServerWithThrow({
 *   endpoint: '/users',
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John' })
 * });
 */

export async function apiCloudfrontWithThrow({ endpoint, ...fetchConfig }: Config): Promise<Response> {
  try {
    const serverUrl = `${import.meta.env.VITE_CLOUDFRONT_URL}`
    if (!serverUrl) {
      console.error(`ENV_ERROR: Please provide VITE_IAM_CLOUDFRONT_URL`)
      throw new Error(
        `ENV_ERROR: Server Base URL is not configured. Please check VITE_IAM_CLOUDFRONT_URL environment variable.`,
      )
    }

    const prefixedEndpoint = !endpoint.includes('whoami')
      ? `/${import.meta.env.VITE_CLOUDFRONT_PREFIX}${endpoint}`
      : '/api/proxy/oauth2/v3/whoami'

    console.info('Prefixed Endpoint:', prefixedEndpoint)

    const url = new URL(prefixedEndpoint, serverUrl)
    const response = await fetch(url, fetchConfig)

    if (response.status >= 400) {
      const errorResponse = {
        status: response.status,
        statusText: response.statusText,
        message: 'An error occurred while fetching data.',
      }
      throw errorResponse
    }

    return response
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network or DNS resolution error:', error)
      /**
       * Since this is a crucial error and user can't navigate the app without VPN
       * throw this error so that app ErrorBoundary can catch it
       */
      throw new Error(`ERR_NAME_NOT_RESOLVED: Either VPN or DNS issue!`)
    }

    throw new Error(handleErrorMessage(error))
  }
}
