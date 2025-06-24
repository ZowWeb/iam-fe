import { type GridProps, Col } from '@mantine/core'

import { FluidGridWrapper, StandardGridWrapper } from './styles'
import type { LayoutType } from '~/types'

type Props = GridProps & {
  layout?: LayoutType
}

const Grid = ({ layout = 'standard', ...props }: Props) => {
  const Wrapper = layout === 'standard' ? StandardGridWrapper : FluidGridWrapper

  return <Wrapper {...props} />
}

export default Grid
export { Col }
export type { GridProps }
