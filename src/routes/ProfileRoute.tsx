import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserAuth } from '../context/AuthContext'

// Components
import Button from '../components/Button'



export default function ProfileRoute() {
  const { user, logOut } = useUserAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/home')
  }, [user])

  const handleSignOut = async () => { 
    try {
      await logOut()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <p className='text-xl'>Profil użytkownika:</p>
      <p>Nazwa użytkownika: { user?.displayName }</p>
      <Button color='danger' onClick={handleSignOut} text='Wyloguj' />
    </div>
  )
}