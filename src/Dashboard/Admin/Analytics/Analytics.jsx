import React from 'react';
import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

export default function Analytics() {
  const metrics = [
    { icon: <FaDollarSign />, label: 'Revenue', value: '$120,300', color: 'green' },
    { icon: <FaUsers />, label: 'New Users', value: '1,540', color: 'blue' },
    { icon: <FaShoppingCart />, label: 'Orders', value: '3,240', color: 'purple' },
    { icon: <FaChartLine />, label: 'Conversion Rate', value: '8.2%', color: 'orange' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-500">Track key performance metrics and growth trends.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-4 sm:p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl transition-shadow duration-200`}
          >
            <div className={`text-3xl sm:text-4xl text-${m.color}-500`}>
              {m.icon}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm text-gray-500">{m.label}</h3>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Line Chart Placeholder */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Sales Over Time</h2>
          <div className="h-48 sm:h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
            [Line Chart Placeholder]
          </div>
        </div>

        {/* Bar Chart Placeholder */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Top Products</h2>
          <div className="h-48 sm:h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
            [Bar Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
