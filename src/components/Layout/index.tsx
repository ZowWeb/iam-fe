import type { LayoutType } from '~/types'
import { LayoutWrapper } from './styles'
import Block from '../Block'

type Props = {
  children?: React.ReactNode
  type?: LayoutType
}

const Layout = ({ children, type = 'standard' }: Props) => {
  return (
    <LayoutWrapper className={`layout--${type}`}>
      <main>
        <Block direction="column" customStyle={{ minHeight: '100vh' }}>
          {children}
        </Block>
      </main>
      <footer />
    </LayoutWrapper>
  )
}

export default Layout
