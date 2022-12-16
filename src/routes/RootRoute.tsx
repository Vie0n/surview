import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'

export default function RootRoute() {
  return (
    <>
      <Navbar />
      <section className='mt-20 px-2'>
        <Outlet />
      </section>
    </>
  )
}