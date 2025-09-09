import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiPhone, FiVideo } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function MessengerUI() {
  const userId = "user123";
  const adminId = "admin001";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!input.trim() && !image) return;

    const messageObj = {
      text: input,
      image: image ? URL.createObjectURL(image) : null,
      from: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, messageObj]);
    setInput("");
    setImage(null);
    setIsTyping(true);

    setTimeout(() => setIsTyping(false), 1500);
    scrollToBottom();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  useEffect(() => scrollToBottom(), [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-2 sm:p-4">
      <div className="w-full max-w-md sm:max-w-2xl h-[80vh] sm:h-[85vh] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 bg-blue-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="admin avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span className="font-semibold text-sm sm:text-lg">Admin</span>
          </div>
          <div className="flex gap-2 sm:gap-3 text-lg sm:text-xl">
            <button title="Audio Call"><FiPhone /></button>
            <button title="Video Call"><FiVideo /></button>
            <button title="More Options"><BsThreeDots /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 px-2 sm:px-4 py-3 overflow-y-auto bg-gray-50 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end gap-1 sm:gap-2 max-w-[70%] ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <img
                    src={msg.from === "user" ? "https://i.pravatar.cc/40?img=3" : "https://i.pravatar.cc/40?img=1"}
                    alt="avatar"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div className={`relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm sm:text-base break-words shadow-md ${
                    msg.from === "user" ? "bg-blue-800 text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}>
                    {msg.image && (
                      <img src={msg.image} alt="upload" className="mb-2 max-w-full rounded-md" />
                    )}
                    {msg.text}
                    <span className="block text-[9px] sm:text-[10px] text-gray-300 mt-1 text-right">{msg.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && <div className="text-sm text-gray-500 italic">Admin is typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-100 border-t border-gray-200">
          <label className="cursor-pointer flex items-center gap-1 sm:gap-2">
            <BiImageAdd className="text-blue-600 text-xl sm:text-2xl" />
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 sm:p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-lg sm:text-xl"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
