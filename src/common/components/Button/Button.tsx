import { IconButton } from '@mui/material'
import MuiButton from '@mui/material/Button'
import React from 'react'

type Props = {
  variant: 'icon' | 'default'
  children?: React.ReactNode
  icon: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const Button = ({ variant, icon, onClick, children }: Props) => {
  if (variant === 'icon') {
    return (
      <IconButton onClick={onClick}>
        {icon}
      </IconButton>
    )
  }
  return (
    <MuiButton>
      {children}
    </MuiButton>
  )  
}

export default Button