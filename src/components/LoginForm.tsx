import { AuthContextType } from '../@types/auth'

import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Components
import GoogleButton from 'react-google-button'

export default function LoginForm() { 
  const { googleSignIn } = useContext(AuthContext) as AuthContextType

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1 className='text-center text-2xl font-bold py-4'>Zaloguj się</h1>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  )
}