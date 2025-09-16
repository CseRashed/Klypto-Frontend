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

// ✅ Register user + save to DB with human-readable error messages
const handleRegister = async (name,email, password) => {
  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = userCredential.user;
    setUser(newUser);

    // 🔥 Save user info to database (only for new users)
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email: newUser.email,
        createdAt: new Date().toISOString(),
      }),
    });

    Swal.fire({
      icon: "success",
      title: "Registration Successful 🎉",
      text: `Welcome, ${newUser.email}`,
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error("❌ Firebase or backend error:", err);

    let errorMsg = "Registration failed!";
    if (err.code === "auth/email-already-in-use") {
      errorMsg = "This email is already registered.";
    } else if (err.code === "auth/invalid-email") {
      errorMsg = "Invalid email address.";
    } else if (err.code === "auth/weak-password") {
      errorMsg = "Password should be at least 6 characters.";
    } else if (err.message) {
      errorMsg = err.message;
    }

    Swal.fire("Error", errorMsg, "error");
  } finally {
    setLoading(false);
  }
};

// ✅ Login user (only Firebase check, no DB save)
const handleLogin = async (email, password) => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);

    Swal.fire({
      icon: "success",
      title: "Login Successful ✅",
      text: `Welcome back, ${userCredential.user.email}`,
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error("❌ Login failed:", err);

    // 🔹 Human-readable error messages
    let errorMsg = "Login failed!";
    if (err.code === "auth/user-not-found") {
      errorMsg = "No account found with this email.";
    } else if (err.code === "auth/wrong-password") {
      errorMsg = "Incorrect password.";
    } else if (err.code === "auth/invalid-email") {
      errorMsg = "Invalid email format.";
    } else {
      errorMsg = "Email or Password is incorrect.";
    }

    Swal.fire("Login Failed ❌", errorMsg, "error");
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
     
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Real-time auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const info = { user, loading, handleRegister, handleLogin, handleLogout };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}
