import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
export default function Shipping() {
  return (
    <div className='mt-6 px-2  lg:mt-16 md:mt-12 container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-7  border-red-700 rounded-xl border-2'>
  {/* Left Side */}
  <div className='flex items-center gap-3'>
    <TbTruckDelivery className='text-3xl text-red-600' />
    <h1 className='text-xl md:text-2xl font-medium'>FREE SHIPPING</h1>
  </div>

  {/* Center Text */}
  <div className='text-center text-sm md:text-base text-gray-700'>
    Free Delivery Now On Your First Order and over <span className="font-semibold">$200</span>
  </div>

  {/* Right Price Tag */}
  <div className='text-lg md:text-xl font-bold text-red-600'>— ONLY $200</div>
</div>

  )
}