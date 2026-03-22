import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { getStudentCount, getTeacherCount, getCourseCount, getClassroomCount } from '../services/api'

const Dashboard = () => {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    classrooms: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCounts()
  }, [])

  const fetchCounts = async () => {
    try {
      setLoading(true)
      const [studentCount, teacherCount, courseCount, classroomCount] = await Promise.all([
        getStudentCount(),
        getTeacherCount(),
        getCourseCount(),
        getClassroomCount()
      ])
      
      setCounts({
        students: studentCount,
        teachers: teacherCount,
        courses: courseCount,
        classrooms: classroomCount
      })
    } catch (error) {
      console.error('Error fetching counts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex'>
        <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
          {!loading ? (
            <>
              <Card icon="👨‍🎓" title="Student" count={counts.students} path="/app/student"/>
              <Card icon="👨‍🏫" title="Teacher" count={counts.teachers} path="/app/teacher"/>
              <Card icon="📚" title="Course" count={counts.courses} path="/app/course"/>
              <Card icon="🏫" title="Class" count={counts.classrooms} path="/app/class"/>
            </>
          ) : (
            <div className='col-span-4 flex justify-center items-center h-40'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
            </div>
          )}
        </div>
    </div>
  )
}

export default Dashboard