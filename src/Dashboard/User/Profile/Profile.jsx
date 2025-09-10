import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+880 1234 567890",
    image: "https://i.pravatar.cc/150?img=3",
    street: "123 Main Street",
    city: "Dhaka",
    state: "Dhaka Division",
    zip: "1207",
    country: "Bangladesh",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = Object.fromEntries(formData.entries());
    setUserData(updated);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 py-10 px-4">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={userData.image}
            alt="User"
            className="w-40 h-40 rounded-full object-cover border-4 border-orange-300 shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
            <p className="text-gray-500">Manage your personal details</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-outline flex items-center gap-2"
          >
            Edit <FaEdit />
          </button>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", value: userData.name },
            { label: "Email", value: userData.email },
            { label: "Phone", value: userData.phone },
            { label: "Image URL", value: userData.image },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-sm text-gray-600 font-semibold">{field.label}</label>
              <input
                type="text"
                value={field.value}
                disabled
                className="w-full mt-2 px-4 py-2 rounded-xl border bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          ))}

          {/* Address */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Street Address", value: userData.street },
              { label: "City", value: userData.city },
              { label: "State / Province", value: userData.state },
              { label: "ZIP / Postal Code", value: userData.zip },
              { label: "Country", value: userData.country, span: 2 },
            ].map((field, i) => (
              <div key={i} className={field.span ? "md:col-span-2" : ""}>
                <label className="text-sm text-gray-600 font-semibold">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  disabled
                  className="w-full mt-2 px-4 py-2 rounded-xl border bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h3>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                name="name"
                defaultValue={userData.name}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="email"
                name="email"
                defaultValue={userData.email}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="phone"
                defaultValue={userData.phone}
                placeholder="Phone"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="image"
                defaultValue={userData.image}
                placeholder="Profile Image URL"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="street"
                defaultValue={userData.street}
                placeholder="Street Address"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="city"
                defaultValue={userData.city}
                placeholder="City"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="state"
                defaultValue={userData.state}
                placeholder="State / Province"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="zip"
                defaultValue={userData.zip}
                placeholder="ZIP / Postal Code"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="country"
                defaultValue={userData.country}
                placeholder="Country"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2 text-lg mt-4 col-span-1 md:col-span-2 justify-center"
              >
                Save <FaSave />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
