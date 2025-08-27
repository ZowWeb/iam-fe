import { IconChevronLeft } from '@tabler/icons-react'

import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'

export default function PolicyPage() {
  return (
    <Link to="..">
      <FlexBox customStyle={{ marginBottom: '2rem' }}>
        <IconChevronLeft name="arrow-left" size={20} />
        <span>Back to policies list</span>
      </FlexBox>
    </Link>
  )
}
