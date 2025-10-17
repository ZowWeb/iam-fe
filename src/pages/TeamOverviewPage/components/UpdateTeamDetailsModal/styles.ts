import { styled } from '@linaria/react'
import { Button } from '@vds/buttons'

export const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
`

export const InputContainer = styled.div<{ withError: boolean }>`
  position: relative;
  width: 100%;
  padding-bottom: ${({ withError }) => (withError ? '0' : '1.5rem')};
`

export const CharCounter = styled.div`
  position: absolute;
  right: 0;
  top: 4.25rem;
`
