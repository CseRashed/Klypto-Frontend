import React, { useState, useMemo } from "react";
import {
  Edit,
  Trash2,
  Ban,
  CheckCircle2,
  XCircle,
  UserPlus,
  X,
  User,
} from "lucide-react";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("Admin");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewProfile, setViewProfile] = useState(null);

  const itemsPerPage = 5;

  const [users, setUsers] = useState([
    { id: 1, name: "Super Admin", email: "admin@example.com", role: "Admin", status: "Active", phone: "1234567890", joined: "2025-01-10" },
    { id: 2, name: "Seller One", email: "seller1@example.com", role: "Seller", status: "Pending", phone: "9876543210", joined: "2025-02-15" },
    { id: 3, name: "John Doe", email: "john@example.com", role: "User", status: "Active", phone: "5555555555", joined: "2025-03-05" },
    { id: 4, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Suspended", phone: "4444444444", joined: "2025-04-12" },
    { id: 5, name: "Seller Two", email: "seller2@example.com", role: "Seller", status: "Pending", phone: "3333333333", joined: "2025-05-01" },
    { id: 6, name: "Alice", email: "alice@example.com", role: "User", status: "Active", phone: "2222222222", joined: "2025-06-20" },
    { id: 7, name: "Bob", email: "bob@example.com", role: "User", status: "Active", phone: "1111111111", joined: "2025-07-18" },
  ]);

  const getDataByTab = () => {
    let filtered = users.filter(u => {
      if (activeTab === "Admin") return u.role === "Admin";
      if (activeTab === "Seller") return u.role === "Seller";
      return u.role === "User";
    });

    if (search.trim()) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  };

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return getDataByTab().slice(start, start + itemsPerPage);
  }, [getDataByTab(), currentPage, activeTab, search]);

  const totalPages = Math.ceil(getDataByTab().length / itemsPerPage);

  // Actions
  const handleChangeRole = (id, newRole) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleToggleSuspend = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" } : u));
  };

  const handleSellerStatus = (id, newStatus) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, status: newStatus } : u)));
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleAddEditUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = form.role.value;
    const status = form.status.value;
    const phone = form.phone.value;

    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, name, email, role, status, phone } : u));
    } else {
      const newUser = { id: Date.now(), name, email, role, status, phone, joined: new Date().toISOString().split("T")[0] };
      setUsers(prev => [...prev, newUser]);
    }

    setShowModal(false);
    setEditUser(null);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">User Management</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md transition text-sm sm:text-base"
          onClick={() => setShowModal(true)}
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        {["Admin", "Seller", "User"].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-3 sm:mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full sm:w-1/3 px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full border-collapse text-xs sm:text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-2 sm:p-3 text-left">ID</th>
              <th className="p-2 sm:p-3 text-left">Name</th>
              <th className="p-2 sm:p-3 text-left">Email</th>
              <th className="p-2 sm:p-3 text-left">Role</th>
              <th className="p-2 sm:p-3 text-left">Status</th>
              <th className="p-2 sm:p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedData.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="p-1 sm:p-3">{user.id}</td>
                <td className="p-1 sm:p-3 font-medium cursor-pointer hover:text-blue-600" onClick={() => setViewProfile(user)}>
                  {user.name}
                </td>
                <td className="p-1 sm:p-3 truncate max-w-[150px]">{user.email}</td>
                <td className="p-1 sm:p-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user.id, e.target.value)}
                    className="px-1 sm:px-2 py-0.5 sm:py-1 rounded-md border text-xs sm:text-sm bg-gray-50 w-full"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Seller">Seller</option>
                    <option value="User">User</option>
                  </select>
                </td>
                <td className="p-1 sm:p-3">
                  <span
                    className={`px-2 py-1 text-xs sm:text-sm rounded-full font-medium ${
                      user.status === "Active" ? "bg-green-100 text-green-700" :
                      user.status === "Suspended" ? "bg-red-100 text-red-700" :
                      user.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      user.status === "Approved" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-1 sm:p-3 flex justify-center items-center gap-1 sm:gap-2">
                  {user.role === "Seller" && user.status === "Pending" && (
                    <>
                      <button onClick={() => handleSellerStatus(user.id, "Approved")} className="p-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition">
                        <CheckCircle2 size={16} />
                      </button>
                      <button onClick={() => handleSellerStatus(user.id, "Rejected")} className="p-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition">
                        <XCircle size={16} />
                      </button>
                    </>
                  )}
                  <button onClick={() => openEditModal(user)} className="p-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleToggleSuspend(user.id)} className="p-1 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition">
                    <Ban size={16} />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="p-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-3 sm:mt-4 flex-wrap">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => { setShowModal(false); setEditUser(null); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-4">{editUser ? "Edit User" : "Add User"}</h2>
            <form className="space-y-3" onSubmit={handleAddEditUser}>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" name="name" defaultValue={editUser?.name || ""} required className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" defaultValue={editUser?.email || ""} required className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="text" name="phone" defaultValue={editUser?.phone || ""} required className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select name="role" defaultValue={editUser?.role || "User"} className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base bg-gray-50">
                  <option value="Admin">Admin</option>
                  <option value="Seller">Seller</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select name="status" defaultValue={editUser?.status || "Active"} className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base bg-gray-50">
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <button type="submit" className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
                {editUser ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        </div>
      )}

      
    </div>
  );
}
