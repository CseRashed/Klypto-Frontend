import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// 🔹 Dummy logged-in user (role = "superadmin" | "admin" | "seller" | "user")
const currentUser = { id: 2, role: "seller" };

export default function ProductManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", sellerId: 2, price: 120, status: "Approved" },
    { id: 2, name: "Smartphone", sellerId: 3, price: 500, status: "Approved" },
    { id: 3, name: "Gaming Mouse", sellerId: 2, price: 40, status: "Pending" },
  ]);

  // Filtering by role
  const visibleProducts =
    currentUser.role === "superadmin" || currentUser.role === "admin"
      ? products
      : currentUser.role === "seller"
      ? products.filter((p) => p.sellerId === currentUser.id)
      : products.filter((p) => p.status === "Approved");

  const handleDelete = (id) => setProducts(products.filter((p) => p.id !== id));
  const handleEdit = (id) => alert(`Edit Product #${id}`);
  const handleAdd = () => alert("Open Add Product Form");

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>

        {/* Seller Only → Add Product Button */}
        {currentUser.role === "seller" && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Product
          </button>
        )}
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">#{p.id}</td>
                <td className="py-3 px-4 font-medium">{p.name}</td>
                <td className="py-3 px-4">${p.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex items-center gap-3">
                  {/* Seller → Edit/Delete */}
                  {currentUser.role === "seller" && p.sellerId === currentUser.id && (
                    <>
                      <button
                        onClick={() => handleEdit(p.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}

                  {/* Admin / SuperAdmin → Delete Only */}
                  {(currentUser.role === "admin" || currentUser.role === "superadmin") && (
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  )}

                  {/* User → View Only */}
                  {currentUser.role === "user" && (
                    <span className="text-gray-400 italic">View Only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
