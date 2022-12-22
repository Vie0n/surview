import type { User, UserCredential } from 'firebase/auth'

export interface IAuthContextProps {
  children: React.ReactNode
}

export type AuthContextType = {
  createUser: (email: string, password: string) => Promise<UserCredential>,
  googleSignIn: () => void,
  emailSignIn: (email: string, password: string) => Promise<UserCredential>,
  logOut: () => void,
  user: User | null
}