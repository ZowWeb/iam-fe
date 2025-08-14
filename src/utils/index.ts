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

/**
 * Truncates text to specified chars max showing an ellipsis
 * Keeps domain if email (should be already validated)
 * @param value text or email to truncate
 * @param max lenght limit
 * @returns
 */
export const truncateMaxedOutText = (value: string, max: number = 60) => {
  const isEmail: boolean = value.includes('@')
  const ellipsis: string = '…'
  const maxedOut: boolean = value.length > max
  let results: string = ''

  if (isEmail) {
    const [name, domain] = value.split('@')
    const truncated = maxedOut ? `${name.substring(0, max - 1 - domain.length)}${ellipsis}` : name
    results = `${truncated}@${domain}`
  } else {
    results = maxedOut ? `${value.substring(0, max - 1)}${ellipsis}` : value
  }

  return results
}
