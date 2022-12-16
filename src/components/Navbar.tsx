import NavbarItem from './NavbarItem'

// Icons
import MenuIcon from '../assets/menuIcon.svg'
import SurveyIcon from '../assets/SurveyIcon.svg'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 bg-gray-100 w-full shadow">
      <div className="container m-auto flex justify-between items-center text-gray-700">
        <h1 className="pl-8 py-4 text-xl font-bold flex flex-row">
          <img className="pr-4" src={SurveyIcon} alt="Logo" />
          Surview
        </h1>
        <ul className="hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer">
          <NavbarItem redirect='/home' text='Strona główna' />
          <NavbarItem redirect='/login' text='Login' />
          <NavbarItem redirect='/signup' text='Rejestracja' />
        </ul>

        <button className="block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group">
          <img src={MenuIcon} alt="Menu" />
          <div className="absolute top-0 -right-full h-screen w-6/12 bg-white border opacity-0 group-focus:right-0 group-focus:opacity-100 transition-all duration-300">
            <h1 className="px-6 py-4 text-xl font-bold w-full">Menu</h1>
            <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-3">
              <NavbarItem type="horizontal" redirect='/home' text="Home" />
              <NavbarItem type="horizontal" redirect='/login' text="Login" />
              <NavbarItem type="horizontal" redirect='/signup' text="Rejestracja" />
            </ul>
          </div>
        </button>
      </div>
    </nav>
  )
} 