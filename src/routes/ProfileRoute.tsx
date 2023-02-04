import { useUserAuth } from '../context/AuthContext'

// Components
import Button from '../components/Button'


export default function ProfileRoute() {
  const { user, logOut } = useUserAuth()

  const handleSignOut = async () => { 
    logOut().catch(err => console.error(err))
  }

  return (
    <div>
      <p className='text-xl'>Profil użytkownika:</p>
      <p>Nazwa użytkownika: { user?.displayName || user?.email }</p>
      <Button color='danger' onClick={handleSignOut} text='Wyloguj' />
    </div>
  )
}