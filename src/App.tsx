import React from 'react'
import ReactDOM from 'react-dom/client'

// Styles
import './App.css'

// Router
import { RouterProvider } from 'react-router-dom'
import AppRouter from './AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>,
)
