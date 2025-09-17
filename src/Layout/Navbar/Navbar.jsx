import React, { useState, useEffect } from 'react';
import logo from './../../assets/logo1.png';
import { LuMessageSquareMore } from 'react-icons/lu';
import { FaRegUser, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Tooltip } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Bell, CreditCard, HelpCircle, LogOut } from "lucide-react";
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();
  const { user,handleLogout } = useAuth()
 const handleUserLogOut=()=>{
    handleLogout()
  }
  // console.log(user)
  // ✅ Fetch cart items only once when component mounts
  useEffect(() => {
    const fetchCarts = async () => {
      try {
       if(user?.email){
         const res = await axios.get(`${import.meta.env.VITE_API_URL}/carts/${user.email}`);
        setCarts(res.data);
       }
      } catch (err) {
        console.error("Error fetching carts:", err);
      }
    };
    fetchCarts();
  }, []);
  // ✅ Drawer handlers
  const toggleProfileDrawer = (state) => () => setProfileOpen(state);
  const toggleCartDrawer = (state) => () => setCartOpen(state);

  // ==============================
  // Optimized Cart Handlers
  // ==============================

  // Increment quantity (optimistic update)
  const incrementQty = async (id) => {
    setCarts(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/carts/${id}`, { quantity: carts.find(i => i._id === id)?.quantity + 1 || 1 });
    } catch (err) {
      console.error(err);
      // revert if error
      setCarts(prev =>
        prev.map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // Decrement quantity (optimistic update)
  const decrementQty = async (id) => {
    const item = carts.find(i => i._id === id);
    if (!item || item.quantity <= 1) return;
    setCarts(prev =>
      prev.map(i =>
        i._id === id ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/carts/${id}`, { quantity: item.quantity - 1 });
    } catch (err) {
      console.error(err);
      // revert if error
      setCarts(prev =>
        prev.map(i =>
          i._id === id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    }
  };

  // Remove item (optimistic)
  const removeItem = async (id) => {
    const originalCarts = [...carts];
    setCarts(prev => prev.filter(item => item._id !== id));
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/carts/${id}`);
    } catch (err) {
      console.error(err);
      setCarts(originalCarts); // revert if error
    }
  };

  const total = carts.reduce(
    (acc, item) => acc + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="container mx-auto px-2 mt-6 pt-2 bg-blue-50 shadow-md top-0 z-50">
      {/* Top Section */}
      <div className='flex justify-between items-center'>
        <div>
          <img src={logo} alt="Logo" className="w-10 sm:w-16 lg:w-20" />
        </div>
        <div className='flex gap-5 items-center'>
          <Link to={'/message'}>
            <Tooltip title="Messages" placement="top">
              <LuMessageSquareMore className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer" />
            </Tooltip>
          </Link>

          <Tooltip title="Cart" placement="top">
            <MdOutlineShoppingCart
              className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer"
              onClick={toggleCartDrawer(true)}
            />
          </Tooltip>

          <Tooltip title="Profile" placement="top">
            <FaRegUser
              className="text-2xl text-gray-600 hover:text-blue-900 cursor-pointer"
              onClick={toggleProfileDrawer(true)}
            />
          </Tooltip>
        </div>
      </div>

      {/* Search Bar */}
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
      <Drawer anchor="right" open={profileOpen} onClose={toggleProfileDrawer(false)}> <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-full flex flex-col bg-white/90 backdrop-blur-lg shadow-xl"> {/* Header */} <div className="flex items-center justify-between p-4 sm:p-5 border-b bg-blue-900 text-white"> <h2 className="text-base sm:text-lg md:text-xl font-semibold">My Account</h2> <button onClick={toggleProfileDrawer(false)} className="hover:scale-110 transition-transform" > ✕ </button> </div> {/* User Info */} <div className="flex items-center gap-3 sm:gap-4 p-4 border-b bg-white"> <img src="https://i.pravatar.cc/100" alt="User Avatar" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-blue-500 shadow-md" /> <div> <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">John Doe</h3> <p className="text-xs sm:text-sm text-gray-500">johndoe@email.com</p> </div> </div> {/* Menu Items */} <nav className="flex-1 flex flex-col p-3 sm:p-4 gap-1 sm:gap-2 overflow-y-auto"> {[{ icon: <User size={18} />, label: "My Profile", route: "/profile" }, { icon: <Bell size={18} />, label: "Dashboard", route: "/dashboard" }, { icon: <ShoppingBag size={18} />, label: "My Orders", route: "/myOrder" }, { icon: <Bell size={18} />, label: "Notifications", route: "/notifications" }, { icon: <Bell size={18} />, label: "Products", route: "/products" }, { icon: <CreditCard size={18} />, label: "Payment Methods", route: "/payments" }, { icon: <HelpCircle size={18} />, label: "Analytics", route: "/analytics" }, { icon: <HelpCircle size={18} />, label: "Offers", route: "/offers" }, { icon: <HelpCircle size={18} />, label: "Users", route: "/users" }, { icon: <HelpCircle size={18} />, label: "Orders", route: "/orders" }, { icon: <HelpCircle size={18} />, label: "Sales", route: "/sales" }, { icon: <HelpCircle size={18} />, label: "My Review", route: "/reviews" }, { icon: <HelpCircle size={18} />, label: "Reports", route: "/reports" }, { icon: <HelpCircle size={18} />, label: "Support", route: "/support" }, { icon: <HelpCircle size={18} />, label: "System Settings", route: "/settings" },].map((item, i) => (<button key={i} onClick={() => item.route && navigate(item.route)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all group" > <span className="text-gray-500 group-hover:text-blue-600">{item.icon}</span> {item.label} </button>))} </nav> {/* Divider */} <div className="border-t mx-3"></div> {/* Auth Buttons */} <div className="p-3 flex flex-col gap-2">   {user?.email ? (
  <button
    onClick={handleUserLogOut} // ekhane logout function add korte hobe
    className="w-full flex items-center justify-center gap-2 rounded-full py-2 text-red-600 hover:bg-red-50 transition"
  >
  Logout
  </button>
) : (
  <>
    <Link
      to="/login"
      className="w-full text-center rounded-full py-2 bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700 transition"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="w-full text-center rounded-full py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
    >
      Register
    </Link>
  </>
)}
 </div> </div> </Drawer>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCartDrawer(false)}>
        <motion.div className="w-80 sm:w-96 h-full bg-white flex flex-col"
          initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={toggleCartDrawer(false)} className="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {carts.length === 0 && <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>}

            {carts.map((item) => {
              const price = Number(item.price) || 0;
              const qty = item.quantity || 1;
              const subtotal = price * qty;

              return (
                <div key={item._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl shadow-sm">
                  <img src={item.photo || "https://via.placeholder.com/80"} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 ml-3">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <p className="text-green-600 font-bold">${price}</p>
                    <p className="text-gray-700 text-sm mt-1">Subtotal: ${subtotal}</p>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                      <button onClick={() => decrementQty(item._id)} className="hover:bg-gray-200 p-1 rounded-full"><FaMinus size={10} /></button>
                      <span>{qty}</span>
                      <button onClick={() => incrementQty(item._id)} className="hover:bg-gray-200 p-1 rounded-full"><FaPlus size={10} /></button>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700 mt-1"><FaTrashAlt /></button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-lg text-green-600">${total}</span>
            </div>
           {user && carts.length>0 && (
  <Link
    to="/checkout"
    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-all"
  >
    Checkout
  </Link>
)}

          </div>
        </motion.div>
      </Drawer>
    </div>
  );
}
