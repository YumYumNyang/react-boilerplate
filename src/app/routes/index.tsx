import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './home'
import MyCat from './my-cat'
import MyCats from './my-cats'
import Todo from './todo'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/my-cats" element={<MyCats />}>
          <Route path=":catId" element={<MyCat />} />
        </Route>
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
