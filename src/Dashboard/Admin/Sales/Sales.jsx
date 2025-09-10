import React from 'react';
import { SiSimpleanalytics } from 'react-icons/si';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { MdBarChart } from 'react-icons/md';

export default function Sales() {
  const salesData = [
    { title: 'Total Sales', value: '$125,000', change: '+15%', icon: <FaArrowUp className="text-green-600" />, bg: 'from-green-100 to-green-50' },
    { title: 'Monthly Sales', value: '$10,200', change: '-5%', icon: <FaArrowDown className="text-red-600" />, bg: 'from-red-100 to-red-50' },
    { title: 'Weekly Sales', value: '$2,300', change: '+2%', icon: <FaArrowUp className="text-blue-600" />, bg: 'from-blue-100 to-blue-50' },
    { title: 'Daily Sales', value: '$325', change: '+0.5%', icon: <FaArrowUp className="text-purple-600" />, bg: 'from-purple-100 to-purple-50' },
  ];

  const recentSales = [
    { id: 'ORD1234', customer: 'John Doe', amount: '$120.00', date: 'Apr 22, 2025', status: 'Completed' },
    { id: 'ORD1235', customer: 'Jane Smith', amount: '$250.00', date: 'Apr 21, 2025', status: 'Pending' },
    { id: 'ORD1236', customer: 'Tom Hanks', amount: '$90.00', date: 'Apr 20, 2025', status: 'Cancelled' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SiSimpleanalytics className="text-4xl text-pink-600" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Sales Overview</h1>
            <p className="text-base text-gray-600">Track and analyze all sales data effectively.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md shadow-md">
          <FiDownload className="text-lg" /> Export Report
        </button>
      </div>

      {/* Sales Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesData.map((item, index) => (
          <div key={index} className={`bg-gradient-to-br ${item.bg} p-5 rounded-xl shadow-md space-y-2`}>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">{item.title}</p>
              {item.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{item.value}</h2>
            <span className="text-sm text-gray-600">Change: {item.change}</span>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex items-center gap-2">
          <MdBarChart className="text-2xl text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-700">Sales Performance Graph</h2>
        </div>
        <div className="w-full h-60 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-md flex items-center justify-center text-gray-500">
          Chart Placeholder (Integrate with Chart.js or Recharts)
        </div>
      </div>

    </div>
  );
}