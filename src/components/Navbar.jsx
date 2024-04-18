import React from 'react'

function Navbar() {
  return (
    <nav className='bg-purple-950 flex justify-between px-10 py-5  '>
        <div className="logo font-bold ">LockBOX</div>
        <ul className='flex gap-5 '>
            <li><a href="">HOME</a></li>
            <li><a href="">ABOUT</a></li>
            <li><a href="">CONTACT</a></li>
        </ul>
    </nav>
  )
}

export default Navbar