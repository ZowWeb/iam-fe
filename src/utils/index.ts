export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Async function to immitate a delay in API calls etc.
 * Returns a promise that resolves after the given amount of milliseconds.
 * @param {number} [ms=2000] The amount of milliseconds to wait.
 */
export const sleep = async (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
