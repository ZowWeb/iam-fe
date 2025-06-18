import {
  Anchor,
  Avatar,
  Breadcrumbs,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Menu,
  rem,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { forwardRef } from 'react'
import { IconChevronRight, IconExternalLink } from '@tabler/icons-react'

const items = [
  { title: 'Home', href: '#' },
  { title: `Jane's First Team`, href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
))

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={theme => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  ),
)

const MainHeader = () => {
  return (
    <>
      <div className="main__navigation">
        <Grid className="main__navigation-grid">
          <Grid.Col md={6} lg={6}>
            <Flex
              wrap={{ sm: 'wrap' }}
              direction={{ base: 'column', sm: 'column', xs: 'column', xl: 'column' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ lg: 'flex-start' }}
            >
              <Group className="main__navigation-group">
                <Anchor href="#">Developer Dashboard</Anchor>
                <Anchor href="#">Documentation</Anchor>
                <Anchor href="#">Identity Access Management</Anchor>
              </Group>
            </Flex>
          </Grid.Col>
          <Grid.Col md={6} lg={6}>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ lg: 'flex-end' }}
            >
              <Group className="main__navigation-group">
                <Anchor href="#">Talk to an expert</Anchor>
                <Anchor href="#">Support</Anchor>
              </Group>
            </Flex>
          </Grid.Col>
        </Grid>
      </div>
      <Divider size="md" className="main__divider" />
      <div className="main__content">
        <Grid className="main__content-grid">
          <Grid.Col md={6} lg={6}>
            <Flex
              className="main__content-flex"
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              align={{ base: 'center' }}
            >
              <Image className="main__content-flex--image" />
              <Text className="main__content-flex--text" size="lg">
                Identity & Access Management
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col md={6} lg={6}>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ lg: 'flex-end' }}
            >
              <Group position="center">
                <Menu withArrow>
                  <Menu.Target>
                    <UserButton
                      image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                      name="Harriette Spoonlicker"
                      email="hspoonlicker@outlook.com"
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item component="a" href="https://mantine.dev">
                      My Account
                    </Menu.Item>

                    <Menu.Item
                      icon={<IconExternalLink size={rem(14)} />}
                      component="a"
                      href="https://mantine.dev"
                      target="_blank"
                    >
                      Settings
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Flex>
          </Grid.Col>
        </Grid>
      </div>
      <div className="main__breadcrumb">
        <Grid className="main__breadcrumb-grid">
          <Grid.Col span={12}>
            <Flex
              className="main__breadcrumb-flex"
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ lg: 'flex-start' }}
            >
              <Breadcrumbs separator="/" mt="xs">
                {items}
              </Breadcrumbs>
            </Flex>
          </Grid.Col>
        </Grid>
      </div>
    </>
  )
}

export default MainHeader
