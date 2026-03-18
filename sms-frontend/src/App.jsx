
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Class from './pages/Class'
import Course from './pages/Course'
import Dashboard from './pages/Dashboard'
import Student from './pages/Student'
import Teachers from './pages/Teachers'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route - No Layout */}
        <Route path="/login" element={<Login />} />

        {/* Main Routes with Layout */}
        <Route
          path="/*"
          element={
            <div className='flex h-screen'>
              <div className='flex-1 flex flex-col'>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/student" element={<Student />} />
                  <Route path="/teacher" element={<Teachers />} />
                  <Route path="/class" element={<Class />} />
                  <Route path="/course" element={<Course />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
