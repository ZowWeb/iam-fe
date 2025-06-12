import { Pagination as VdsPagination } from '@vds/pagination'

interface Props {
  selectPage?: (page: number) => void
  total?: number
  showArrow?: boolean
  surface?: 'light' | 'dark'
}

export default function Pagination({
  selectPage = () => {},
  total = 20,
  showArrow = true,
  surface = 'light',
}: Props) {
  return <VdsPagination {...{ selectPage, total, showArrow, surface }} />
}
