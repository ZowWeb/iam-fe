import { styled } from '@linaria/react'
import { Image } from '@mantine/core'

import FlexBox from '~/components/FlexBox'
import {
  COLORS,
  FLUID_LAYOUT_MAX_WIDTH,
  FONT_WEIGHTS,
  GLOBAL_INLINE_PADDING,
  STD_LAYOUT_MAX_WIDTH,
} from '~/styles/constants'
import { theme } from '~/styles/theme'
import { media } from '~/utils/mediaQuery'

export const BorderedHeader = styled.header`
  border-top: 1px solid ${COLORS.vdsGray85};
  padding: 1.5rem ${GLOBAL_INLINE_PADDING};
`

export const ContentContainer = styled(FlexBox)`
  width: 100%;
  margin: 0 auto;

  .layout--standard & {
    max-width: ${STD_LAYOUT_MAX_WIDTH};
  }
  .layout--fluid & {
    max-width: ${FLUID_LAYOUT_MAX_WIDTH};
  }
`

export const TopHeaderLinksContentContainer = styled(ContentContainer)`
  padding: 0.5rem 0;

  ${media.tablet} {
    padding: 0.5rem ${GLOBAL_INLINE_PADDING};
  }
`

export const Left = styled(FlexBox)`
  width: auto;
`

export const Right = styled(FlexBox)`
  width: auto;
`

export const ExternalLinksUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 0 auto;
  display: inline-flex;
  justify-content: flex-end;
  gap: 1.5rem;

  ${media.tablet} {
    flex-direction: column;
    gap: 0;
  }

  li {
    cursor: pointer;

    ${media.tablet} {
      padding: 1rem 0;
    }
  }
`

export const AvatarWrapper = styled(FlexBox)`
  position: relative;
  flex: 1 auto;
  gap: 0.5rem;

  .mantine-Avatar-placeholder {
    background-color: ${COLORS.black};
    color: ${COLORS.white};
  }

  .userName {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .teamName {
    font-size: 0.75rem;
    color: ${COLORS.secondary};
  }
`

export const ProfileLinksUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding-block: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    &.border-top {
      border-top: 1px solid ${COLORS.vdsGray85};
    }
  }
`

export const StyledItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`

export const FixedTopImage = styled(Image)`
  position: relative;
  top: -3px;
`

export const TopHeaderLinksUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: ${FONT_WEIGHTS.medium};
  font-size: ${theme.fontSizes.sm};
`
