import React, { useState, useEffect } from 'react'
import { getAllTeachers, deleteTeacher, updateTeacher, addTeacher } from '../services/api'

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [isAddingTeacher, setIsAddingTeacher] = useState(false)
  const [addFormData, setAddFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      setLoading(true)
      const data = await getAllTeachers()
      setTeachers(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch teachers. Please check if the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteTeacher(id)
        setTeachers(teachers.filter(teacher => teacher.teacherId !== id))
      } catch (err) {
        setError('Failed to delete teacher')
        console.error(err)
      }
    }
  }

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher)
    setEditFormData({ ...teacher })
  }

  const handleDetails = (teacher) => {
    setSelectedTeacher(teacher)
  }

  const closeModal = () => {
    setSelectedTeacher(null)
  }

  const closeEditModal = () => {
    setEditingTeacher(null)
    setEditFormData({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveEdit = async () => {
    try {
      setIsSaving(true)
      await updateTeacher(editingTeacher.teacherId, editFormData)
      
      // Update the teachers list with the modified teacher
      setTeachers(teachers.map(t => 
        t.teacherId === editingTeacher.teacherId ? editFormData : t
      ))
      
      closeEditModal()
      setError(null)
    } catch (err) {
      setError('Failed to update teacher')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const openAddModal = () => {
    setIsAddingTeacher(true)
    setAddFormData({})
  }

  const closeAddModal = () => {
    setIsAddingTeacher(false)
    setAddFormData({})
  }

  const handleAddInputChange = (e) => {
    const { name, value } = e.target
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveAdd = async () => {
    // Validate required fields
    if (!addFormData.first_name || !addFormData.last_name || !addFormData.email) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setIsSaving(true)
      const newTeacher = await addTeacher(addFormData)
      
      // Add the new teacher to the list
      setTeachers([...teachers, newTeacher])
      
      closeAddModal()
      setError(null)
    } catch (err) {
      setError('Failed to add teacher')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='px-20 py-10'>
      <button 
        onClick={openAddModal}
        className='bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold mb-6 transition-colors'
      >
        Add New Teacher
      </button>

      {/* Error Message */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
          <button
            onClick={fetchTeachers}
            className='ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
        </div>
      ) : teachers.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-gray-600 text-lg'>No teachers found. Click "Add New Teacher" to create one.</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-800 text-white'>
                <th className='border border-gray-600 px-4 py-3 text-left'>ID</th>
                <th className='border border-gray-600 px-4 py-3 text-left'>First Name</th>
                <th className='border border-gray-600 px-4 py-3 text-left'>Last Name</th>
                <th className='border border-gray-600 px-4 py-3 text-left'>Email</th>
                <th className='border border-gray-600 px-4 py-3 text-left'>Subject</th>
                <th className='border border-gray-600 px-4 py-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.teacherId} className='hover:bg-gray-100 transition-colors'>
                  <td className='border border-gray-300 px-4 py-3'>{teacher.teacher_id}</td>
                  <td className='border border-gray-300 px-4 py-3'>{teacher.first_name}</td>
                  <td className='border border-gray-300 px-4 py-3'>{teacher.last_name}</td>
                  <td className='border border-gray-300 px-4 py-3'>{teacher.email}</td>
                  <td className='border border-gray-300 px-4 py-3'>{teacher.subject || 'N/A'}</td>
                  <td className='border border-gray-300 px-4 py-3'>
                    <div className='flex gap-2 justify-center flex-wrap'>
                      <button
                        onClick={() => handleDetails(teacher)}
                        className='bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded transition-colors font-medium text-sm'
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEdit(teacher)}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors font-medium text-sm'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.teacher_id)}
                        className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-colors font-medium text-sm'
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedTeacher && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto'>
            <div className='sticky top-0 bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Teacher Details</h2>
              <button
                onClick={closeModal}
                className='text-2xl hover:text-gray-200 transition-colors'
              >
                ✕
              </button>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <label className='text-gray-600 font-semibold'>Teacher ID</label>
                    <p className='text-gray-900 text-lg'>{selectedTeacher.teacher_id}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>First Name</label>
                    <p className='text-gray-900 text-lg'>{selectedTeacher.first_name}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Last Name</label>
                    <p className='text-gray-900 text-lg'>{selectedTeacher.last_name}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Email</label>
                    <p className='text-gray-900 text-lg'>{selectedTeacher.email}</p>
                  </div>
                  
                </div>

                <div className='space-y-4'>
                  <div>
                    <label className='text-gray-600 font-semibold'>Phone No</label>
                    <p className='text-gray-900 text-lg'>{selectedTeacher.phone || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className='text-gray-600 font-semibold'>Subject</label>
                    <p className='text-gray-900 text-lg'>{selectedTeacher.subject || 'N/A'}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Joining Date</label>
                    <p className='text-gray-900 text-lg'>{selectedTeacher.hire_date || 'N/A'}</p>
                  </div>
                  
                </div>
              </div>

              <div className='mt-6 flex justify-end'>
                <button
                  onClick={closeModal}
                  className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingTeacher && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Edit Teacher</h2>
              <button
                onClick={closeEditModal}
                className='text-2xl hover:text-gray-200 transition-colors'
              >
                ✕
              </button>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Teacher ID</label>
                  <input
                    type='text'
                    disabled
                    value={editFormData.teacherId || ''}
                    className='w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600 cursor-not-allowed'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={editFormData.email || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>First Name</label>
                  <input
                    type='text'
                    name='first_name'
                    value={editFormData.first_name || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Last Name</label>
                  <input
                    type='text'
                    name='last_name'
                    value={editFormData.last_name || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Phone</label>
                  <input
                    type='text'
                    name='phone'
                    value={editFormData.phone || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Subject</label>
                  <input
                    type='text'
                    name='subject'
                    value={editFormData.subject || ''}
                    onChange={handleInputChange}
                    placeholder='Enter subject'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Joining Date</label>
                  <input
                    type='date'
                    name='joiningDate'
                    value={editFormData.hire_date || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

              </div>

              <div className='mt-6 flex justify-end gap-3'>
                <button
                  onClick={closeEditModal}
                  className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-medium disabled:opacity-50'
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {isAddingTeacher && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='sticky top-0 bg-gradient-to-r from-green-600 to-green-800 text-white p-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Add New Teacher</h2>
              <button
                onClick={closeAddModal}
                className='text-2xl hover:text-gray-200 transition-colors'
              >
                ✕
              </button>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>First Name *</label>
                  <input
                    type='text'
                    name='first_name'
                    value={addFormData.first_name || ''}
                    onChange={handleAddInputChange}
                    placeholder='Enter first name'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Last Name *</label>
                  <input
                    type='text'
                    name='last_name'
                    value={addFormData.last_name || ''}
                    onChange={handleAddInputChange}
                    placeholder='Enter last name'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-gray-700 font-semibold mb-2'>Email *</label>
                  <input
                    type='email'
                    name='email'
                    value={addFormData.email || ''}
                    onChange={handleAddInputChange}
                    placeholder='Enter email address'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Phone</label>
                  <input
                    type='text'
                    name='phone'
                    value={addFormData.phone || ''}
                    onChange={handleAddInputChange}
                    placeholder='Enter phone number'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Subject</label>
                  <input
                    type='text'
                    name='subject'
                    value={addFormData.subject || ''}
                    onChange={handleAddInputChange}
                    placeholder='Enter subject'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Joining Date</label>
                  <input
                    type='date'
                    name='joiningDate'
                    value={addFormData.hire_date || ''}
                    onChange={handleAddInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-gray-700 font-semibold mb-2'>Address</label>
                  <textarea
                    name='address'
                    value={addFormData.address || ''}
                    onChange={handleAddInputChange}
                    placeholder='Enter address'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                    rows='3'
                  ></textarea>
                </div>
              </div>
              <div className='mt-6 flex justify-end gap-3'>
                <button
                  onClick={closeAddModal}
                  className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdd}
                  disabled={isSaving}
                  className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors font-medium disabled:opacity-50'
                >
                  {isSaving ? 'Adding...' : 'Add Teacher'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Teachers
