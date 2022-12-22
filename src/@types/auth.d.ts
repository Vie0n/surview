import type { User, UserCredential } from 'firebase/auth'

export interface IAuthContextProps {
  children: React.ReactNode
}

export type AuthContextType = {
  createUser: (email: string, password: string) => Promise<UserCredential>,
  googleSignIn: () => Promise<never>,
  emailSignIn: (email: string, password: string) => Promise<UserCredential>,
  logOut: () => Promise<void>,
  user: User | null
}