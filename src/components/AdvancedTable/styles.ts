import { styled } from '@linaria/react'
import { Menu } from '@mantine/core'

import { BUTTON_ICON_DROP_SHADOW, COLORS } from '~/styles/constants'

export const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .pagination-wrapper {
    align-self: flex-end;
  }

  table {
    font-size: 0.875rem;

    > thead > tr {
      border-bottom-color: ${COLORS.secondary};

      > th {
        font-weight: 700;
        color: ${COLORS.secondary};
      }
    }

    > tbody > tr {
      border-bottom-color: ${COLORS.vdsGray85};

      > td:first-child {
        font-weight: 700;
      }
    }
  }
`

export const MenuDropdown = styled(Menu.Dropdown)`
  padding: 0;
  min-width: 10rem;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: ${BUTTON_ICON_DROP_SHADOW};
`

export const MenuItem = styled(Menu.Item)`
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0;

  &:nth-of-type(n + 2) {
    border-top: 0.25px solid ${COLORS.dropdownBorder};
  }
`
