
import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiPhone, FiVideo } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";


export default function CustomerSupport() {
  const userId = "user123";   // Replace with real user ID
  const adminId = "admin001"; // Static admin ID
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("general");
  const [isTyping, setIsTyping] = useState(false);
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);




  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!input.trim() && !image) return;

    const messageObj = {
      text: input,
      image: image ? URL.createObjectURL(image) : null,
    };

    const outgoing = {
      senderId: userId,
      receiverId: adminId,
      message: messageObj,
    };

    socket.emit("send_message", outgoing);
    setMessages((prev) => [...prev, { from: "user", ...messageObj, time: new Date().toLocaleTimeString() }]);
    setInput("");
    setImage(null);
    setIsTyping(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-orange-500 p-4 flex justify-between items-center text-white">
          <div className="text-lg font-semibold">Chat with Admin</div>
         
        </div>

        <div className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-b">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full sm:w-1/2 border border-gray-300 rounded-full px-4 py-2 bg-gray-50 text-sm focus:outline-none">
            <option value="general">Seller Request</option>
            <option value="order">Order Issue</option>
            <option value="technical">Technical Problem</option>
            <option value="feedback">Feedback</option>
          </select>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <BiImageAdd className="text-xl text-orange-500" />
            <span className="text-gray-600">Attach Image</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <div className="bg-gray-50 px-4 py-6 h-[400px] overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <img src={msg.from === "user" ? "https://i.pravatar.cc/40?img=3" : "https://i.pravatar.cc/40?img=1"} alt="avatar" className="w-8 h-8 rounded-full" />
                <div className={`rounded-xl px-4 py-2 text-sm shadow-md max-w-xs ${msg.from === "user" ? "bg-orange-500 text-white" : "bg-white text-gray-800 border"}`}>
                  {msg.image && <img src={msg.image} alt="upload" className="mb-2 max-w-full rounded-md" />}
                  {msg.text}
                  <div className="text-[10px] text-right text-gray-400 mt-1">{msg.time}</div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && <div className="text-sm text-gray-400 italic">Admin is typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 flex items-center border-t gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Write your message..." className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none" onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
          <button onClick={sendMessage} className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xl"><FiSend /></button>
        </div>
      </div>
    </div>
  );
}