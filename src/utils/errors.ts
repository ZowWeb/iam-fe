export const handleErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong!'
}
