import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useUserAuth } from "../context/AuthContext"


export default function SignupRoute() {
  const { user } = useUserAuth()
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