import { breakpoints, media, type BreakpointKey } from '~/utils/mediaQuery'

export const hideOnBreakpointsCss = `
  ${Object.keys(breakpoints)
    .map(
      bp => `
      ${media[bp as BreakpointKey]} {
        .hide-on-${bp} {
          display: none;
        }
      }
  `,
    )
    .join('')}
`
