import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

import type { 
  AuthContextType, 
  IAuthContextProps 
} from '../@types/auth'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth'



const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Register with email and password
  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login with google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  // Login with email and password
  const emailSignIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  
  const logOut = () => signOut(auth)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser))
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ createUser, googleSignIn, emailSignIn, logOut, user }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useUserAuth = () => useContext(AuthContext) as AuthContextType