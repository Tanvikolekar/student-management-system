import React, { useState, useEffect } from 'react'
import { getAllStudents, deleteStudent, updateStudent, addStudent } from '../services/api'

const Student = () => {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [editingStudent, setEditingStudent] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [isAddingStudent, setIsAddingStudent] = useState(false)
  const [addFormData, setAddFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const data = await getAllStudents()
      setStudents(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch students. Please check if the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id)
        setStudents(students.filter(student => student.studentId !== id))
      } catch (err) {
        setError('Failed to delete student')
        console.error(err)
      }
    }
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    setEditFormData({ ...student })
  }

  const handleDetails = (student) => {
    setSelectedStudent(student)
  }

  const closeModal = () => {
    setSelectedStudent(null)
  }

  const closeEditModal = () => {
    setEditingStudent(null)
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
      await updateStudent(editingStudent.studentId, editFormData)
      
      // Update the students list with the modified student
      setStudents(students.map(s => 
        s.studentId === editingStudent.studentId ? editFormData : s
      ))
      
      closeEditModal()
      setError(null)
    } catch (err) {
      setError('Failed to update student')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const openAddModal = () => {
    setIsAddingStudent(true)
    setAddFormData({})
  }

  const closeAddModal = () => {
    setIsAddingStudent(false)
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
      const newStudent = await addStudent(addFormData)
      
      // Add the new student to the list
      setStudents([...students, newStudent])
      
      closeAddModal()
      setError(null)
    } catch (err) {
      setError('Failed to add student')
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
        Add New Student
      </button>

      {/* Error Message */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
          <button
            onClick={fetchStudents}
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
      ) : students.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-gray-600 text-lg'>No students found. Click "Add New Student" to create one.</p>
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
                <th className='border border-gray-600 px-4 py-3 text-left'>Class</th>
                <th className='border border-gray-600 px-4 py-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className='hover:bg-gray-100 transition-colors'>
                  <td className='border border-gray-300 px-4 py-3'>{student.studentId}</td>
                  <td className='border border-gray-300 px-4 py-3'>{student.first_name}</td>
                  <td className='border border-gray-300 px-4 py-3'>{student.last_name}</td>
                  <td className='border border-gray-300 px-4 py-3'>{student.email}</td>
                  <td className='border border-gray-300 px-4 py-3'>{student.class}</td>
                  <td className='border border-gray-300 px-4 py-3'>
                    <div className='flex gap-2 justify-center flex-wrap'>
                      <button
                        onClick={() => handleDetails(student)}
                        className='bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded transition-colors font-medium text-sm'
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEdit(student)}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors font-medium text-sm'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.studentId)}
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
      {selectedStudent && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto'>
            <div className='sticky top-0 bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Student Details</h2>
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
                    <label className='text-gray-600 font-semibold'>Student ID</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.studentId}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>First Name</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.first_name}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Last Name</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.last_name}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Email</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Gender</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.gender}</p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <label className='text-gray-600 font-semibold'>Phone No</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Address</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.address}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Date of Birth</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.dob}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Admission Date</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.admissionDate}</p>
                  </div>
                  <div>
                    <label className='text-gray-600 font-semibold'>Class</label>
                    <p className='text-gray-900 text-lg'>{selectedStudent.class}</p>
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
      {editingStudent && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Edit Student</h2>
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
                  <label className='block text-gray-700 font-semibold mb-2'>Student ID</label>
                  <input
                    type='text'
                    disabled
                    value={editFormData.studentId || ''}
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
                  <label className='block text-gray-700 font-semibold mb-2'>Gender</label>
                  <select
                    name='gender'
                    value={editFormData.gender || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  >
                    <option value=''>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-gray-700 font-semibold mb-2'>Address</label>
                  <textarea
                    name='address'
                    value={editFormData.address || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    rows='3'
                  ></textarea>
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Date of Birth</label>
                  <input
                    type='date'
                    name='dob'
                    value={editFormData.dob || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Admission Date</label>
                  <input
                    type='date'
                    name='admissionDate'
                    value={editFormData.admissionDate || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Class</label>
                  <input
                    type='text'
                    name='class'
                    value={editFormData.class || ''}
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

      {/* Add Student Modal */}
      {isAddingStudent && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='sticky top-0 bg-gradient-to-r from-green-600 to-green-800 text-white p-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Add New Student</h2>
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
                  <label className='block text-gray-700 font-semibold mb-2'>Gender</label>
                  <select
                    name='gender'
                    value={addFormData.gender || ''}
                    onChange={handleAddInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  >
                    <option value=''>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Date of Birth</label>
                  <input
                    type='date'
                    name='dob'
                    value={addFormData.dob || ''}
                    onChange={handleAddInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Admission Date</label>
                  <input
                    type='date'
                    name='admissionDate'
                    value={addFormData.admissionDate || ''}
                    onChange={handleAddInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Class</label>
                  <input
                    type='text'
                    name='class'
                    value={addFormData.class || ''}
                    onChange={handleAddInputChange}
                    placeholder='Enter class'
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
                  {isSaving ? 'Adding...' : 'Add Student'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Student