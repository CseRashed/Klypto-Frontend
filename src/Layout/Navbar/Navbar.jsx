import React from 'react'
import logo from './../../assets/logo1.png'
import { LuMessageCircleMore, LuMessageSquareMore } from 'react-icons/lu'
import { BsCart4 } from 'react-icons/bs'
import { HiMiniUserPlus } from 'react-icons/hi2'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
   <>
   <div className="w-full px-2 mt-6 pt-2 bg-blue-50 shadow-md top-0 z-50">
    <div className='flex justify-between'>
   <div>
  <img
    src={logo}
    alt="Logo"
    className="w-10 sm:w-16 lg:w-20"
  />
</div>
    <div className='flex gap-5'>
<h1 className='sm:text-xl md:text-2xl'>
   <Tooltip title="Messages" placement="bottom">

    <LuMessageSquareMore className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer" />
   </Tooltip>
</h1>
<h1 className='sm:text-xl md:text-2xl'>
 <Tooltip title="Cart" placement="top">
 <MdOutlineShoppingCart className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer" />
 </Tooltip>

</h1>
<h1 className='sm:text-xl md:text-2xl'>
   <Tooltip title="Profile" placement="top">
  <FaRegUser className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer" />
   </Tooltip>
</h1>
    </div>
   </div>
      <div className="mt-3 pb-2 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex w-full  gap-2">
          <input
            type="text"
            placeholder="Search products here..."
            className="w-full sm:w-72 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
            Search
          </button>
        </div>
      </div>
   </div>
   </>
  )
}
