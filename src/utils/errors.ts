export const handleErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return `UNKNOWN_ERROR: Something went wrong!`
}
