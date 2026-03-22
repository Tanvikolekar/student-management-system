import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerRequest } from '../services/api'

const Registration = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [role , setRole] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!userName || !password || !role) {
      setError('All fields are required.')
      return
    }

    setLoading(true)
    try {
      const data = await registerRequest({ userName, password, role })
      if (data?.token) {
        localStorage.setItem('token', data.token)
      }
      localStorage.setItem('user', JSON.stringify(data))
      setSuccess('Registration successful. Redirecting to dashboard...')
      setTimeout(() => navigate('/app'), 1300)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200'>
      <div className='w-full max-w-lg p-8 rounded-2xl shadow-lg bg-white border border-purple-200'>
        <h2 className='text-3xl font-bold text-purple-700 mb-6 text-center'>Create Account</h2>

        {error && <div className='text-red-600 bg-red-50 border border-red-200 p-2 rounded mb-4'>{error}</div>}
        {success && <div className='text-green-600 bg-green-50 border border-green-200 p-2 rounded mb-4'>{success}</div>}

        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
          <div>
            <label className='block mb-2 text-sm font-medium text-purple-700'>User Name</label>
            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              placeholder='John'
            />
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-purple-700'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              placeholder='Create a strong password'
            />
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-purple-700'>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
            >
              <option value=''>Select a role</option>
              <option value='student'>Student</option>
              <option value='teacher'>Teacher</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300'
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className='mt-4 text-center text-sm text-purple-600'>
          Already have an account?{' '}
          <Link to='/login' className='font-semibold text-purple-700 hover:text-purple-900'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Registration