import { styled } from '@linaria/react'

import {
  COLORS,
  FLUID_LAYOUT_MAX_WIDTH,
  GLOBAL_INLINE_PADDING,
  STD_LAYOUT_MAX_WIDTH,
} from '~/styles/constants'
import { theme } from '~/styles/theme'

export const BreadcrumbsWrapper = styled.div`
  width: 100%;
  padding: 0.75rem ${GLOBAL_INLINE_PADDING};
  font-size: 0.75rem;
  background-color: ${COLORS.vdsGray95};

  .mantine-Breadcrumbs-root {
    margin: 0 auto;

    .layout--standard & {
      max-width: ${STD_LAYOUT_MAX_WIDTH};
    }

    .layout--fluid & {
      max-width: ${FLUID_LAYOUT_MAX_WIDTH};
    }
  }

  .mantine-Breadcrumbs-separator {
    margin: 0 ${theme.spacing.xs} 0;
  }

  a {
    text-decoration: none;
    color: ${COLORS.black};
  }
`
