import Block from '~/components/Block'
import Grid from '~/components/Grid'
import { LayoutWrapper } from './styles'
import type { LayoutType } from '~/types'
import Breadcrumbs from '~/components/Breadcrumbs'
import Header from '../Header'

type Props = {
  children?: React.ReactNode
  type?: LayoutType
}

const AuthenticatedLayout = ({ children, type = 'standard' }: Props) => {
  return (
    <LayoutWrapper className={`layout--${type}`}>
      <Header />
      <Breadcrumbs />
      <main>
        <Block>
          <Grid>{children}</Grid>
        </Block>
      </main>
      <footer />
    </LayoutWrapper>
  )
}

export default AuthenticatedLayout
