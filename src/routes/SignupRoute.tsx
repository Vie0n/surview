import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContextType } from "../@types/auth"
import { AuthContext } from "../context/AuthContext"


export default function SignupRoute() {
  const { user } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/home')
  }, [user])

  return (
    <div>
      <p className='text-xl'>SIGN UP</p>
    </div>
  )
}