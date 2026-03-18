import React, { useState } from 'react'
import { CircleUserRound, BellPlus, Search } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='bg-purple-400 flex items-center justify-between p-7 text-white gap-4'>
      <div className='flex items-center gap-20'>
        <h1 className='text-3xl font-extrabold'>DashBoard</h1>
        <h2 className='text-2xl font-medium'>Hello, Welcome!</h2>
      </div>

      <div className='flex items-center bg-purple-300 rounded-lg px-4 py-2 flex-1 max-w-xs'>
        <Search size={20} className='mr-2'/>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='bg-transparent outline-none w-full text-white placeholder-purple-100'
        />
      </div>

      <div className='flex items-center gap-5'>
        <div className='relative'>
          <BellPlus size={25} />
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</span>
        </div>
        <CircleUserRound size={25} className='cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar
