import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // TODO: Replace with actual API call to backend
      // const response = await api.login(email, password)
      // For now, simple demo login (remove this in production)
      if (email === 'admin@school.com' && password === 'admin123') {
        localStorage.setItem('adminEmail', email)
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600'>
      <div className='bg-white rounded-lg shadow-2xl p-8 w-full max-w-md'>
        {/* Logo/Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-purple-600 mb-2'>🎓 SMS</h1>
          <p className='text-gray-600'>Student Management System</p>
          <p className='text-gray-500 text-sm mt-1'>Admin Login</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className='space-y-4'>
          {/* Email Input */}
          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='admin@school.com'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition'
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition'
              disabled={loading}
            />
          </div>

          {/* Login Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50'
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <p className='text-gray-700 font-semibold text-sm mb-2'>Demo Credentials:</p>
          <p className='text-gray-600 text-sm'>Email: <span className='font-mono'>admin@school.com</span></p>
          <p className='text-gray-600 text-sm'>Password: <span className='font-mono'>admin123</span></p>
        </div>

        {/* Footer */}
        <p className='text-center text-gray-500 text-xs mt-6'>
          © 2026 Student Management System. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login