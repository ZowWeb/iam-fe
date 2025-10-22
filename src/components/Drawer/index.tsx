import { Drawer as MantineDrawer, type DrawerProps as MantineDrawerProps } from '@mantine/core'

const Drawer = (props: MantineDrawerProps) => {
  return (
    <MantineDrawer
      position="right"
      styles={{
        header: {
          padding: '1.5rem 1rem',
          alignItems: 'flex-start',
        },
      }}
      {...props}
    >
      {props.children}
    </MantineDrawer>
  )
}

export default Drawer
