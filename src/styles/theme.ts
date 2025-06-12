import { type MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  components: {
    AppShell: {
      styles: {
        root: { padding: 0, margin: 0 },
        body: { padding: 0, margin: 0 },
        main: { padding: 0, margin: 0 },
      },
    },
  },
}
