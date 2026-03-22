import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Registration from './pages/Registration'
import Class from './pages/Class'
import Course from './pages/Course'
import Dashboard from './pages/Dashboard'
import Student from './pages/Student'
import Teachers from './pages/Teachers'

import MainLayout from './components/MainLayout'

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route - always show login first */}
        <Route path='/' element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />

        {/* Protected Routes */}
        <Route
          path='/app'
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          {/* Nested pages */}
          <Route index element={<Dashboard />} />
          <Route path='/app/student' element={<Student />} />
          <Route path='/app/teacher' element={<Teachers />} />
          <Route path='/app/class' element={<Class />} />
          <Route path='/app/course' element={<Course />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App