export const getFormatedDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
