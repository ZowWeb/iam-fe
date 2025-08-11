import { email as zodEmail } from 'zod'

/**
 * Validates an email using Zod
 */
export const validateEmail = (email: string): boolean => {
  try {
    zodEmail().parse(email)
    return true
  } catch {
    return false
  }
}
