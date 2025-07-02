import { styled } from '@linaria/react'

export const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .pagination-wrapper {
    align-self: flex-end;
  }

  table > tbody > tr > td:first-child {
    font-weight: 700;
  }
`
