import React, { useState } from 'react';
import {
  FaRegSun, FaRegMoon, FaCog, FaBell, FaSave, FaUser, FaLock,
  FaEnvelope, FaCheckCircle, FaLanguage, FaEyeSlash, FaCamera,
  FaTrash, FaGlobe, FaClock
} from 'react-icons/fa';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(true);
  const [email, setEmail] = useState(true);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD ($)');
  const [timezone, setTimezone] = useState('GMT+6');
  const [profilePublic, setProfilePublic] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const [showAppsModal, setShowAppsModal] = useState(false);

  const connectedApps = [
    { name: 'Google', connected: true },
    { name: 'GitHub', connected: false },
    { name: 'Facebook', connected: false },
  ];

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  return (
    <div className={`p-6 min-h-screen space-y-10 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FaCog className="text-4xl text-indigo-500 animate-spin-slow" />
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Configure your account preferences and settings.</p>
          </div>
        </div>
        <button
          onClick={() => alert('Settings saved!')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-lg transition transform hover:scale-105"
        >
          <FaSave /> Save Changes
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Picture */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl space-y-4 text-center">
          <h2 className="text-xl font-semibold">Profile</h2>
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={profilePic || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border object-cover"
            />
            <label
              htmlFor="profileUpload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            <input id="profileUpload" type="file" className="hidden" onChange={handleProfileUpload} />
          </div>
        </div>

        {/* Theme */}
        <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaRegSun className="text-yellow-500" /> Theme
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            {darkMode ? <FaRegSun /> : <FaRegMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaBell className="text-red-500" /> Notifications
          </h2>
          <button
            onClick={() => setNotification(!notification)}
            className={`px-4 py-2 rounded-md text-white ${notification ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {notification ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Email */}
        <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaEnvelope className="text-purple-500" /> Email
          </h2>
          <button
            onClick={() => setEmail(!email)}
            className={`px-4 py-2 rounded-md text-white ${email ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {email ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Language */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaLanguage className="text-blue-600" /> Language
          </h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 dark:bg-gray-800"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>বাংলা</option>
          </select>
        </div>

        {/* Currency & Timezone */}
        <div className="bg-gradient-to-br from-pink-100 to-pink-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaGlobe className="text-pink-600" /> Preferences
          </h2>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
          >
            <option>USD ($)</option>
            <option>BDT (৳)</option>
            <option>EUR (€)</option>
          </select>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
          >
            <option>GMT+6</option>
            <option>GMT+0</option>
            <option>GMT+1</option>
          </select>
        </div>

        {/* Privacy */}
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaEyeSlash className="text-yellow-600" /> Privacy
          </h2>
          <div className="flex justify-between items-center">
            <p>Public Profile</p>
            <button
              onClick={() => setProfilePublic(!profilePublic)}
              className={`px-4 py-2 rounded-md text-white ${profilePublic ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {profilePublic ? 'Visible' : 'Hidden'}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>Data Collection</p>
            <button
              onClick={() => setDataCollection(!dataCollection)}
              className={`px-4 py-2 rounded-md text-white ${dataCollection ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {dataCollection ? 'Allowed' : 'Blocked'}
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-gradient-to-br from-teal-100 to-teal-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaLock className="text-teal-600" /> Security
          </h2>
          <div className="flex justify-between items-center">
            <p>Two-Factor Auth</p>
            <button
              onClick={() => setTwoFA(!twoFA)}
              className={`px-4 py-2 rounded-md text-white ${twoFA ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {twoFA ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Connected Apps */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaUser className="text-indigo-600" /> Connected Apps
          </h2>
          <button
            onClick={() => setShowAppsModal(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            Manage Apps
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-600">
            <FaTrash /> Danger Zone
          </h2>
          <p className="text-sm">Once deleted, your account cannot be recovered.</p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>

      {/* Connected Apps Modal */}
      {showAppsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full space-y-4 animate-fade-in">
            <h3 className="text-2xl font-semibold">Connected Apps</h3>
            {connectedApps.map((app, idx) => (
              <div key={idx} className="flex justify-between items-center px-4 py-2 border rounded-md">
                <p>{app.name}</p>
                <button className={`px-3 py-1 rounded-md text-white ${app.connected ? 'bg-red-500' : 'bg-green-500'}`}>
                  {app.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button onClick={() => setShowAppsModal(false)} className="px-4 py-2 bg-red-600 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
        <p>Settings Panel © 2025</p>
      </div>
    </div>
  );
}
