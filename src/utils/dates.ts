export const getFormattedDate = (isoDate: string): string => {
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
