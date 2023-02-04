import isEmail from 'validator/lib/isEmail'

// Hooks
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/AuthContext'

// Components
import GoogleButton from 'react-google-button'
import Button from '../components/Button'
import FormInput from '../components/FormInput'


export default function LoginRoute() {
  // Email/password state
  const [email, setEmail] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(false)

  const { googleSignIn, emailSignIn, user } = useUserAuth()
  const navigate = useNavigate()

  // Login with pass/mail
  const handleEmailSignIn = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    emailSignIn(email, pwd)
    .then(() => navigate('/profile'))
    .catch(err => console.error(err))
  }

  // Login with google
  const handleGoogleSignIn = async () => {
    googleSignIn()
    .then(() => navigate('/profile'))
    .catch(err => console.error(err))
  }

  // On email change
  useEffect(() => { 
    setValidEmail(isEmail(email) && email !== '')
  }, [email])

  // If logged in => redirect
  useEffect(() => {
    if (user) navigate('/profile')
  }, [user])

  return (
    <form className='max-w-[600px] m-auto' onSubmit={(ev) => handleEmailSignIn(ev)}>
      <h1 className='text-2xl font-bold py-4'>Panel logowania</h1>

      <FormInput
        fieldName='Adres email'
        type='email'
        onChange={ev => setEmail(ev.target.value)}
        isvalid={validEmail} 
        errormsg={'Niepoprawny adres email.'} 
        required
      />

      <FormInput
        fieldName='Hasło' 
        type='password'
        onChange={ev => setPwd(ev.target.value)}
        isvalid={pwd.length > 0} 
        errormsg={'Wprowadź hasło.'} 
        required
      />

      <p className='mt-1 mb-3'>
        Nie masz konta? Zarejestruj się <Link className='text-blue-500 underline' to="/signup">tutaj</Link>.
      </p>
      <Button type='submit' className='w-full mt-2' color='primary' text='Zaloguj' />

      <div className='grid grid-cols-3 gap-1 mt-4 py-2'>
        <hr className='self-center' /> 
        <span className='text-gray-500 place-self-center'>albo</span> 
        <hr className='self-center' />
      </div>

      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </form>
  )
}