import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");
      if (token && name) return { token, name };
      return null;
    } catch {
      return null;
    }
  });

  const login = (token, name) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
    } catch (err) {
      console.error("localStorage error:", err);
    }
    setUser({ token, name });
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    } catch (err) {
      console.error("localStorage error:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};