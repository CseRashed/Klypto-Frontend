import React, { useEffect, useState } from "react";
import {
  Bell,
  Users,
  Package,
  DollarSign,
  Headphones,
  Activity,
  Sun,
  Moon,
  PlusCircle,
  UserCog,
  FileWarning,
  ClipboardList,
  Trash2,
} from "lucide-react";
import useUsers from "../../../Hooks/useUsers";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { users } = useUsers();
  const [order, setOrder] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  // Fetch orders
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Add category
  const handleAddCategory = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories([...categories, data]);
        setNewCategory({ name: "", image: "" });
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  // Delete category
  const handleDeleteCategory = (id) => {
    console.log(id)
    fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCategories(categories.filter((cat) => cat._id !== id));
      })
      .catch((err) => console.error("Error deleting category:", err));
  };

  return (
    <div
      className={`min-h-screen container mx-auto p-6 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {/* Notifications */}
          <button className="relative p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              5
            </span>
          </button>
        </div>
      </div>

      {/* Announcement Banner */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
        🚀 New Feature Update: Sellers can now request payouts directly from
        their dashboard!
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            name: "Product Category",
            icon: <PlusCircle />,
            color: "bg-green-500",
            action: () => setShowCategoryModal(true),
          },
          { name: "Banner", icon: <UserCog />, color: "bg-blue-500" },
          { name: "Reports", icon: <FileWarning />, color: "bg-orange-500" },
          { name: "Tasks", icon: <ClipboardList />, color: "bg-purple-500" },
        ].map((action, i) => (
          <button
            key={i}
            onClick={action.action}
            className={`flex flex-col items-center gap-2 py-4 rounded-xl text-white shadow hover:opacity-90 transition ${action.color}`}
          >
            {action.icon}
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Users",
            value: `${users.length}`,
            icon: <Users size={26} />,
            color: "bg-blue-500",
          },
          {
            title: "Total Orders",
            value: `${order.length}`,
            icon: <Package size={26} />,
            color: "bg-green-500",
          },
          {
            title: "Revenue",
            value: "$24,560",
            icon: <DollarSign size={26} />,
            color: "bg-purple-500",
          },
          {
            title: "Support Tickets",
            value: "76",
            icon: <Headphones size={26} />,
            color: "bg-orange-500",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {card.title}
              </p>
              <h2 className="text-xl font-bold">{card.value}</h2>
            </div>
            <div className={`${card.color} text-white p-3 rounded-xl`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#1023", customer: "John Doe", amount: "$120", status: "Completed" },
                { id: "#1024", customer: "Sarah Lee", amount: "$80", status: "Pending" },
                { id: "#1025", customer: "Michael Chen", amount: "$220", status: "Cancelled" },
              ].map((order, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Sellers */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4">Top Sellers</h3>
          <ul className="space-y-3">
            {[
              { name: "Fashion Hub", sales: "540 orders" },
              { name: "TechZone", sales: "430 orders" },
              { name: "Home Decor", sales: "290 orders" },
            ].map((seller, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <span className="font-medium">{seller.name}</span>
                <span className="text-sm text-gray-500">{seller.sales}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Activity Feed */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" /> Recent Activities
          </h3>
          <ul className="space-y-3">
            {[
              "Admin added a new payment method",
              "Seller 'Fashion Hub' uploaded 5 products",
              "User Sarah Lee reported an issue",
              "System updated to version 2.1.0",
            ].map((log, i) => (
              <li key={i} className="text-sm border-b pb-2 last:border-0">
                {log}
              </li>
            ))}
          </ul>
        </div>

        {/* Tasks / Reminders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4">Pending Tasks</h3>
          <ul className="space-y-3">
            {[
              { task: "Approve 3 new seller requests", due: "Today" },
              { task: "Resolve 5 pending tickets", due: "Tomorrow" },
              { task: "Review flagged products", due: "2 days left" },
            ].map((task, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <span>{task.task}</span>
                <span className="text-xs text-gray-500">{task.due}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Category Modal */}
{showCategoryModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg relative flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold">Manage Categories</h2>
        <button
          onClick={() => setShowCategoryModal(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        {/* Category List */}
        <ul className="space-y-3 max-h-60">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="font-medium">{cat.name}</span>
              </div>
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>

        {/* Add New Category */}
        <form onSubmit={handleAddCategory} className="space-y-3">
          <input
            type="text"
            placeholder="Category Name"
            className="w-full border p-2 rounded-md dark:bg-gray-700"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border p-2 rounded-md dark:bg-gray-700"
            value={newCategory.image}
            onChange={(e) =>
              setNewCategory({ ...newCategory, image: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
