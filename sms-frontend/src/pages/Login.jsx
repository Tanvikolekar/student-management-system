import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginRequest } from '../services/api'

const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // ✅ Validation FIRST
    if (!username || !password) {
      setError('Username and password are required.')
      return
    }

    setLoading(true)

    try {
      const res = await loginRequest({ username, password })

      console.log("FULL RESPONSE:", res) // 🔥 debug

      // ✅ Handle different API formats
      const token = res?.token || res?.data?.token

      if (!token) {
        setError("Login failed: Token not received from server")
        return
      }

      // ✅ Save token
      localStorage.setItem('token', token)

      // ✅ Save user (optional)
      localStorage.setItem('user', JSON.stringify(res))

      // ✅ Redirect to main layout
      navigate('/app', { replace: true })

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Login failed. Check credentials and try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200'>
      <div className='w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-purple-200'>

        <h2 className='text-3xl font-bold text-purple-700 mb-6 text-center'>
          Student Portal Login
        </h2>

        {error && (
          <div className='text-red-600 bg-red-50 border border-red-200 p-2 rounded mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* Username */}
          <div>
            <label className='block mb-2 text-sm font-medium text-purple-700'>
              User Name
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete='username'
              className='w-full px-4 py-2 border rounded-lg border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              placeholder='Enter username'
            />
          </div>

          {/* Password */}
          <div>
            <label className='block mb-2 text-sm font-medium text-purple-700'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
              className='w-full px-4 py-2 border rounded-lg border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              placeholder='Enter password'
            />
          </div>

          {/* Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p className='mt-4 text-center text-sm text-purple-600'>
          Don&apos;t have an account?{' '}
          <Link
            to='/register'
            className='font-semibold text-purple-700 hover:text-purple-900'
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login