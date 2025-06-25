import type { LayoutType } from '~/types'
import { LayoutWrapper } from './styles'
import Breadcrumbs from '../Breadcrumbs'
import Header from './Header'

type Props = {
  children?: React.ReactNode
  type?: LayoutType
}

const Layout = ({ children, type = 'standard' }: Props) => {
  return (
    <LayoutWrapper className={`layout--${type}`}>
      <Header />
      <Breadcrumbs />
      <main>{children}</main>
      <footer />
    </LayoutWrapper>
  )
}

export default Layout
