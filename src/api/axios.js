



// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // ✅ Change port if your backend runs on another
//   withCredentials: true,
// });

// // ✅ Attach JWT token automatically if present
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;





// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", 
//   withCredentials: true,
// });

// // ✅ Attach JWT token automatically if present
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;



import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // automatically picks local or production
  withCredentials: true, // sends cookies / JWT if needed
});

// ✅ Attach JWT token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
