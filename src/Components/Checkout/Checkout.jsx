import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

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
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  // Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user?.email) {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/carts/${user.email}`
          );
          const data = await res.json();
          setCart(data);
        }
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shippingCost = formData.shippingMethod === "express" ? 9.99 : 0;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1 & 2: Next button
  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    if (step === 1 && !formData.address.trim()) {
      setError("Address is required");
      return;
    }
    if (step === 2 && !formData.shippingMethod) {
      setError("Please select a shipping method");
      return;
    }

    // Save Billing info
    if (step === 1) {
      const billing = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
      };
      localStorage.setItem("billingInfo", JSON.stringify(billing));
    }

    // Save Shipping info
    if (step === 2) {
      const shipping = { shippingMethod: formData.shippingMethod };
      localStorage.setItem("shippingInfo", JSON.stringify(shipping));
    }

    setStep(step + 1);
  };

  // Step 3: Payment & Final Order
  const handlePaymentNext = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    // Save Payment info
    const payment = { paymentMethod: formData.paymentMethod };
    localStorage.setItem("paymentInfo", JSON.stringify(payment));

    // Submit the order
    handleConfirmOrder();
  };

  const handleConfirmOrder = async () => {
    try {
      const billingInfo = JSON.parse(localStorage.getItem("billingInfo")) || {};
      const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
      const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo")) || {};

      const orderData = {
        userEmail: user?.email,
        cart,
        subtotal,
        shippingCost,
        total,
        billingInfo,
        shippingInfo,
        paymentInfo,
        createdAt: new Date(),
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order submission failed");

      // Clear localStorage
      localStorage.removeItem("billingInfo");
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("paymentInfo");

      setStep(4); // Show Confirmation
    } catch (err) {
      console.error("❌ Error submitting order:", err);
      setError("Failed to place order. Please try again.");
    }
  };

  const stepLabels = ["Billing", "Shipping", "Payment"];

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-12 text-blue-900">
        Checkout
      </h1>

      {step <= 3 && (
        <div className="flex justify-around gap-6 mb-10">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex flex-col items-center sm:items-start gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                  step === i + 1
                    ? "bg-blue-900 shadow-lg text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-sm text-center sm:text-left">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Step 1: Billing */}
      {step === 1 && (
        <form onSubmit={handleNext} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 bg-white rounded-xl shadow-lg space-y-4 order-2 lg:order-1">
            <h2 className="text-xl font-bold text-gray-800">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-3 rounded-lg"/>
              <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-3 rounded-lg"/>
              <input name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg"/>
              <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-3 rounded-lg"/>
              <input name="address" placeholder="Address" onChange={handleChange} className={`border p-3 rounded-lg ${error ? "border-red-500" : ""}`}/>
              <input name="city" placeholder="City" onChange={handleChange} className="border p-3 rounded-lg"/>
              <input name="zip" placeholder="ZIP/Postal Code" onChange={handleChange} className="border p-3 rounded-lg"/>
              <select name="country" onChange={handleChange} className="border p-3 rounded-lg">
                <option value="">Select Country</option>
                <option value="BD">Bangladesh</option>
                <option value="US">USA</option>
                <option value="IN">India</option>
              </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="mt-6 px-6 py-3 bg-blue-900 text-white rounded-lg">CONTINUE</button>
          </div>

          {/* Order Summary */}
          <div className="border rounded-xl p-6 shadow-lg bg-white h-fit order-1 lg:order-2">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h3>
            {loading ? (
              <p>Loading cart...</p>
            ) : cart.length === 0 ? (
              <p className="text-gray-500">No items in cart</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-blue-900 font-bold">
                      ${item.price * (item.quantity || 1)}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <hr className="my-4 border-gray-300" />
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost > 0 ? `$${shippingCost}` : "Free"}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Step 2: Shipping */}
      {step === 2 && (
        <form onSubmit={handleNext} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Shipping Method</h2>
          {[{id:"standard",name:"Standard (3-5 days)",price:"Free"},{id:"express",name:"Express (1-2 days)",price:"$9.99"},{id:"pickup",name:"Local Pickup",price:"Free"}].map(method => (
            <label key={method.id} className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer ${formData.shippingMethod===method.id?"border-orange-500 bg-orange-50":"border-gray-300 bg-white"}`}>
              <span>{method.name}</span><span>{method.price}</span>
              <input type="radio" checked={formData.shippingMethod===method.id} onChange={()=>setFormData({...formData,shippingMethod:method.id})}/>
            </label>
          ))}
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="mt-6 px-6 py-3 bg-blue-900 text-white rounded-lg">CONTINUE TO PAYMENT</button>
        </form>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <form onSubmit={handlePaymentNext} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Payment Method</h2>
          {[{id:"credit",name:"Credit/Debit Card"},{id:"paypal",name:"PayPal"},{id:"cod",name:"Cash on Delivery"}].map(method => (
            <label key={method.id} className={`flex justify-between p-4 border rounded-lg cursor-pointer ${formData.paymentMethod===method.id?"border-orange-500 bg-orange-50":"border-gray-300 bg-white"}`}>
              <span>{method.name}</span>
              <input type="radio" checked={formData.paymentMethod===method.id} onChange={()=>setFormData({...formData,paymentMethod:method.id})}/>
            </label>
          ))}
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="mt-6 px-6 py-3 bg-blue-900 text-white rounded-lg">CONFIRM ORDER</button>
        </form>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="max-w-3xl mx-auto p-10 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Thank You!</h2>
          <p className="text-gray-700 text-lg mb-6">Your order has been placed successfully.</p>
          <Link to={"/"} className="px-6 py-3 bg-blue-900 text-white rounded-lg">Place Another Order</Link>
        </div>
      )}
    </div>
  );
}
