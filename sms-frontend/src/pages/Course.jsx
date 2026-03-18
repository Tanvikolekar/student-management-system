import React, { useState, useEffect } from 'react'
import { getAllCourses, addCourse, updateCourse, deleteCourse, getAllTeachers } from '../services/api'

const Course = () => {
  const [courses, setCourses] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [editingCourse, setEditingCourse] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [isAdding, setIsAdding] = useState(false)
  const [addFormData, setAddFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [courseData, teacherData] = await Promise.all([getAllCourses(), getAllTeachers()])
      setCourses(courseData)
      setTeachers(teacherData)
      setError(null)
    } catch (err) {
      setError('Failed to load courses or teachers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return
    try {
      await deleteCourse(id)
      setCourses(courses.filter(c => c.course_id !== id))
    } catch (err) {
      setError('Failed to delete course')
    }
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setEditFormData({ course_name: course.course_name, teacher_id: course.teacher ? course.teacher.teacher_id : '' })
  }

  const handleDetails = (course) => setSelectedCourse(course)
  const closeDetails = () => setSelectedCourse(null)
  const closeEdit = () => { setEditingCourse(null); setEditFormData({}) }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveEdit = async () => {
    try {
      setIsSaving(true)
      await updateCourse(editingCourse.course_id, editFormData)
      setCourses(courses.map(c => c.course_id === editingCourse.course_id ? { ...c, course_name: editFormData.course_name, teacher: teachers.find(t=>t.teacher_id==editFormData.teacher_id) || null } : c))
      closeEdit()
    } catch (err) {
      setError('Failed to update course')
    } finally { setIsSaving(false) }
  }

  const openAdd = () => { setIsAdding(true); setAddFormData({}) }
  const closeAdd = () => { setIsAdding(false); setAddFormData({}) }
  const handleAddChange = (e) => { const { name, value } = e.target; setAddFormData(prev=>({ ...prev, [name]: value })) }

  const handleSaveAdd = async () => {
    if (!addFormData.course_name) { setError('Course name required'); return }
    try {
      setIsSaving(true)
      const newCourse = await addCourse(addFormData)
      setCourses([...courses, newCourse])
      closeAdd()
    } catch (err) { setError('Failed to add course') } finally { setIsSaving(false) }
  }

  return (
    <div className='px-20 py-10'>
      <button onClick={openAdd} className='bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold mb-6'>Add New Course</button>

      {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{error}</div>}

      {loading ? (
        <div className='flex justify-center items-center h-64'><div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div></div>
      ) : courses.length === 0 ? (
        <div className='text-center py-10'>No courses found.</div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-800 text-white'>
                <th className='border px-4 py-3 text-left'>ID</th>
                <th className='border px-4 py-3 text-left'>Course Name</th>
                <th className='border px-4 py-3 text-left'>Teacher</th>
                <th className='border px-4 py-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.course_id} className='hover:bg-gray-100'>
                  <td className='border px-4 py-3'>{course.course_id}</td>
                  <td className='border px-4 py-3'>{course.course_name}</td>
                  <td className='border px-4 py-3'>{course.teacher ? `${course.teacher.first_name} ${course.teacher.last_name}` : 'N/A'}</td>
                  <td className='border px-4 py-3'>
                    <div className='flex gap-2 justify-center'>
                      <button onClick={() => handleDetails(course)} className='bg-purple-500 text-white px-3 py-2 rounded'>Details</button>
                      <button onClick={() => handleEdit(course)} className='bg-blue-500 text-white px-3 py-2 rounded'>Edit</button>
                      <button onClick={() => handleDelete(course.course_id)} className='bg-red-500 text-white px-3 py-2 rounded'>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedCourse && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-xl w-full p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Course Details</h2>
              <button onClick={closeDetails} className='text-2xl'>✕</button>
            </div>
            <div>
              <p><strong>ID:</strong> {selectedCourse.course_id}</p>
              <p><strong>Name:</strong> {selectedCourse.course_name}</p>
              <p><strong>Teacher:</strong> {selectedCourse.teacher ? `${selectedCourse.teacher.first_name} ${selectedCourse.teacher.last_name}` : 'N/A'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCourse && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-xl w-full p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Edit Course</h2>
              <button onClick={closeEdit} className='text-2xl'>✕</button>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <label className='block text-gray-700'>Course Name</label>
                <input name='course_name' value={editFormData.course_name || ''} onChange={handleInputChange} className='w-full border px-3 py-2 rounded' />
              </div>
              <div>
                <label className='block text-gray-700'>Teacher</label>
                <select name='teacher_id' value={editFormData.teacher_id || ''} onChange={handleInputChange} className='w-full border px-3 py-2 rounded'>
                  <option value=''>None</option>
                  {teachers.map(t=> <option key={t.teacher_id} value={t.teacher_id}>{t.first_name} {t.last_name}</option>)}
                </select>
              </div>
              <div className='flex justify-end gap-3'>
                <button onClick={closeEdit} className='px-4 py-2 bg-gray-500 text-white rounded'>Cancel</button>
                <button onClick={handleSaveEdit} disabled={isSaving} className='px-4 py-2 bg-blue-600 text-white rounded'>{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAdding && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-xl w-full p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Add Course</h2>
              <button onClick={closeAdd} className='text-2xl'>✕</button>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <label className='block text-gray-700'>Course Name *</label>
                <input name='course_name' value={addFormData.course_name || ''} onChange={handleAddChange} className='w-full border px-3 py-2 rounded' />
              </div>
              <div>
                <label className='block text-gray-700'>Teacher</label>
                <select name='teacher_id' value={addFormData.teacher_id || ''} onChange={handleAddChange} className='w-full border px-3 py-2 rounded'>
                  <option value=''>None</option>
                  {teachers.map(t=> <option key={t.teacher_id} value={t.teacher_id}>{t.first_name} {t.last_name}</option>)}
                </select>
              </div>
              <div className='flex justify-end gap-3'>
                <button onClick={closeAdd} className='px-4 py-2 bg-gray-500 text-white rounded'>Cancel</button>
                <button onClick={handleSaveAdd} disabled={isSaving} className='px-4 py-2 bg-green-600 text-white rounded'>{isSaving ? 'Adding...' : 'Add'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Course