import { Outlet } from 'react-router-dom'

// Context
import { AuthContextProvider } from '../context/AuthContext'

// Components
import Navbar from '../components/Navbar'


export default function RootRoute() {
  return (
    <AuthContextProvider>
      <Navbar />
      <section className='mt-20 px-2'>
        <Outlet />
      </section>
    </AuthContextProvider>
  )
}