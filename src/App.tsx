import React from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { queryClient } from './api'
import Router from './app/routes'
import Home from './app/routes/home'
import MyCat from './app/routes/my-cat'
import MyCats from './app/routes/my-cats'
import { GlobalProvider } from './app/state'

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
