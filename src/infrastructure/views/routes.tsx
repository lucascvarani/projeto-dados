import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'

export function AppRoutes() {
  useEffect(() => {
    // TODO CALL TO API PASSING TOKEN TO GET INFORMATION ABOUT USER, TO DISPATCH USER TO REDUX HERE
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}
