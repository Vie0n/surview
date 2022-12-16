import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'

export default function RootRoute() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  )
}