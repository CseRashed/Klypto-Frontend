import React, { useState } from "react";
import { Package, ShoppingBag, CheckCircle, X } from "lucide-react";

const MyOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "ORD-1001",
      date: "2025-09-05",
      subtotal: 3200,
      delivery: 100,
      tax: 160,
      status: "Shipped",
      seller: "TechBazaar",
      products: [
        { name: "Wireless Mouse", qty: 1, price: 800 },
        { name: "Mechanical Keyboard", qty: 1, price: 2400 },
      ],
      trackingSteps: ["Order Placed", "Packed", "Shipped", "Delivered"],
      currentStep: 2,
    },
    {
      id: "ORD-1002",
      date: "2025-09-02",
      subtotal: 1500,
      delivery: 80,
      tax: 75,
      status: "Delivered",
      seller: "GadgetWorld",
      products: [{ name: "Bluetooth Speaker", qty: 1, price: 1500 }],
      trackingSteps: ["Order Placed", "Packed", "Shipped", "Delivered"],
      currentStep: 4,
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        My Orders
      </h1>

      {/* Orders List */}
      <div className="grid gap-4 sm:gap-5">
        {orders.map((order) => {
          const grandTotal = order.subtotal + order.delivery + order.tax;
          return (
            <div
              key={order.id}
              className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition cursor-pointer flex justify-between items-center"
              onClick={() => setSelectedOrder(order)}
            >
              <div>
                <p className="font-semibold text-base sm:text-lg md:text-xl text-gray-800">
                  #{order.id}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">{order.date}</p>
                <p className="text-sm sm:text-base font-medium mt-1">
                  Total: ৳{grandTotal}
                </p>
              </div>
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-3xl shadow-2xl relative animate-fadeIn 
                          max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-red-500 transition"
              onClick={() => setSelectedOrder(null)}
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Modal Content */}
            <div className="p-5 sm:p-8">
              {/* Title */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-gray-800">
                Order Details -{" "}
                <span className="text-blue-600">{selectedOrder.id}</span>
              </h2>

              {/* Seller & Status */}
              <div className="flex flex-col sm:flex-row justify-between mb-6 bg-gray-50 p-4 rounded-xl">
                <p className="text-xs sm:text-sm text-gray-600">
                  Seller:{" "}
                  <span className="font-medium">{selectedOrder.seller}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-0">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-lg text-xs sm:text-sm ${
                      selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
              </div>

              {/* Product List */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-base sm:text-lg text-gray-800">
                  Products
                </h3>
                <ul className="divide-y rounded-lg border bg-gray-50">
                  {selectedOrder.products.map((p, i) => (
                    <li
                      key={i}
                      className="flex justify-between py-2 sm:py-3 px-3 sm:px-4 text-gray-700 text-sm sm:text-base"
                    >
                      <span>
                        {p.name}{" "}
                        <span className="text-xs sm:text-sm text-gray-500">
                          (x{p.qty})
                        </span>
                      </span>
                      <span className="font-medium">৳{p.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cost Breakdown */}
              <div className="mb-6 bg-gray-50 p-4 sm:p-5 rounded-xl">
                <h3 className="font-semibold mb-4 text-base sm:text-lg text-gray-800">
                  Payment Summary
                </h3>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>৳{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                  <span>Delivery</span>
                  <span>৳{selectedOrder.delivery}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                  <span>Tax</span>
                  <span>৳{selectedOrder.tax}</span>
                </div>
                <div className="flex justify-between font-bold text-base sm:text-lg text-gray-800 border-t pt-3">
                  <span>Total</span>
                  <span className="text-green-600">
                    ৳
                    {selectedOrder.subtotal +
                      selectedOrder.delivery +
                      selectedOrder.tax}
                  </span>
                </div>
              </div>

              {/* Delivery Tracking */}
              <div>
                <h3 className="font-semibold mb-4 text-base sm:text-lg text-gray-800">
                  Delivery Progress
                </h3>
                <div className="flex items-center justify-between">
                  {selectedOrder.trackingSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-full relative"
                    >
                      {/* Circle */}
                      <div
                        className={`rounded-full p-2 sm:p-3 z-10 ${
                          index < selectedOrder.currentStep
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {index < selectedOrder.currentStep ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs mt-1 sm:mt-2 text-center text-gray-600">
                        {step}
                      </p>

                      {/* Line */}
                      {index < selectedOrder.trackingSteps.length - 1 && (
                        <div
                          className={`absolute top-4 sm:top-5 left-1/2 w-full h-0.5 -translate-x-1/2 ${
                            index < selectedOrder.currentStep - 1
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
