import { breakpointsInPx } from '../styles/breakpoints'

const breakpoints = {
  phone: breakpointsInPx.phone,
  tablet: breakpointsInPx.tablet,
  desktop: breakpointsInPx.desktop,
  wide: breakpointsInPx.wide,
} as const

type BreakpointKey = keyof typeof breakpoints

type MediaQuery = {
  [K in BreakpointKey]: string
} & {
  lessThan: { [K in BreakpointKey]: string }
  greaterThan: { [K in BreakpointKey]: string }
}

const mediaQuery = (Object.keys(breakpoints) as BreakpointKey[]).reduce((acc, label) => {
  // Direct breakpoint queries (max-width)
  acc[label] = `@media (max-width: ${breakpoints[label]}px)`

  // Initialize lessThan and greaterThan objects if they don't exist
  acc.lessThan = acc.lessThan || {}
  acc.greaterThan = acc.greaterThan || {}

  // Less than queries (max-width)
  acc.lessThan[label] = `@media (max-width: ${breakpoints[label]}px)`

  // Greater than queries (min-width + 1)
  acc.greaterThan[label] = `@media (min-width: ${breakpoints[label] + 1}px)`

  return acc
}, {} as MediaQuery)

/**
 * Usage examples with `@linaria/react`:
 * ```
 * const StyledDiv = styled.div`
 *   // Direct breakpoint usage
 *   ${media.tablet} {
 *     display: none;
 *   }
 *   // Less than usage
 *   ${media.lessThan.desktop} {
 *     padding: 1rem;
 *   }
 *   // Greater than usage
 *   ${media.greaterThan.phone} {
 *     margin: 2rem;
 *   }
 * `
 * ```
 */
export const media = mediaQuery

export type Media = typeof mediaQuery
