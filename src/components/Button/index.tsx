import React, { ReactNode } from 'react'
import { StyledButton } from './styles'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...props }: Props) {
  return <StyledButton {...props}>{children}</StyledButton>
}
