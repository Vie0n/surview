import { useContext, createContext } from 'react'
import { auth } from '../firebase'
import { 
  GoogleAuthProvider, 
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "firebase/auth";


interface IAuthContextProps {
  children: React.ReactNode
}

const AuthContext = createContext<object | null>(null)

export const AuthContextProvider: React.FC<IAuthContextProps> = ({ children }) => {
  
  // Login with google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }
  
  return (
    <AuthContext.Provider value={{ googleSignIn }}>
      { children }
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}