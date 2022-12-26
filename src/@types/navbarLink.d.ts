import React from 'react'
import type { LinkProps } from 'react-router-dom'

export interface INavbarLinkProps extends LinkProps {
  text: string,
  icon?: React.ReactNode,
  role?: 'mobile'
}