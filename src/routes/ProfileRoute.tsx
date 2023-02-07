import { useUserAuth } from '../context/AuthContext'

// Components
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'


export default function ProfileRoute() {
  const { user, logOut } = useUserAuth()
  const navigate = useNavigate()


  const handleSignOut = async () => { 
    logOut().catch(err => console.error(err))
    navigate('../home')
  }

  return (
    <div className='max-w-[600px] m-auto'>
      <p className='text-xl'>Profil użytkownika:</p>
      <p>Nazwa użytkownika: { user?.displayName || user?.email }</p>
      <Button color='danger' onClick={handleSignOut} text='Wyloguj' />
    </div>
  )
}