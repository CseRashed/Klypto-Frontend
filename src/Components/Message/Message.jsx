import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiArrowLeft, FiPhone, FiVideo } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

// Dummy users & messages
const dummyUsers = [
  {
    id: "u1",
    name: "Alice",
    avatar: "https://i.pravatar.cc/150?img=1",
    messages: [
      { from: "Alice", text: "Hey! How are you?", time: "10:00 AM" },
      { from: "me", text: "I'm good, thanks!", time: "10:01 AM" },
    ],
  },
  {
    id: "u2",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=2",
    messages: [
      { from: "Bob", text: "Are we meeting today?", time: "11:00 AM" },
      { from: "me", text: "Yes, let's meet at 2 PM.", time: "11:05 AM" },
    ],
  },
  {
    id: "u3",
    name: "Charlie",
    avatar: "https://i.pravatar.cc/150?img=3",
    messages: [
      { from: "Charlie", text: "Check this out!", time: "09:30 AM" },
      { from: "me", text: "Wow, nice!", time: "09:35 AM" },
    ],
  },
];

export default function MultiUserMessenger() {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser?.messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      from: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id
        ? { ...u, messages: [...u.messages, newMsg] }
        : u
    );

    setUsers(updatedUsers);

    setSelectedUser((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setInput("");
    scrollToBottom();
  };

  const startAudioCall = () => alert(`Starting audio call with ${selectedUser.name}`);
  const startVideoCall = () => alert(`Starting video call with ${selectedUser.name}`);

  return (
    <div className="flex h-screen bg-gray-100">
     {/* Sidebar: User List */}
{!selectedUser && (
  <div className="w-full md:w-1/4 border-r bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
    <h2 className="text-2xl font-bold p-4 border-b">Messages</h2>

     {/* Modern Responsive Search Bar (Side-by-side on all devices) */}
<div className="p-2 mb-4 w-full">
  <div className="flex flex-row items-center gap-2 w-full">
    {/* Input */}
    <input
      type="text"
      placeholder="Search users..."
      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all w-full"
    />
    {/* Search Button */}
    <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all text-sm flex-shrink-0">
      Search
    </button>
  </div>
</div>


    <div className="flex flex-col">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
          className="flex items-center gap-4 p-3 m-2 rounded-xl cursor-pointer hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            {/* Online Indicator */}
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="font-semibold text-gray-800 text-base">{user.name}</span>
            <span className="text-gray-500 text-sm truncate max-w-full">
              {user.messages[user.messages.length - 1]?.text || "No messages yet"}
            </span>
          </div>
          {/* Unread badge example */}
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {Math.floor(Math.random() * 5)} {/* dummy unread */}
          </span>
        </div>
      ))}
    </div>
  </div>
)}


      {/* Chat Window */}
      {selectedUser && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="text-white text-2xl"
                title="Back"
              >
                <FiArrowLeft />
              </button>
              <div className="font-semibold text-lg">{selectedUser.name}</div>
            </div>
            <div className="flex gap-4 text-xl">
              <button onClick={startAudioCall} title="Audio Call">
                <FiPhone />
              </button>
              <button onClick={startVideoCall} title="Video Call">
                <FiVideo />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            <AnimatePresence>
              {selectedUser.messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg shadow break-words ${
                      msg.from === "me"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] text-gray-400 text-right mt-1">
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center p-4 border-t bg-white gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all"
            >
              <FiSend />
            </button>
            <label className="cursor-pointer">
              <BiImageAdd className="text-blue-600 text-2xl" />
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
