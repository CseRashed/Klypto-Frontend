import React, { useState } from 'react';
import logo from './../../assets/logo1.png';
import { LuMessageSquareMore } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Tooltip, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Heart, ShoppingCart, Home, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
   const navigate = useNavigate();

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
            <Tooltip title="Messages" placement="top">
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
  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-full flex flex-col bg-white/90 backdrop-blur-lg shadow-xl">

    {/* Header */}
    <div className="flex items-center justify-between p-4 sm:p-5 border-b bg-blue-900 text-white">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold">My Account</h2>
      <button
        onClick={toggleProfileDrawer(false)}
        className="hover:scale-110 transition-transform"
      >
        ✕
      </button>
    </div>

    {/* User Info */}
    <div className="flex items-center gap-3 sm:gap-4 p-4 border-b bg-white">
      <img
        src="https://i.pravatar.cc/100"
        alt="User Avatar"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-blue-500 shadow-md"
      />
      <div>
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">John Doe</h3>
        <p className="text-xs sm:text-sm text-gray-500">johndoe@email.com</p>
      </div>
    </div>

    {/* Menu Items */}
    <nav className="flex-1 flex flex-col p-3 sm:p-4 gap-1 sm:gap-2 overflow-y-auto">
      {[
        { icon: <User size={18} />, label: "My Profile", route: "/profile" },
    { icon: <ShoppingBag size={18} />, label: "My Orders", route: "/myOrder" },
    { icon: <Bell size={18} />, label: "Notifications", route: "/notifications" },
    { icon: <HelpCircle size={18} />, label: "Support", route: "/support" },
      ].map((item, i) => (
        <button
          key={i}
           onClick={() => item.route && navigate(item.route)}
          className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl 
                     text-gray-700 text-sm sm:text-base font-medium 
                     hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 
                     transition-all group"
        >
          <span className="text-gray-500 group-hover:text-blue-600">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>

    {/* Divider */}
    <div className="border-t mx-3 sm:mx-4"></div>

    {/* Auth Buttons */}
    <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="!rounded-full !py-2 sm:!py-3 !text-xs sm:!text-sm md:!text-base shadow-md hover:shadow-lg"
      >
        Login
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        className="!rounded-full !py-2 sm:!py-3 !text-xs sm:!text-sm md:!text-base"
      >
        Register
      </Button>
      <Button
        variant="text"
        color="error"
        startIcon={<LogOut size={18} />}
        fullWidth
        className="!rounded-full !py-2 sm:!py-3 !text-xs sm:!text-sm md:!text-base hover:bg-red-50"
      >
        Logout
      </Button>
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
