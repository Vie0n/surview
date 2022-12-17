import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { useUserAuth } from '../context/AuthContext'

// Components
import LoginForm from '../components/LoginForm'


export default function LoginRoute() {
  const { user } = useUserAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/profile')
  }, [user])

  return (
    <div>
      <LoginForm />
    </div>
  )
}