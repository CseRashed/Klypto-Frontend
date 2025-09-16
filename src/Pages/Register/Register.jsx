import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
 // ✅ apnar useAuth hook er path thik kore den

const Register = () => {
  const { handleRegister, handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Generate background particles
  useEffect(() => {
    const p = Array.from({ length: 20 }, () => ({
      size: Math.random() * 20 + 10,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      color: ["#7F5AF0", "#3B82F6", "#EC4899"][Math.floor(Math.random() * 3)],
    }));
    setParticles(p);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password } = form;
    if (password.length < 6) {
      return Swal.fire("Error!", "Password must be at least 6 characters", "error");
    }

    handleRegister(name,email, password)
    
    
  }
  // Handle Google Sign-in
  const handleGoogle = async () => {
    try {
      await handleGoogleSignIn();
      Swal.fire("Success!", "Logged in with Google", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 overflow-hidden">
      {/* Background particles */}
      {particles.map((p, index) => (
        <div
          key={index}
          className="absolute rounded-full opacity-40 animate-bounce"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        ></div>
      ))}

      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md sm:max-w-lg md:max-w-md bg-white/10 backdrop-blur-3xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-2">
          Create an Account
        </h2>
        <p className="text-center text-gray-300 mb-6 sm:mb-8">
          Join us and start your journey
        </p>

        {/* Form */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative group">
            <FaUser className="absolute top-3 left-3 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-gray-400/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-gray-400/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <FaLock className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-gray-400/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              required
            />
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Register Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-300"
            type="submit"
          >
            Register
          </motion.button>
        </form>

        {/* Google Register */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogle}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-gray-800 py-2.5 sm:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          <FcGoogle className="text-xl" />
          Register with Google
        </motion.button>

        {/* Login Link */}
        <p className="mt-4 sm:mt-6 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link
            className="text-purple-300 hover:underline font-semibold"
            to="/login"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
