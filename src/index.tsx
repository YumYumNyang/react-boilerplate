import { config } from 'process'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from './api'
import App from './App'
import { ReactQueryDevtools } from 'react-query/devtools'
import { GlobalProvider } from './app/state'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <GlobalProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <App />
    </QueryClientProvider>
  </GlobalProvider>
)
