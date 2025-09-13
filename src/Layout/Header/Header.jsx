import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    'Fashion', 'Jewellery', 'Watches', 'OutWear', 'Cosmetics', 'Accessories',
    'Electronic', 'Furniture', 'Sunglasses', 'Rolling Diamond', 'Xbox Controller',
    'Leather Watch', 'Smart Tablet', 'Purse',
  ];

  return (
    <header className=" container mx-auto bg-gradient-to-r from-white to-blue-50 shadow-md top-0 z-50">
      <hr />

     <div className='flex justify-between items-center py-3 px-2 gap-4'>

  {/* Left: Category Button */}
  <div>
    <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-1 py-2 text-blue-600 font-medium hover:bg-blue-100 transition-all 
                 border-none sm:border sm:border-blue-500 sm:rounded-md"
    >
      <HiOutlineMenuAlt1 className="text-lg" />
      {/* Text only on small+ devices */}
      <span className="hidden sm:inline">Category</span>
      <FaAngleDown className="hidden sm:inline text-sm" />
    </button>
  </div>

  {/* Middle: Nav Items */}
<div className='flex items-center gap-6 text-gray-700 font-medium flex-1 justify-center'>
  <p className="cursor-pointer hover:text-blue-600 transition text-xs sm:text-sm md:text-base lg:text-lg">
    New
  </p>
  <p className="cursor-pointer hover:text-blue-600 transition text-xs sm:text-sm md:text-base lg:text-lg">
    Blog
  </p>
  <NavLink 
    to={'/categoryProducts'} 
    className="cursor-pointer hover:text-blue-600 transition text-xs sm:text-sm md:text-base lg:text-lg"
  >
    More
  </NavLink>
</div>


  {/* Right Text */}
  <div className=' text-sm text-gray-600'>Free Delivery</div>
</div>



      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer (mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">Shop by Category</h2>
        <nav className="flex flex-col space-y-3 text-gray-700">
          {navItems.map((item, index) => (
            <NavLink
              to={`/products/category/${item}`}
              key={index}
              className="hover:text-blue-500 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
