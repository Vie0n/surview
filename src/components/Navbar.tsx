// Components
import NavbarLink from './NavbarLink'

// Context
import type { AuthContextType } from '../@types/auth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Icons
import MenuIcon from '../assets/menuIcon.svg'
import SurveyIcon from '../assets/SurveyIcon.svg'


export default function Navbar() {
  const { user, logOut } = useContext(AuthContext) as AuthContextType

  return (
    <nav className='fixed top-0 left-0 bg-gray-100 w-full shadow'>
      <div className='container m-auto flex justify-between items-center text-gray-700'>
        <h1 className='pl-8 py-4 text-xl font-bold flex flex-row'>
          <img className='pr-4' src={SurveyIcon} alt='Logo' />
          Surview
        </h1>
        <ul className='hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer'>
          <NavbarLink to='/home' text='Strona główna' />
          <NavbarLink to='/signup' text='Rejestracja' />
          { user 
            ? <button onClick={logOut}>Wyloguj</button>
            : <NavbarLink to='/login' text='Login' />
          } 
        </ul>

        <button className='block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group'>
          <img src={MenuIcon} alt='Menu' />
          <div className='absolute top-0 -right-full h-screen w-6/12 bg-white border opacity-0 group-focus:right-0 group-focus:opacity-100 transition-all duration-300'>
            <h1 className='px-6 py-4 text-xl font-bold w-full'>Menu</h1>
            <ul className='flex flex-col items-center w-full text-base cursor-pointer pt-3'>
              <NavbarLink type='horizontal' to='/home' text='Home' />
              <NavbarLink type='horizontal' to='/signup' text='Rejestracja' />
              <NavbarLink type='horizontal' to='/login' text='Login' />
            </ul>
          </div>
        </button>
      </div>
    </nav>
  )
} 