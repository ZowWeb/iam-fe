import dayjs from 'dayjs'

export const getFormatedDate = (isoDate: string) => {
  return dayjs(isoDate).format('MMMM DD, YYYY hh:mm A')
}
