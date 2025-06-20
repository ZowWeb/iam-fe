import { type MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  fontFamily:
    '"Verizon-NHG-eDS", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSizes: {
    xs: '0.625rem', // 10px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '2rem', // 32px
    xl: '3rem', // 48px
    '2xl': '4rem', // 64px
  },
  breakpoints: {
    xs: '30rem', // 480px
    sm: '48rem', // 768px
    md: '68.25rem', // 1092px
    lg: '80rem', // 1280px
    xl: '90rem', // 1440px
  },
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
