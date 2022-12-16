import NavbarItem from './NavbarItem'


export default function Navbar() {
  return (
    <nav>
      <ul>
        <NavbarItem redirect='/home' text='Home' />
        <NavbarItem redirect='/login' text='Login' />
        <NavbarItem redirect='/signup' text='Signup' />
      </ul>
    </nav>
  )
} 