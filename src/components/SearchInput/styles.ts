import { styled } from '@linaria/react'

import type { InputProps } from '.'

export const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
`

export const Input = styled.input<InputProps>`
  outline-style: none;
  border-radius: calc(infinity * 1px);
  padding-left: 2.5rem;
  border-width: 1px;
  height: 2.75rem;
  border-color: ${props => (props.variant === 'primary' ? '#6f7171' : '')};
  background-color: ${props => (props.variant === 'primary' ? 'white' : 'black')};
  color: ${props => (props.variant === 'primary' ? 'black' : 'white')};
  box-sizing: ${props => (props.variant === 'primary' ? 'border-box' : '')};
  width: ${props => (props.fullWidth ? '100%' : '17rem')};
`

export const SearchIcon = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
`

export const ClearIcon = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.5rem;
  cursor: pointer;
`
