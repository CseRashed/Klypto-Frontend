import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    shippingMethod: "",
    paymentMethod: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && !formData.address.trim()) {
      setError("Address is required");
      return;
    }
    if (step === 2 && !formData.shippingMethod) {
      setError("Please select a shipping method");
      return;
    }
    if (step === 3 && !formData.paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const stepLabels = ["Billing", "Shipping", "Payment"];

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-12 text-blue-900">
        Checkout
      </h1>

      {/* Step Indicator */}
      {step <= 3 && (
        <div className="flex   justify-between items-center mb-10 w-full">
  {stepLabels.map((label, i) => (
    <div
      key={i}
      className="flex-1 flex flex-col sm:flex-row items-center sm:items-center mb-4 sm:mb-0"
    >
      <div className="flex items-center w-full sm:w-auto">
        <div
          className={`flex items-center justify-center rounded-full font-semibold transition-all duration-300
            ${step === i + 1 ? "bg-blue-900 shadow-lg text-white" : "bg-gray-300 text-gray-700"}
            ${window.innerWidth < 640 ? "w-8 h-8 text-sm" : "w-12 h-12 text-lg"}
          `}
        >
          {i + 1}
        </div>

        {i < stepLabels.length - 1 && (
          <div className={`flex-1 h-1 mx-2 bg-gray-300 relative`}>
            <div
              className="h-1 bg-blue-900 transition-all duration-500"
              style={{ width: step > i + 1 ? "100%" : "0%" }}
            ></div>
          </div>
        )}
      </div>
      <span
        className={`mt-1 sm:mt-0 text-xs sm:text-sm text-center ${
          window.innerWidth < 640 ? "text-[10px]" : "text-sm"
        }`}
      >
        {label}
      </span>
    </div>
  ))}
</div>

      )}

      {/* Step 1: Billing */}
      {step === 1 && (
        <form
          onSubmit={handleNext}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2 p-6 bg-white rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
              />
              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              />
              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Phone"
                name="phone"
                onChange={handleChange}
              />
              <input
                className={`border p-3 rounded-lg focus:ring-2 outline-none ${
                  error ? "border-red-500 focus:ring-red-400" : "focus:ring-orange-400"
                }`}
                placeholder="Address"
                name="address"
                onChange={handleChange}
              />
              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="City"
                name="city"
                onChange={handleChange}
              />
              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="ZIP/Postal Code"
                name="zip"
                onChange={handleChange}
              />
              <select
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                name="country"
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="BD">Bangladesh</option>
                <option value="US">USA</option>
                <option value="IN">India</option>
              </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full sm:w-auto mt-6 px-6 py-3 bg-blue-900 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-all"
            >
              CONTINUE
            </button>
          </div>

          {/* Order Summary */}
          <div className="border rounded-xl p-6 shadow-lg bg-white h-fit">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Product"
                  className="rounded-lg"
                />
                <div>
                  <p className="font-semibold text-gray-800">Stavanger By BN</p>
                  <p className="text-gray-500">Qty: 1</p>
                  <p className="text-blue-900 font-bold mt-1">32,490.00 kr</p>
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>36,999.00 kr</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>103,999.00 kr</span>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Step 2: Shipping */}
      {step === 2 && (
        <form onSubmit={handleNext} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-8">
            Shipping Method
          </h2>
          <div className="space-y-4">
            {[
              { id: "standard", name: "Standard (3-5 days)", price: "Free" },
              { id: "express", name: "Express (1-2 days)", price: "$9.99" },
              { id: "pickup", name: "Local Pickup", price: "Free" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition-shadow hover:shadow-lg ${
                  formData.shippingMethod === method.id
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div>
                  <p className="font-semibold">{method.name}</p>
                </div>
                <div className="font-semibold">{method.price}</div>
                <input
                  type="radio"
                  name="shipping"
                  value={method.id}
                  className="accent-orange-500"
                  checked={formData.shippingMethod === method.id}
                  onChange={() => setFormData({ ...formData, shippingMethod: method.id })}
                />
              </label>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-900 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-all"
          >
            CONTINUE TO PAYMENT
          </button>
        </form>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <form onSubmit={handleNext} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-8">
            Payment Method
          </h2>
          <div className="space-y-4">
            {[
              { id: "credit", name: "Credit/Debit Card" },
              { id: "paypal", name: "PayPal" },
              { id: "apple", name: "Apple Pay" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-shadow hover:shadow-lg ${
                  formData.paymentMethod === method.id
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : "border-gray-300 bg-white"
                }`}
              >
                <span>{method.name}</span>
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  className="accent-orange-500"
                  checked={formData.paymentMethod === method.id}
                  onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                />
              </label>
            ))}
          </div>
          {error && <p className="text-blue-900 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-900 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-all"
          >
            CONFIRM ORDER
          </button>
        </form>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="max-w-3xl mx-auto p-10 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Thank You!
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Your order has been placed successfully.
          </p>
          <Link
          to={'/'}
            
            className="px-6 py-3 bg-blue-900 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-all"
          >
            Place Another Order
          </Link>
        </div>
      )}
    </div>
  );
}
