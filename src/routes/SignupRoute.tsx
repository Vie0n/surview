import type { UserCredential } from "firebase/auth"

// Hooks
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/AuthContext"

// Components
import Button from "../components/Button"



export default function SignupRoute() {
  const [email, setEmail] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')

  const { user, createUser, emailSignIn } = useUserAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/home')
  }, [user])

  // Register
  const registerUser = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    createUser(email, pwd)
    .then(() => navigate('/account'))
    .catch(err => console.error(err))
  }

  return (
    <form className='max-w-[600px] m-auto' onSubmit={ev => registerUser(ev)}>
      <h1 className='text-2xl font-bold py-4'>Panel rejestracji</h1>
      <div className='flex flex-col py-1'>
        <label className="py-2 font-medium">Adres email</label>
        <input 
          type="text"
          onChange={ev => setEmail(ev.target.value)} 
          className="rounded-lg hover:drop-shadow-md border p-2 duration-150" 
          />
      </div>
      <div className='flex flex-col py-1'>
        <label className="py-2 font-medium">Hasło</label>
        <input 
          type="password"
          onChange={ev => setPwd(ev.target.value)}
          className="rounded-lg hover:drop-shadow-md border p-2 duration-150" 
          />
      </div>
      <p className='mt-1 mb-3'>
        Masz konto? Zaloguj się <Link className='text-blue-500 underline' to="/login">tutaj</Link>.
      </p>
      <Button type='submit' className='w-full mt-2' color='primary' text='Zarejestruj sie' />
    </form>
  )
}