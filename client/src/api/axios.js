import axios from "axios";

const API = axios.create({
  baseURL: "https://hiretrack-backend-rumx.onrender.com/api",
});

API.interceptors.request.use(
  (req) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Token read error:", err);
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;