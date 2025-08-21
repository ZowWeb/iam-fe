import type { theme } from '~/styles/theme'

export type Theme = typeof theme

export type FontSizeKeys = keyof Theme['fontSizes']
export type FontSize = Theme['fontSizes'][FontSizeKeys]
