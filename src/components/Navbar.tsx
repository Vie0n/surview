// Components
import NavbarLink from './NavbarLink'

// Hooks
import { useState } from 'react'
import { useUserAuth } from '../context/AuthContext'

// Icons
import MenuIcon from '../assets/menuIcon.svg'
import CloseIcon from '../assets/closeIcon.svg'
import SurveyIcon from '../assets/SurveyIcon.svg'



export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useUserAuth()

  return (
    <nav className='fixed top-0 left-0 bg-gray-100 w-full shadow'>
      <div className='container m-auto flex justify-between items-center text-gray-700'>
        <h1 className='pl-8 py-4 text-xl font-bold flex flex-row'>
          <img className='pr-4' src={SurveyIcon} alt='Logo' />
          Surview
        </h1>
        <ul className='hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer'>
          <NavbarLink to='/home' text='Strona główna' />
          { !user && <NavbarLink to='/signup' text='Rejestracja' /> }
          { user 
            ? <NavbarLink to='/profile' text='Profil' />
            : <NavbarLink to='/login' text='Login' />
          } 
        </ul>

        <button 
          onClick={() => setOpen(!open)} 
          className='block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200'
          >
          <img src={MenuIcon} alt='Menu' />
        </button>
          
            
        <ul className={`
          md:hidden flex flex-col shadow items-center bg-gray-100 fixed w-[60%] top-0 overflow-y-auto bottom-0 pl-2
          duration-500 ${open ? "right-0" : "right-[-100%]"}`}
          >
          <div
            className='block mt-2 mx-2 w-full'>
            <img 
              className='py-3 px-4 focus:outline-none cursor-pointer hover:bg-gray-200 rounded' 
              onClick={() => setOpen(!open)} 
              src={CloseIcon} 
              alt='Menu' 
              />
          </div>
          <h1 className='px-6 py-4 text-xl font-bold text-center w-full'>Menu</h1>
          <NavbarLink type='horizontal' to='/home' text='Home' />
          { !user && <NavbarLink type='horizontal' to='/signup' text='Rejestracja' /> }
          { user 
            ? <NavbarLink type='horizontal' to='/profile' text='Profil' />
            : <NavbarLink type='horizontal' to='/login' text='Login' />
          } 
        </ul>
      </div>
    </nav>
  )
} 