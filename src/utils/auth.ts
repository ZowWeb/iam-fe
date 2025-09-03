import type { User } from '~/types/data'

export const getUserToken = () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null

    const payload = JSON.parse(token)
    return payload as { userId: string; isExpired: boolean }
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

export const getStoredUser = () => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) return undefined

  try {
    return JSON.parse(storedUser) as User
  } catch (error) {
    console.error('Failed to parse stored user:', error)
    return undefined
  }
}
