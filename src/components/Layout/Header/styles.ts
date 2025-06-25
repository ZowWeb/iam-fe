import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import { COLORS, FLUID_LAYOUT_MAX_WIDTH, STD_LAYOUT_MAX_WIDTH } from '~/styles/constants'

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${COLORS.vdsGray85};
`

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
  flex: 1 1 0;
  align-items: center;
  flex-wrap: nowrap;
`

export const Right = styled(FlexBox)`
  width: auto;
  flex: 1 0 auto;
  align-items: center;
  gap: 1.5rem;

  ul {
    width: auto;
    padding: 0;
    margin-left: auto;
    flex: 1 0 auto;
    display: flex;
    justify-content: flex-end;
    list-style: none;
    gap: 1.5rem;

    li {
      cursor: pointer;
    }
  }
`

export const AvatarWrapper = styled(FlexBox)`
  flex: 1 auto;
  gap: 0.5rem;
  width: auto;

  .mantine-Avatar-placeholder {
    background-color: ${COLORS.black};
    color: ${COLORS.white};
  }

  .avatar {
    &__name {
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 0.25rem;
    }

    &__team {
      font-size: 0.625rem;
      color: ${COLORS.secondary};
    }
  }
`
