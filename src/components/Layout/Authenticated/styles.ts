import { styled } from '@linaria/react'

import { GLOBAL_INLINE_PADDING } from '~/styles/constants'

export const LayoutWrapper = styled.div`
  .mantine-Grid-root {
    margin: 0 auto;
  }
`

export const Main = styled.main`
  width: 100%;
  padding: 2.5rem ${GLOBAL_INLINE_PADDING};
  container: mantine-grid/inline-size;
`
