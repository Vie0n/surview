import { createBrowserRouter } from 'react-router-dom'

import RequireAuth from './components/RequireAuth'

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
import MySurveysRoute from './routes/MySurveysRoute'

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
        element: <RequireAuth><ProfileRoute /></RequireAuth>
      },
      {
        path: '/surveys',
        element: <RequireAuth><SurveyListRoute /></RequireAuth>
      },
      {
        path: '/survey/:id',
        element: <RequireAuth><SingleSurveyRoute /></RequireAuth>
      },
      {
        path: '/addsurvey',
        element: <RequireAuth><AddSurveyRoute /></RequireAuth>
      },
      {
        path: '/mysurvey',
        element: <RequireAuth><MySurveysRoute /></RequireAuth>
      }
    ]
  }
])

export default AppRouter