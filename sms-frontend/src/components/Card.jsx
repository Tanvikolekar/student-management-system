import { useNavigate } from 'react-router-dom'

const Card = ({title, count, icon, path}) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (path) {
      navigate(path)
    }
  }

  return (
    <div 
      onClick={handleCardClick}
      className='m-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-purple-500 to-purple-700 text-white overflow-hidden w-50 h-40 cursor-pointer'
    >
      
      <div className='p-6 relative z-10'>
        {/* Title with icon */}
        <div className='flex items-center gap-3 mb-4'>
          <span className='text-4xl'>{icon}</span>
          <h1 className='font-bold text-2xl'>{title}</h1>
        </div>
        
        {/* Stats section */}
        <div className='flex justify-between items-end'>
          <div>
            <p className='text-purple-200 text-sm font-medium uppercase tracking-wide'>Total</p>
            <p className='text-4xl font-bold mt-1'>{count}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
