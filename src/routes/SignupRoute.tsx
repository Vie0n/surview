import isEmail from "validator/lib/isEmail"

// Hooks
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/AuthContext"

// Components
import Button from "../components/Button"

// Password req
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignupRoute() {
  // Email states
  const [email, setEmail] = useState<string>('')
  const [emailFocus, setEmailFocus] = useState<boolean>(false)
  const [validEmail, setValidEmail] = useState<boolean>(false)

  // Password states
  const [pwd, setPwd] = useState<string>('')
  const [pwdFocus, setPwdFocus] = useState<boolean>(false)
  const [validPwd, setValidPwd] = useState<boolean>(false)

  // Password match
  const [matchPwd, setMatchPwd] = useState<string>('')
  const [matchFocus, setMatchFocus] = useState<boolean>(false)
  const [validMatch, setValidMatch] = useState<boolean>(false)

  const [errorMsg, setErrorMsg] = useState<string>('')

  // Auth/redirect hooks
  const { user, createUser } = useUserAuth()
  const navigate = useNavigate()
    

  // On email change
  useEffect(() => { 
    setValidEmail(isEmail(email) && email !== '')
  }, [email])

  // On password change
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd && matchPwd.length > 0)
  }, [pwd, matchPwd])

  // Clear error on user correction
  useEffect(() => {
    setErrorMsg('')
  }, [email, pwd, matchPwd])

  // If user logged in => redirect
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
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          className={`focus:outline-none rounded-lg hover:drop-shadow-md border-2 p-2 duration-150
          ${!validEmail ? 'focus:border-rose-500' : 'focus:border-green-500'}`}
          required
        />
        { (!validEmail && emailFocus) && 
          <p className="pl-4 text-red-500 text-sm">
            Niepoprawny adres email.
          </p>
        }
      </div>

      <div className='flex flex-col py-1'>
        <label className="py-2 font-medium">Hasło</label>
        <input 
          type="password"
          onChange={ev => setPwd(ev.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          className={`focus:outline-none rounded-lg hover:drop-shadow-md border-2 p-2 duration-150
          ${!validPwd ? 'focus:border-rose-500' : 'focus:border-green-500'}`}
          required
        />
        { (!validPwd && pwdFocus) && 
          <p className="pl-4 text-red-500 text-sm">
            Hasło musi zawierać: <br />
            - Od 8 do 24 liter.<br />
            - Musi zawierac małe i duże litery, cyfry oraz specjalny znak.<br />
            - Dozwolone znaki specjalne to: ! @ # $ %
          </p>
        }
      </div>

      <div className='flex flex-col py-1'>
        <label className="py-2 font-medium">Powtórz Hasło</label>
        <input 
          type="password"
          onChange={ev => setMatchPwd(ev.target.value)}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          className={`focus:outline-none rounded-lg hover:drop-shadow-md border-2 p-2 duration-150
          ${!validMatch || matchPwd.length <= 0 ? 'focus:border-rose-500' : 'focus:border-green-500'}`}
          required
        />
        { (!validMatch && matchFocus) && 
          <p className="pl-4 text-red-500 text-sm">
            Oba hasła muszą być identyczne.
          </p>
        }
      </div>
      
      <p className='mt-1 mb-3'>
        Masz konto? Zaloguj się <Link className='text-blue-500 underline' to="/login">tutaj</Link>.
      </p>
      <Button 
        disabled={!validPwd || !validEmail || !validMatch ? true : false} 
        type='submit' 
        className='w-full mt-2' 
        color='primary'
        text='Zarejestruj sie' 
      />
    </form>
  )
}