import Block from '~/components/Block'
import Grid from '~/components/Grid'

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Block>
      <Grid>{children}</Grid>
    </Block>
  )
}

export default AuthenticatedLayout
