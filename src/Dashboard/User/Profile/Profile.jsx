import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load user data from database
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  // Handle Save / Update Profile
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        const updatedUser = await res.json();
        setUserInfo(updatedUser);
        setModalOpen(false);

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 py-10 px-4">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={userInfo?.image}
            alt="User"
            className="w-40 h-40 rounded-full object-cover border-4 border-orange-300 shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
            <p className="text-gray-500">Manage your personal details</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400 text-orange-600 font-semibold hover:bg-orange-50 hover:shadow-lg transition-all duration-200"
          >
            Edit <FaEdit />
          </button>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", value: userInfo?.name || "Unknown" },
            { label: "Email", value: userInfo?.email || "Unknown" },
            { label: "Phone", value: userInfo?.phone || "Not Added" },
            { label: "Street", value: userInfo?.street || "Not Added" },
            { label: "City", value: userInfo?.city || "Not Added" },
            { label: "State", value: userInfo?.state || "Not Added" },
            { label: "Zip", value: userInfo?.zip || "Not Added" },
            { label: "Country", value: userInfo?.country || "Not Added" },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-sm text-gray-600 font-semibold">
                {field.label}
              </label>
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

      {/* Responsive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-lg font-bold transition"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Edit Profile
            </h3>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { name: "name", placeholder: "Name" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "phone", placeholder: "Phone" },
                { name: "image", placeholder: "Profile Image URL" },
                { name: "street", placeholder: "Street Address" },
                { name: "city", placeholder: "City" },
                { name: "state", placeholder: "State / Province" },
                { name: "zip", placeholder: "ZIP / Postal Code" },
                { name: "country", placeholder: "Country" },
              ].map((field, i) => (
                <input
                  key={i}
                  type={field.type || "text"}
                  name={field.name}
                  defaultValue={userInfo[field.name]}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                />
              ))}

              <button
                type="submit"
                className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 hover:shadow-lg transition-all duration-200"
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
