import React, { useState } from "react";
import { Bell, Package, Tag, CreditCard, XCircle, Dot, Inbox } from "lucide-react";

const UserNotifications = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-1001 has been shipped.",
      time: "2 hours ago",
      read: false,
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      id: 2,
      type: "offer",
      title: "Flash Sale 🔥",
      message: "Get 50% off electronics for the next 3 hours!",
      time: "Yesterday",
      read: false,
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: 3,
      type: "order",
      title: "Order Delivered",
      message: "Your order #ORD-1002 was delivered successfully.",
      time: "3 days ago",
      read: true,
      avatar: "https://i.pravatar.cc/40?img=8",
    },
    {
      id: 4,
      type: "system",
      title: "Payment Received",
      message: "We’ve received your payment for #ORD-1003.",
      time: "1 week ago",
      read: true,
      avatar: "https://i.pravatar.cc/40?img=2",
    },
  ]);

  const tabs = [
    { key: "all", label: "All", icon: Bell },
    { key: "unread", label: "Unread", icon: Dot },
    { key: "order", label: "Orders", icon: Package },
    { key: "offer", label: "Offers", icon: Tag },
    { key: "system", label: "System", icon: CreditCard },
  ];

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === activeTab);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800">
          <Bell className="text-blue-600" /> Notifications
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>
        <button
          onClick={markAllAsRead}
          className="text-sm text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const count =
            tab.key === "all"
              ? notifications.length
              : tab.key === "unread"
              ? notifications.filter((n) => !n.read).length
              : notifications.filter((n) => n.type === tab.key).length;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all 
              ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon size={16} />
              {tab.label}
              {count > 0 && (
                <span
                  className={`text-xs font-semibold px-2 rounded-full ${
                    activeTab === tab.key ? "bg-white/20" : "bg-gray-300"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <Inbox className="mx-auto mb-3 text-gray-400" size={40} />
            <p>No notifications in this tab</p>
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start justify-between p-4 rounded-xl border shadow-sm backdrop-blur-md transition hover:shadow-md 
              ${
                n.read
                  ? "bg-white/80 border-gray-200"
                  : "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
              }`}
            >
              {/* Left: Avatar + Content */}
              <div className="flex items-start gap-3">
                <img
                  src={n.avatar}
                  alt="sender"
                  className="w-10 h-10 rounded-full border shadow-sm"
                />
                <div>
                  <h3
                    className={`font-semibold text-sm sm:text-base flex items-center gap-1 ${
                      n.read ? "text-gray-800" : "text-blue-800"
                    }`}
                  >
                    {n.title}
                    {!n.read && (
                      <Dot className="text-blue-600 w-5 h-5 -ml-1" />
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {n.message}
                  </p>
                  <span className="text-[11px] sm:text-xs text-gray-400">
                    {n.time}
                  </span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-xs sm:text-sm text-blue-600 hover:underline"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserNotifications;
