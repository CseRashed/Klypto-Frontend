import React, { useState } from 'react';
import logo from './../../assets/logo1.png';
import { LuMessageSquareMore } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Tooltip, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", brand: "Sony", price: 120, qty: 1, photo: "https://via.placeholder.com/80" },
    { id: 2, name: "Smartphone", brand: "Samsung", price: 550, qty: 2, photo: "https://via.placeholder.com/80" },
  ]);

  const toggleProfileDrawer = (state) => () => setProfileOpen(state);
  const toggleCartDrawer = (state) => () => setCartOpen(state);

  const incrementQty = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decrementQty = (id) => {
    setCartItems(prev => prev.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="w-full px-2 mt-6 pt-2 bg-blue-50 shadow-md top-0 z-50">
      <div className='flex justify-between items-center'>
        <div>
          <img src={logo} alt="Logo" className="w-10 sm:w-16 lg:w-20" />
        </div>
        <div className='flex gap-5 items-center'>
          <Link to={'/message'} className='sm:text-xl md:text-2xl'>
            <Tooltip title="Messages" placement="bottom">
              <LuMessageSquareMore className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer" />
            </Tooltip>
          </Link>

          {/* Cart Icon */}
          <Tooltip title="Cart" placement="top">
            <MdOutlineShoppingCart
              className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer"
              onClick={toggleCartDrawer(true)}
            />
          </Tooltip>

          {/* Profile Icon */}
          <Tooltip title="Profile" placement="top">
            <FaRegUser
              className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer"
              onClick={toggleProfileDrawer(true)}
            />
          </Tooltip>
        </div>
      </div>

      {/* Search bar */}
      <div className="mt-3 pb-2 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex w-full gap-2">
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

      {/* Profile Drawer */}
      <Drawer anchor="right" open={profileOpen} onClose={toggleProfileDrawer(false)}>
        <div className="w-64 p-4">
          <h2 className="text-xl font-semibold mb-4">User Menu</h2>
          <div className="flex flex-col gap-3">
            <Button variant="contained" color="primary">Login</Button>
            <Button variant="outlined" color="secondary">Register</Button>
          </div>
        </div>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCartDrawer(false)}>
        <motion.div
          className="w-80 sm:w-96 h-full bg-white flex flex-col"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={toggleCartDrawer(false)} className="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
          </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {cartItems.length === 0 && <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>}
  {cartItems.map(item => {
    const subtotal = item.price * item.qty; // ✅ product subtotal
    return (
      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl shadow-sm">
        <img src={item.photo} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
        <div className="flex-1 ml-3">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-500 text-sm">{item.brand}</p>
          <p className="text-green-600 font-bold">${item.price}</p>
          {/* ✅ Subtotal per product */}
          <p className="text-gray-700 text-sm mt-1">Subtotal: ${subtotal}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
            <button onClick={() => decrementQty(item.id)} className="hover:bg-gray-200 p-1 rounded-full"><FaMinus size={10} /></button>
            <span>{item.qty}</span>
            <button onClick={() => incrementQty(item.id)} className="hover:bg-gray-200 p-1 rounded-full"><FaPlus size={10} /></button>
          </div>
          <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 mt-1"><FaTrashAlt /></button>
        </div>
      </div>
    );
  })}
</div>

{/* Total */}
<div className="p-4 border-t">
  <div className="flex justify-between items-center mb-4">
    <span className="font-bold text-lg">Total:</span>
    <span className="font-bold text-lg text-green-600">${total}</span>
  </div>
  <Link 
    to="/checkout" 
    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-all"
  >
    Checkout
  </Link>
</div>


        </motion.div>
      </Drawer>
    </div>
  );
}
