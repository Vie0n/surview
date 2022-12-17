import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthContext'

// Components
import LoginForm from '../components/LoginForm'


export default function LoginRoute() {
  const { user } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/home')
  }, [user])

  return (
    <div>
      <LoginForm />
    </div>
  )
}