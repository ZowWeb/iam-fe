import { DefaultMantineColor, MantineColorsTuple, type DefaultMantineSize } from '@mantine/core'

import type { theme } from './styles/theme'

type ExtendedCustomColors = DefaultMantineColor | keyof typeof theme.colors
type ExtendedCustomSpacing = DefaultMantineSize | keyof typeof theme.spacing
type ExtendedCustomFontSizes = DefaultMantineSize | keyof typeof theme.fontSizes

declare module '@mantine/core' {
  export interface MantineThemeSizesOverride {
    spacing: Record<ExtendedCustomSpacing, string>
    fontSizes: Record<ExtendedCustomFontSizes, string>
  }
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }
}
