import { useCallback, useState } from 'react'

import { truncateMaxedOutText } from '~/utils'
import { validateEmail } from '~/utils/validations'

const INVALID_EMAIL: string = 'Invalid email.'
// const ALREADY_INVITED: string = 'Member has already been invited.'
// const ALREADY_MEMBER: string = 'Already a member.'
const REPEATED_EMAIL: string = 'Email address is already added.'

/**
 * From an array of Pills returns the plain array of emails strings
 * This is used to update react form status with the emails
 */
const getPlainEmails = (pills: Pill[]): string[] => {
  return pills.map(e => e.email)
}

export type Pill = {
  id: number // To uniquely identify each element so it can be easily removed
  errors: string[] // Specifies if the email has errors so we can apply the secondary style to the pill and show the message
  email: string // Normal email
  shortenedEmail: string // Shortened version of the email in case it maxs out
}

/**
 * Invite members modal Logic for pills
 * Because the displayed emails are different than the emails in the form state we keep a separated list for the pills
 * The pills shows truncated, duplicated and errored emails.
 * WE have 4 errors:
 *    Invalid email.
 *    Member has already been invited.
 *    Already a member.
 *    Email address is already added.
 * An email can have more than one error, if a pill has many errors we show the last one added to the errors array.
 * For the error message, we only show the last errored pill in the UI. If we remove a pill containing an error we look for the last errored pill to show the message if any.
 */
export function usePills() {
  const [pills, setPills] = useState<Pill[]>([]) // The pills objects to show in the UI
  const [errorMessage, setErrorMessage] = useState<string>() // The error message to show in the UI

  /**
   *
   * @param pill Pill object to remove
   * @param fieldOnChange react form controled field onChange event used to upadate the form state
   */
  const removePill = (pill: Pill, fieldOnChange: (value: string[]) => void) => {
    setPills(prevState => {
      // Remove pill from state by id
      const newState: Pill[] = prevState.filter(e => e.id !== pill.id)

      // Find the last pill with errors in the new state
      const lastErroredPill = newState
        .slice()
        .reverse()
        .find(p => p.errors.length > 0)

      // Show the last error
      setErrorMessage(lastErroredPill ? lastErroredPill.errors[lastErroredPill.errors.length - 1] : '')

      // Update form status
      fieldOnChange(getPlainEmails(newState))

      return newState
    })
  }

  /**
   *
   * @param email email address to add into the new pill
   * @param fieldOnChange react form controled field onChange event used to upadate the form state
   */
  const addPill = (email: string, fieldOnChange: (value: string[]) => void) => {
    // Check every possible error individually and add them to the array if found
    const errors: string[] = []
    const isValid: boolean = validateEmail(email)
    const isRepeated: boolean = !!pills.some(e => e.email === email)

    if (!isValid) {
      errors.push(INVALID_EMAIL)
    }

    if (isRepeated) {
      errors.push(REPEATED_EMAIL)
    }

    // Unique ID to easily delete pills. If we have pills with duplicated emails per example.
    const id: number = Date.now()

    // Add the new pill to the state
    const newPill: Pill = { id, email, shortenedEmail: truncateMaxedOutText(email), errors }
    const newState: Pill[] = [...pills, newPill]
    setPills(newState)

    // Only update the error message if the new pill has errors, otherwise, leave the existing error message.
    if (errors.length > 0) {
      setErrorMessage(errors[errors.length - 1])
    }

    // Upadte form status
    fieldOnChange(getPlainEmails(newState))
  }

  /**
   * Reset the pill state. Used toghether whit reset form.
   */
  const resetPills = useCallback(() => {
    setPills([])
  }, [])

  return {
    pills,
    errorMessage,
    addPill,
    removePill,
    resetPills,
  }
}
