import React, { useState } from "react";
import { FaShoppingCart, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", brand: "Sony", price: 120, qty: 1, photo: "https://via.placeholder.com/80" },
    { id: 2, name: "Smartphone", brand: "Samsung", price: 550, qty: 2, photo: "https://via.placeholder.com/80" },
    { id: 3, name: "Gaming Chair", brand: "DXRacer", price: 300, qty: 1, photo: "https://via.placeholder.com/80" },
  ]);

  const incrementQty = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decrementQty = (id) => {
    setCartItems(prev => prev.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FaShoppingCart size={24} />
      </button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-40 flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 && <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>}
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl shadow-sm">
                  <img src={item.photo} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 ml-3">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.brand}</p>
                    <p className="text-green-600 font-bold">${item.price}</p>
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
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-green-600">${total}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition">
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
