import classes from './Layout.module.css'

type Props = {
  className?: string
  children?: React.ReactNode
}

const Layout = ({ children, className }: Props) => {
  return (
    <main className={classes.main}>{children}</main>
  )
}

export default Layout