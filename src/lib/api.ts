// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://af54-103-200-214-122.ngrok-free.app/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("access_token");
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   console.log("Authorization Header:", config.headers.Authorization);
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refresh_token");

//       try {
//         const response = await axios.post("http://localhost:3000/refresh", {
//           refresh_token: refreshToken,
//         });
//         localStorage.setItem("access_token", response.data.access_token);
//         localStorage.setItem("refresh_token", response.data.refresh_token);
//         originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh failed:", refreshError);
//         localStorage.clear();
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://af54-103-200-214-122.ngrok-free.app/", // Fallback if env not set
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (unchanged)
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log("Authorization Header:", config.headers.Authorization);
  return config;
});

// Response interceptor (unchanged)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {
            refresh_token: refreshToken,
          }
        );
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
