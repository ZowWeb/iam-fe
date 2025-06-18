import { AppShell } from '@mantine/core'

import classes from './Layout.module.scss'

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <AppShell className={classes.main}>{children}</AppShell>
}

export default Layout
