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
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
  },
  breakpoints: {
    xs: '30rem', // 480px
    sm: '48rem', // 768px
    md: '68.25rem', // 1092px
    lg: '80rem', // 1280px
    xl: '90rem', // 1440px
  },
}
