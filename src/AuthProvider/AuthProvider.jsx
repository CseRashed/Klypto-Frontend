import React, { createContext, useEffect, useState } from "react";
import auth from "../../public/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Firebase error to human-readable message
  const getFriendlyErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in.";
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      default:
        return error.message; // fallback
    }
  };

  // ✅ Register user
  const handleRegister = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: `Welcome, ${userCredential.user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login user
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);

      Swal.fire({
        icon: "success",
        title: "Login Successful ✅",
        text: `Welcome back, ${userCredential.user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout user
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      Swal.fire({
        icon: "success",
        title: "Logged Out 👋",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed ❌",
        text: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Real-time auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser.email)
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const info = { user, loading, handleRegister, handleLogin, handleLogout };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}
