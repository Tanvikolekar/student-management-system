import React, { useState, useEffect } from 'react'
import { getAllClassrooms, addClassroom, updateClassroom, deleteClassroom, getAllCourses } from '../services/api'

const Class = () => {
  const [classes, setClasses] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [editingClass, setEditingClass] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [isAdding, setIsAdding] = useState(false)
  const [addFormData, setAddFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [classData, courseData] = await Promise.all([getAllClassrooms(), getAllCourses()])
      setClasses(classData)
      setCourses(courseData)
      setError(null)
    } catch (err) {
      setError('Failed to load classes or courses')
      console.error(err)
    } finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this class?')) return
    try { await deleteClassroom(id); setClasses(classes.filter(c=>c.class_id!==id)) } catch (err) { setError('Failed to delete class') }
  }

  const handleEdit = (cls) => { setEditingClass(cls); setEditFormData({ class_name: cls.class_name, course_id: cls.course ? cls.course.course_id : '' }) }
  const handleDetails = (cls) => setSelectedClass(cls)
  const closeDetails = () => setSelectedClass(null)
  const closeEdit = () => { setEditingClass(null); setEditFormData({}) }

  const handleInputChange = (e) => { const { name, value } = e.target; setEditFormData(prev=>({ ...prev, [name]: value })) }

  const handleSaveEdit = async () => {
    try { setIsSaving(true); await updateClassroom(editingClass.class_id, editFormData); setClasses(classes.map(c => c.class_id===editingClass.class_id ? { ...c, class_name: editFormData.class_name, course: courses.find(co=>co.course_id==editFormData.course_id)||null } : c)); closeEdit() } catch (err) { setError('Failed to update class') } finally { setIsSaving(false) }
  }

  const openAdd = () => { setIsAdding(true); setAddFormData({}) }
  const closeAdd = () => { setIsAdding(false); setAddFormData({}) }
  const handleAddChange = (e) => { const { name, value } = e.target; setAddFormData(prev=>({ ...prev, [name]: value })) }

  const handleSaveAdd = async () => {
    if (!addFormData.class_name) { setError('Class name required'); return }
    try { setIsSaving(true); const newCls = await addClassroom(addFormData); setClasses([...classes, newCls]); closeAdd() } catch (err) { setError('Failed to add class') } finally { setIsSaving(false) }
  }

  return (
    <div className='px-20 py-10'>
      <button onClick={openAdd} className='bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold mb-6'>Add New Class</button>
      {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{error}</div>}

      {loading ? (
        <div className='flex justify-center items-center h-64'><div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div></div>
      ) : classes.length === 0 ? (
        <div className='text-center py-10'>No classes found.</div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-800 text-white'>
                <th className='border px-4 py-3 text-left'>ID</th>
                <th className='border px-4 py-3 text-left'>Class Name</th>
                <th className='border px-4 py-3 text-left'>Course</th>
                <th className='border px-4 py-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(cls => (
                <tr key={cls.class_id} className='hover:bg-gray-100'>
                  <td className='border px-4 py-3'>{cls.class_id}</td>
                  <td className='border px-4 py-3'>{cls.class_name}</td>
                  <td className='border px-4 py-3'>{cls.course ? cls.course.course_name : 'N/A'}</td>
                  <td className='border px-4 py-3'>
                    <div className='flex gap-2 justify-center'>
                      <button onClick={() => handleDetails(cls)} className='bg-purple-500 text-white px-3 py-2 rounded'>Details</button>
                      <button onClick={() => handleEdit(cls)} className='bg-blue-500 text-white px-3 py-2 rounded'>Edit</button>
                      <button onClick={() => handleDelete(cls.class_id)} className='bg-red-500 text-white px-3 py-2 rounded'>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details */}
      {selectedClass && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-xl w-full p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Class Details</h2>
              <button onClick={closeDetails} className='text-2xl'>✕</button>
            </div>
            <div>
              <p><strong>ID:</strong> {selectedClass.class_id}</p>
              <p><strong>Name:</strong> {selectedClass.class_name}</p>
              <p><strong>Course:</strong> {selectedClass.course ? selectedClass.course.course_name : 'N/A'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingClass && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-2xl max-w-xl w-full p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Edit Class</h2>
              <button onClick={closeEdit} className='text-2xl'>✕</button>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <label className='block text-gray-700'>Class Name</label>
                <input name='class_name' value={editFormData.class_name || ''} onChange={handleInputChange} className='w-full border px-3 py-2 rounded' />
              </div>
              <div>
                <label className='block text-gray-700'>Course</label>
                <select name='course_id' value={editFormData.course_id || ''} onChange={handleInputChange} className='w-full border px-3 py-2 rounded'>
                  <option value=''>None</option>
                  {courses.map(co => <option key={co.course_id} value={co.course_id}>{co.course_name}</option>)}
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
              <h2 className='text-xl font-bold'>Add Class</h2>
              <button onClick={closeAdd} className='text-2xl'>✕</button>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <label className='block text-gray-700'>Class Name *</label>
                <input name='class_name' value={addFormData.class_name || ''} onChange={handleAddChange} className='w-full border px-3 py-2 rounded' />
              </div>
              <div>
                <label className='block text-gray-700'>Course</label>
                <select name='course_id' value={addFormData.course_id || ''} onChange={handleAddChange} className='w-full border px-3 py-2 rounded'>
                  <option value=''>None</option>
                  {courses.map(co => <option key={co.course_id} value={co.course_id}>{co.course_name}</option>)}
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

export default Class