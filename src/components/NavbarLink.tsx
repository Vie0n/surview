import type { INavbarLinkProps } from '../@types/navbarLink'
import { Link } from "react-router-dom";


export default function NavbarLink(props: INavbarLinkProps) {
  const { role, text } = props

  if (role === 'mobile') {
    return (
      <Link {...props} className="hover:bg-gray-200 hover:text-blue-600 py-4 px-6 w-full">
        { text }
      </Link>
    )
  }

  return (
    <Link {...props} className="hover:text-blue-600 py-4 px-6">
      { text }
    </Link>
  )
}