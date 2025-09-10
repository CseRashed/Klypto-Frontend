import React, { useState } from "react";
import { MdLocalOffer, MdDelete, MdEdit, MdAdd, MdArrowBack } from "react-icons/md";

export default function Offers() {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Summer Sale",
      description: "Get up to 50% off on selected items.",
      code: "SUMMER50",
      validTill: "June 30, 2025",
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free",
      description: "Applicable on selected fashion items.",
      code: "BOGOF2025",
      validTill: "May 15, 2025",
    },
    {
      id: 3,
      title: "Free Shipping",
      description: "On all orders above $100.",
      code: "FREESHIP",
      validTill: "April 30, 2025",
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    validTill: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.code) return;
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === editId ? { ...formData, id: editId } : offer
      )
    );
    setEditId(null);
    setFormData({ title: "", description: "", code: "", validTill: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this offer?")) {
      setOffers((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const handleAddNew = () => {
    if (!formData.title || !formData.code) return;
    const newOffer = {
      ...formData,
      id: Date.now(),
    };
    setOffers((prev) => [newOffer, ...prev]);
    setFormData({ title: "", description: "", code: "", validTill: "" });
    setShowAddForm(false);
  };

  const handleEditClick = (offer) => {
    setEditId(offer.id);
    setFormData(offer);
    setShowAddForm(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Back Button */}
      <div
        className="flex items-center gap-2 cursor-pointer w-max px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        onClick={() => window.history.back()}
      >
        <MdArrowBack />
        <span className="font-medium">Back</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MdLocalOffer className="text-3xl text-pink-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Available Offers</h1>
        </div>
        <button
          onClick={() => { setShowAddForm(!showAddForm); setEditId(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow transition"
        >
          <MdAdd />
          <span>Add Offer</span>
        </button>
      </div>

      {/* Add Offer Form */}
      {showAddForm && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md space-y-3">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
          />
          <input
            name="code"
            placeholder="Offer Code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
          />
          <input
            name="validTill"
            placeholder="Valid Till"
            value={formData.validTill}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={handleAddNew}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            Add Offer
          </button>
        </div>
      )}

      {/* Offer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between h-full"
          >
            {editId === offer.id ? (
              <div className="space-y-2">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
                />
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
                />
                <input
                  name="validTill"
                  value={formData.validTill}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-300"
                />
                <button
                  onClick={handleSave}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition w-full"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-pink-600">{offer.title}</h2>
                <p className="text-gray-600">{offer.description}</p>
                <div className="text-sm text-gray-500">Valid Till: {offer.validTill}</div>
                <div className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs inline-block font-semibold">
                  Code: {offer.code}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditClick(offer)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
