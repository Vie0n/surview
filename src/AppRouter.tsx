import { createBrowserRouter } from 'react-router-dom'

// Routes
import RootRoute from './routes/RootRoute'
import ErrorRoute from './routes/ErrorRoute'

import HomeRoute from './routes/HomeRoute'
import LoginRoute from './routes/LoginRoute'
import SignupRoute from './routes/SignupRoute'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/home',
        element: <HomeRoute />
      },
      {
        path: '/login',
        element: <LoginRoute />
      },
      {
        path: '/signup',
        element: <SignupRoute />
      }
    ]
  }
])

export default AppRouter