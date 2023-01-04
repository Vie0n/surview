// Components
import NavbarLink from './NavbarLink'

// Hooks
import { useState } from 'react'
import { useUserAuth } from '../context/AuthContext'

// Icons
import { ReactComponent as MenuIcon } from '../assets/Menu.svg'
import { ReactComponent as CloseIcon } from '../assets/Close.svg'
import { ReactComponent as SurveyIcon } from '../assets/Survey.svg'
import { ReactComponent as HomeIcon } from '../assets/Home.svg'
import { ReactComponent as UserIcon } from '../assets/User.svg'
import { ReactComponent as UserPlusIcon } from '../assets/Userplus.svg'
import { ReactComponent as LoginIcon } from '../assets/Login.svg'



export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useUserAuth()

  return (
    <nav className='fixed top-0 left-0 bg-gray-100 w-full shadow z-50'>
      <div className='container m-auto flex justify-between items-center'>
        <h1 className='pl-8 py-4 text-xl font-bold flex flex-row'>
          <SurveyIcon className='self-center mr-2' />
          Surview
        </h1>
        <ul className='hidden md:flex items-center text-base font-semibold cursor-pointer'>
          <NavbarLink to='/home' text='Strona główna' />
          <NavbarLink to='/surveys' text='Ankiety' />
          {user ?
          <>
            <NavbarLink to='/addsurvey' text='Dodaj Ankiete' />
            <NavbarLink to='/mysurvey' text='Moje Ankiety' />
          </>
          :
          <></>
          }
        </ul>
        <ul className='hidden md:flex items-center text-base font-semibold cursor-pointer'>
          { user ? 
            <NavbarLink to='/profile' text='Profil' /> :
            <NavbarLink to='/login' text='Zaloguj się' />
          } 
          { !user && <NavbarLink to='/signup' text='Zarejestruj się' /> }
        </ul>

        <button 
          onClick={() => setOpen(!open)} 
          className='block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:text-blue-700 
          active:bg-gray-300 transition duration-150 hover:bg-gray-200'
        >
          <MenuIcon className='self-center' />
        </button>
          
            
        <ul className={`
          md:hidden flex flex-col shadow items-center bg-gray-100 fixed w-[60%] top-0 font-semibold
          overflow-y-auto bottom-0 pl-2 duration-500 ${open ? "right-0" : "right-[-100%]"}`}
        >
          <div onClick={() => setOpen(!open)} className='py-3 px-4 mx-2 block mt-2 w-full'>
            <CloseIcon 
              className='focus:outline-none cursor-pointer active:text-red-700 
              transition duration-150 hover:text-red-500'   
            />
          </div>
      
          <h1 className='px-6 py-4 text-xl font-bold text-center w-full'>Menu</h1>
          <NavbarLink 
            icon={<HomeIcon className='mr-2' />} 
            role='mobile' 
            to='/home' 
            text='Home' 
          />
          <NavbarLink 
            icon={<SurveyIcon className='mr-2' />} 
            role='mobile' 
            to='/surveys' 
            text='Ankiety' 
          />
          <NavbarLink 
            icon={<SurveyIcon className='mr-2' />} 
            role='mobile' 
            to='/addsurvey' 
            text='Dodaj Ankiete' 
          />
          { !user && 
            <NavbarLink 
              icon={<UserPlusIcon className='mr-2' />} 
              role='mobile'
              to='/signup' 
              text='Rejestracja' 
            /> 
          }
          { user ?
            <NavbarLink
              icon={<UserIcon className='mr-2' />}  
              role='mobile' 
              to='/profile' 
              text='Profil' 
            /> :
            <NavbarLink
              icon={<LoginIcon className='mr-2' />}
              role='mobile' 
              to='/login' 
              text='Login' 
            />
          } 
        </ul>
      </div>
    </nav>
  )
} 