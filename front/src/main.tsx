import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppRoutes } from './router/AppRoutes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AppRoutes />
    </QueryClientProvider>
  </React.StrictMode>,
)
