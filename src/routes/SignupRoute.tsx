import isEmail from "validator/lib/isEmail"

// Hooks
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/AuthContext"

// Components
import Button from "../components/Button"
import FromInput from "../components/FormInput"

// Password req
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


export default function SignupRoute() {
  // Email states
  const [email, setEmail] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(false)

  // Password states
  const [pwd, setPwd] = useState<string>('')
  const [validPwd, setValidPwd] = useState<boolean>(false)

  // Password match
  const [matchPwd, setMatchPwd] = useState<string>('')
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
    .then(() => navigate('/profile'))
    .catch(err => console.error(err))
  }

  return (
    <form className='max-w-[600px] m-auto' onSubmit={ev => registerUser(ev)}>
      <h1 className='text-2xl font-bold py-4'>Panel rejestracji</h1>
      <FromInput
        fieldName='Adres email' 
        type='text'
        onChange={ev => setEmail(ev.target.value)}
        isvalid={validEmail} 
        errormsg={'Niepoprawny adres email.'} 
        required
      />

      <FromInput 
        fieldName='Hasło'
        type='password'
        onChange={ev => setPwd(ev.target.value)}
        isvalid={validPwd} 
        errormsg={<>
          Hasło musi zawierać: <br />
          - Od 8 do 24 liter.<br />
          - Musi zawierac małe i duże litery, cyfry oraz specjalny znak.<br />
          - Dozwolone znaki specjalne to: ! @ # $ %
        </>} 
        required
      />

      <FromInput 
        fieldName='Powtórz Hasło'
        type='password'
        onChange={ev => setMatchPwd(ev.target.value)}
        isvalid={validMatch} 
        errormsg={'Oba hasła muszą być identyczne.'} 
        required
      />
      
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