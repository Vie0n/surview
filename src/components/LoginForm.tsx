import { useUserAuth } from '../context/AuthContext'

// Components
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Button from './Button'


export default function LoginForm() { 
  const { googleSignIn } = useUserAuth()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='max-w-[600px] m-auto'>
      <h1 className='text-2xl font-bold py-4'>Panel logowania</h1>
      <div className='flex flex-col py-1'>
        <label className="py-2 font-medium">Adres email</label>
        <input type="text" className="rounded-lg hover:drop-shadow-md border p-2 duration-150" />
      </div>
      <div className='flex flex-col py-1'>
        <label className="py-2 font-medium">Hasło</label>
        <input type="password" className="rounded-lg hover:drop-shadow-md border p-2 duration-150" />
      </div>
      <p className='mt-1 mb-3'>
        Nie masz konta? Zarejestruj się <Link className='text-blue-500 underline' to="/signup">tutaj</Link>.
      </p>
      <Button className='w-full mt-2' color='primary' text='Zaloguj' />

      <div className='grid grid-cols-3 gap-1 mt-4 py-2'>
        <hr className='self-center' /> 
        <span className='text-gray-500 place-self-center'>albo</span> 
        <hr className='self-center' />
      </div>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  )
}