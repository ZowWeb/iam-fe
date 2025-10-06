import { styled } from '@linaria/react'

import { COLORS } from '~/styles/constants'

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
