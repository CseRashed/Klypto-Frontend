import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider"; // ✅ path thik kore den


const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
