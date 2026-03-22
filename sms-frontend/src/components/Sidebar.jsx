import { Link } from 'react-router-dom'
import { House, Users, GraduationCap, BookOpen } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='bg-purple-400 w-1/6 py-8 px-8 h-screen text-white text-xl flex flex-col gap-5'>
      <Link to="/" className='flex gap-3 hover:bg-purple-700 rounded py-2 px-3 cursor-pointer transition'>
        <House />
        <h1>Home</h1>
      </Link>
      <Link to="/app/student" className='flex gap-3 hover:bg-purple-700 rounded py-2 px-3 cursor-pointer transition'>
        <Users />
        <h1>Students</h1>
      </Link>
      <Link to="/app/teacher" className='flex gap-3 hover:bg-purple-700 rounded py-2 px-3 cursor-pointer transition'>
        <Users />
        <h1>Teachers</h1>
      </Link>
      <Link to="/app/course" className='flex gap-3 hover:bg-purple-700 rounded py-2 px-3 cursor-pointer transition'>
        <GraduationCap />
        <h1>Courses</h1>
      </Link>
      <Link to="/app/class" className='flex gap-3 hover:bg-purple-700 rounded py-2 px-3 cursor-pointer transition'>
        <BookOpen />
        <h1>Classes</h1>
      </Link>
    </div>
  )
}

export default Sidebar
