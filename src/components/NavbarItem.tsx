import { Link } from "react-router-dom";

interface INavbarItemProps {
  text: string,
  redirect: string,
  type?: 'horizontal'
}

export default function NavbarItem(props: INavbarItemProps) {
  const { type, redirect, text } = props

  if (type === "horizontal") {
    return (
      <Link to={ redirect } className="hover:bg-gray-200 hover:text-blue-600 py-4 px-6 w-full">
        { text }
      </Link>
    )
  }

  return (
    <Link to={ redirect } className="hover:text-blue-600 py-4 px-6">
      { text }
    </Link>
  )
}