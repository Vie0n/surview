import type { User } from "firebase/auth"

export interface IAuthContextProps {
  children: React.ReactNode
}

export type AuthContextType = {
  googleSignIn: () => void,
  logOut: () => void,
  user: User | null
}