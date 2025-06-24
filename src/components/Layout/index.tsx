import type { LayoutType } from '~/types'
import { Main } from './styles'

type Props = {
  children?: React.ReactNode
  type?: LayoutType
}

const Layout = ({ children, type = 'standard' }: Props) => {
  return (
    <>
      <header />
      <Main type={type}>{children}</Main>
      <footer />
    </>
  )
}

export default Layout
