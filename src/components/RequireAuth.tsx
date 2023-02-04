import { IRequireAuthProps } from "../@types/requireAuth"
import { useLocation, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/AuthContext"
import { useEffect } from "react"

export default function RequireAuth(props: IRequireAuthProps) {
  const { children } = props
  const { user } = useUserAuth()

  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!user) 
      navigate('/login', { 
        state: { 
          from: location 
        }, 
        replace: true 
      })
  })
  

  return children
}