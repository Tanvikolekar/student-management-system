import axios from 'axios'

const STUDENT_API_BASE_URL = 'http://localhost:8080/api/student'
const TEACHER_API_BASE_URL = 'http://localhost:8080/api/teacher'
const COURSE_API_BASE_URL = 'http://localhost:8080/api/course'
const CLASSROOM_API_BASE_URL = 'http://localhost:8080/api/classroom'

const studentApi = axios.create({
  baseURL: STUDENT_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const teacherApi = axios.create({
  baseURL: TEACHER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const courseApi = axios.create({
  baseURL: COURSE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

const classApi = axios.create({
  baseURL: CLASSROOM_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ============= STUDENT API CALLS =============

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await studentApi.get('/getall')
    return response.data
  } catch (error) {
    console.error('Error fetching students:', error)
    throw error
  }
}

// Add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await studentApi.post('/add', studentData)
    return response.data
  } catch (error) {
    console.error('Error adding student:', error)
    throw error
  }
}

// Update student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await studentApi.put(`/update/${id}`, studentData)
    return response.data
  } catch (error) {
    console.error('Error updating student:', error)
    throw error
  }
}

// Delete student
export const deleteStudent = async (id) => {
  try {
    const response = await studentApi.post(`/delete/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting student:', error)
    throw error
  }
}

// ============= TEACHER API CALLS =============

// Get all teachers
export const getAllTeachers = async () => {
  try {
    const response = await teacherApi.get('/getall')
    return response.data
  } catch (error) {
    console.error('Error fetching teachers:', error)
    throw error
  }
}

// Add a new teacher
export const addTeacher = async (teacherData) => {
  try {
    const response = await teacherApi.post('/add', teacherData)
    return response.data
  } catch (error) {
    console.error('Error adding teacher:', error)
    throw error
  }
}

// Update teacher
export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await teacherApi.put(`/update/${id}`, teacherData)
    return response.data
  } catch (error) {
    console.error('Error updating teacher:', error)
    throw error
  }
}

// Delete teacher
export const deleteTeacher = async (id) => {
  try {
    const response = await teacherApi.delete(`/delete/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting teacher:', error)
    throw error
  }
}

// ============= COURSE API CALLS =============

export const getAllCourses = async () => {
  try {
    const response = await courseApi.get('/getall')
    return response.data
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

export const addCourse = async (courseData) => {
  try {
    const response = await courseApi.post('/add', courseData)
    return response.data
  } catch (error) {
    console.error('Error adding course:', error)
    throw error
  }
}

export const updateCourse = async (id, courseData) => {
  try {
    const response = await courseApi.put(`/update/${id}`, courseData)
    return response.data
  } catch (error) {
    console.error('Error updating course:', error)
    throw error
  }
}

export const deleteCourse = async (id) => {
  try {
    const response = await courseApi.delete(`/delete/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting course:', error)
    throw error
  }
}

// ============= CLASSROOM API CALLS =============

export const getAllClassrooms = async () => {
  try {
    const response = await classApi.get('/getall')
    return response.data
  } catch (error) {
    console.error('Error fetching classrooms:', error)
    throw error
  }
}

export const addClassroom = async (classData) => {
  try {
    const response = await classApi.post('/add', classData)
    return response.data
  } catch (error) {
    console.error('Error adding classroom:', error)
    throw error
  }
}

// ============= AUTHENTICATION API CALLS =============

const AUTH_API_BASE_URL = 'http://localhost:8080/api/auth'

const authApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const loginRequest = async (credentials) => {
  try {
    const response = await authApi.post('/login', credentials)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const registerRequest = async (userData) => {
  try {
    const response = await authApi.post('/register', userData)
    return response.data
  } catch (error) {
    console.error('Error registering:', error)
    throw error
  }
}

export const updateClassroom = async (id, classData) => {
  try {
    const response = await classApi.put(`/update/${id}`, classData)
    return response.data
  } catch (error) {
    console.error('Error updating classroom:', error)
    throw error
  }
}

export const deleteClassroom = async (id) => {
  try {
    const response = await classApi.delete(`/delete/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting classroom:', error)
    throw error
  }
}

// ============= COUNT API CALLS (for Dashboard) =============

export const getStudentCount = async () => {
  try {
    const response = await studentApi.get('/getall')
    return response.data.length
  } catch (error) {
    console.error('Error fetching student count:', error)
    return 0
  }
}

export const getTeacherCount = async () => {
  try {
    const response = await teacherApi.get('/getall')
    return response.data.length
  } catch (error) {
    console.error('Error fetching teacher count:', error)
    return 0
  }
}

export const getCourseCount = async () => {
  try {
    const response = await courseApi.get('/getall')
    return response.data.length
  } catch (error) {
    console.error('Error fetching course count:', error)
    return 0
  }
}

export const getClassroomCount = async () => {
  try {
    const response = await classApi.get('/getall')
    return response.data.length
  } catch (error) {
    console.error('Error fetching classroom count:', error)
    return 0
  }
}

export default studentApi
