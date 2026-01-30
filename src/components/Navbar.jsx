import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='flex justify-between bg-purple-400  py-3'>
            <div className="logo">
                <span className='font-bold text-xl mx-8 text-purpule '>iTask</span>
            </div>
            <ul className='flex gap-8 mx-9 font-semibold text-white'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>Your Task</li>
            </ul>
        </nav>

    </div>
  )
}

export default Navbar