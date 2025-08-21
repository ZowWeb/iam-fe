import { useCallback, useState } from 'react'

import { truncateMaxedOutText } from '~/utils'
import { emailListSchema } from '../components/InviteMembersModal'

const getOnlyEmails = (pills: Pill[]): string[] => {
  return pills.map(e => e.email)
}

export type Pill = {
  id: string
  email: string
  shortenedEmail: string
  error?: string
}

/**
 * Manage the state of pills in the UI.
 *
 * @param emailList a list of emails to show initially in the UI.
 * @returns an object with the following properties:
 * - pills: the pills to show in the UI.
 * - addPill: a function to add a new pill to the UI and the form state.
 * - removePill: a function to remove a pill from the UI and the form state.
 * - resetPills: a function to reset the pill state. Used toghether whit reset form.
 */
export function usePills({ emailList = [] }: { emailList?: string[] }) {
  const [pills, setPills] = useState<Pill[]>(
    emailList.map(e => ({ id: Date.now().toString(), email: e, shortenedEmail: truncateMaxedOutText(e) })),
  ) // The pills objects to show in the UI

  /**
   * Check if the given email address is valid and if it is already present in the pill list.
   * @param email the email address to check.
   * @returns the error message if the email address is invalid or already present, `undefined` otherwise.
   */
  const getError = (email: string) => {
    if (!emailListSchema.safeParse([email]).success) {
      return 'Invalid email.'
    }
    if (pills.some(p => p.email === email)) {
      return 'Email address is already added.'
    }
    return undefined
  }

  const removePill = useCallback(
    (pill: Pill, fieldOnChange: (value: string[]) => void) => {
      setPills(prevState => {
        // Remove pill from state by id
        const newState: Pill[] = prevState.filter(p => p.id !== pill.id)

        // Check if removed pill had same email as other pills
        const repeatedEmails = newState.filter(p => p.email === pill.email)

        // If there are no repeated emails, remove the error from the pill
        if (repeatedEmails.length === 1) {
          newState.forEach(p => {
            if (p.email === pill.email) {
              p.error = undefined // Remove error if the last pill with this email is removed
            }
          })
        }

        // Update form state with the new pills emails
        fieldOnChange(getOnlyEmails(newState))

        // Return the new state
        return newState
      })
    },
    [pills],
  )

  const addPill = useCallback(
    (email: string, fieldOnChange: (value: string[]) => void) => {
      // Unique ID to easily delete pills. If we have pills with duplicated emails per example.
      const id = Date.now().toString()

      // Add the new pill to the state
      const newPill: Pill = {
        id,
        email,
        shortenedEmail: truncateMaxedOutText(email),
        error: getError(email),
      }
      const newState: Pill[] = [...pills, newPill]
      setPills(newState)

      // Update form state with the new pills emails
      fieldOnChange(getOnlyEmails(newState))
    },
    [pills],
  )

  /**
   * Reset the pill state. Used toghether whit reset form.
   */
  const resetPills = useCallback(() => {
    setPills([])
  }, [])

  return {
    pills,
    addPill,
    removePill,
    resetPills,
  }
}
