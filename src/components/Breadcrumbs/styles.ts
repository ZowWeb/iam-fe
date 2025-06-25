import { styled } from '@linaria/react'

import { COLORS } from '~/styles/constants'
import { theme } from '~/styles/theme'

export const BreadcrumbsContainer = styled.div`
  padding: 0.75rem 0;
  font-size: 0.75rem;
  border-bottom: 1px solid ${COLORS.vdsGray85};

  .mantine-Breadcrumbs-separator {
    margin: 0 ${theme.spacing?.xs || '0.5rem'} 0;
  }

  a {
    text-decoration: none;
    color: ${COLORS.black};
  }
`
