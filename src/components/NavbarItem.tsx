import { Link } from "react-router-dom";

interface INavbarItemProps {
  text: string,
  redirect: string
}

export default function NavbarItem(props: INavbarItemProps) {
  return (
    <Link to={ props.redirect }>
      { props.text }
    </Link>
  )
} 