import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './router/AppRoutes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/App.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AppRoutes />
    </QueryClientProvider>
  </React.StrictMode>,
)
