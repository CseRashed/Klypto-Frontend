import React, { useState } from 'react';
import { LiaJediOrder } from 'react-icons/lia';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

export default function Orders() {
  const [filterStatus, setFilterStatus] = useState('All');

  const orders = [...Array(10)].map((_, idx) => ({
    id: idx + 101,
    customer: `Customer #${idx + 1}`,
    date: 'Sep 11, 2025',
    total: (Math.random() * 200 + 50).toFixed(2),
    status: idx % 4 === 0 ? 'Delivered' : idx % 4 === 1 ? 'Pending' : idx % 4 === 2 ? 'Cancelled' : 'Returned',
  }));

  const filteredOrders = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-red-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <LiaJediOrder className="text-5xl text-orange-600" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all your orders efficiently.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-md">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="All">All</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Returned">Returned</option>
        </select>
        <button className="w-full sm:w-auto px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md shadow-md transition-all duration-200">
          Export Orders
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base text-left bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
          <thead className="bg-gradient-to-r from-orange-100 to-red-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:scale-[1.01] transition-transform duration-200 bg-white rounded-xl shadow-sm mb-2">
                <td className="py-3 px-4 font-medium text-gray-800">#{order.id}</td>
                <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                <td className="py-3 px-4 text-gray-600">{order.date}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">${order.total}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'}`}
                  >
                    {order.status === 'Delivered' && <FaCheckCircle />}
                    {order.status === 'Pending' && <FaHourglassHalf />}
                    {order.status === 'Cancelled' && <FaTimesCircle />}
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
