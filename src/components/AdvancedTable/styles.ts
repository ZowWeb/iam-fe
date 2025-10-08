import { styled } from '@linaria/react'

import { COLORS } from '~/styles/constants'
import { media } from '~/utils/mediaQuery'

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
      ${media.phone} {
        display: none;
      }

      > th {
        font-weight: 700;
        color: ${COLORS.secondary};
      }
    }

    > tbody > tr {
      border-bottom-color: ${COLORS.vdsGray85};

      ${media.phone} {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.5rem 0;
        border-bottom: 1px solid ${COLORS.vdsGray85};
      }

      > td {
        &:first-child {
          font-weight: 700;
        }
        ${media.lessThan.phone} {
          padding: 0;
          &:not(.row-action) {
            width: 100% !important;
          }
          &.row-action {
            text-align: right;
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
          }

          .label-on-phone {
            font-weight: 700;
            margin-right: 0.5rem;
          }
        }
        ${media.greaterThan.phone} {
          .label-on-phone {
            display: none;
          }
        }
      }
    }
  }
`
