import { createBrowserRouter } from 'react-router-dom'

// Routes
import RootRoute from './routes/RootRoute'
import ErrorRoute from './routes/ErrorRoute'

import HomeRoute from './routes/HomeRoute'
import LoginRoute from './routes/LoginRoute'
import SignupRoute from './routes/SignupRoute'
import ProfileRoute from './routes/ProfileRoute'
import SurveyListRoute from './routes/SurveyListRoute'
import SingleSurveyRoute from './routes/SingleSurveyRoute'
import AddSurveyRoute from './routes/AddSurveyRoute'

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
      },
      {
        path: '/profile',
        element: <ProfileRoute />
      },
      {
        path: '/surveys',
        element: <SurveyListRoute />
      },
      {
        path: '/survey/:id',
        element: <SingleSurveyRoute />
      },
      {
        path: '/addsurvey',
        element: <AddSurveyRoute />
      }
    ]
  }
])

export default AppRouter