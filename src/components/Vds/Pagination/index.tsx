import { Pagination as VdsPagination } from '@vds/pagination'

export default function Pagination() {
  return <VdsPagination selectPage={() => {}} total={20} showArrow surface="light" />
}
