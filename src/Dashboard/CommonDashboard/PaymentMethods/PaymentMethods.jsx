import React, { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";

// Simple Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${className}`}>{children}</div>
);
const CardContent = ({ children, className = "" }) => <div className={`p-5 ${className}`}>{children}</div>;

// Modern Button Component
const Button = ({ children, className = "", size = "md", variant = "default", ...props }) => {
  let base = "rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 justify-center focus:outline-none";
  let sizeClass =
    size === "sm" ? "px-3 py-1 text-sm" :
    size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2 text-md";

  let variantClass =
    variant === "outline" ? "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100" :
    variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700" :
    "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500";

  return (
    <button className={`${base} ${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: "bKash", status: "active" },
    { id: 2, name: "Nagad", status: "active" },
    { id: 3, name: "Stripe", status: "inactive" },
    { id: 4, name: "PayPal", status: "active" },
    { id: 5, name: "Rocket", status: "inactive" },
  ]);

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Payment Methods</h2>
          <p className="text-gray-500 mt-1">Manage all your platform's payment methods here.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={18} /> Add Method
        </Button>
      </div>

      {/* Payment List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Payment Info */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{method.name}</h3>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                    method.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {method.status.toUpperCase()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3 sm:mt-0">
                <Button size="sm" variant="outline">
                  <Edit size={16} /> Edit
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash size={16} /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
