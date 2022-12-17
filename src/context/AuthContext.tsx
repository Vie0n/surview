import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

import type { 
  AuthContextType, 
  IAuthContextProps 
} from '../@types/auth'

import { 
  GoogleAuthProvider, 
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'



export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Login with google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }
  
  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser)
    })
    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      { children }
    </AuthContext.Provider>
  )
}