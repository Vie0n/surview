import type { LinkProps } from 'react-router-dom'

export interface INavbarLinkProps extends LinkProps {
  text: string,
  role?: 'mobile'
}