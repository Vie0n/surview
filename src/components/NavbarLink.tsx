import type { INavbarLinkProps } from '../@types/navbarLink'
import { Link } from 'react-router-dom'


export default function NavbarLink(props: INavbarLinkProps) {
  const { role, text, className, icon } = props

  if (role === 'mobile') {
    return (
      <Link {...props} 
        className={`flex block hover:bg-gray-200 hover:text-blue-700 py-4 px-6 text-gray-700
        rounded-bl-lg rounded-tl-lg w-full active:bg-gray-300 transition duration-150
        ease-in-out ${ className }`}>
        { icon } { text }
      </Link>
    )
  }

  return (
    <Link {...props} className={`text-gray-700 flex transition duration-150 hover:text-blue-600 py-4 px-6 ${ className }`}>
      { icon } { text }
    </Link>
  )
}