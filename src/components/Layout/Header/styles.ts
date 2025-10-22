import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import { COLORS, FLUID_LAYOUT_MAX_WIDTH, STD_LAYOUT_MAX_WIDTH } from '~/styles/constants'
import { media } from '~/utils/mediaQuery'

export const HeaderContainer = styled(FlexBox)`
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;

  .layout--standard & {
    max-width: ${STD_LAYOUT_MAX_WIDTH};
  }
  .layout--fluid & {
    max-width: ${FLUID_LAYOUT_MAX_WIDTH};
  }
`

export const Left = styled(FlexBox)`
  width: auto;
  flex: 1 0 auto;
  align-items: center;
  flex-wrap: nowrap;
`

export const Right = styled(FlexBox)`
  width: auto;
  flex: 0 0 auto;
  align-items: center;
  gap: 1.5rem;
`

export const ExternalLinksUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 0 auto;
  display: flex;
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

  .avatar {
    &__name {
      font-size: 0.875rem;
      font-weight: 500;
    }

    &__team {
      font-size: 0.75rem;
      color: ${COLORS.secondary};
    }
  }
`

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${COLORS.vdsGray85};
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
