// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import api from "../../lib/api";

// export default function Search() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Initialize state with URL params or defaults
//   const [date, setDate] = useState(searchParams.get("d")?.replace(/\//g, "-") || "2025-03-28");
//   const [city, setCity] = useState(searchParams.get("city") || "Karad");
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchWeatherData = async (searchDate, searchCity) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         console.error("No access token found");
//         router.push("/login");
//         return;
//       }

//       // Format date as YYYY/MM/DD for the API
//       const formattedDate = searchDate.replace(/-/g, "/");
//       console.log("Fetching weather for:", { date: formattedDate, city: searchCity });

//       const response = await api.get("/search", {
//         params: { d: formattedDate, city: searchCity },
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//           Accept: "application/json",
//           "User-Agent": "MyCustomClient",
//         },
//       });

//       console.log("Response status:", response.status);
//       console.log("Response data:", response.data);
//       setWeatherData(response.data);
//       setError("");
//     } catch (err) {
//       console.error("Error fetching weather data:", err.message);
//       if (err.response) {
//         console.error("Response data:", err.response.data);
//       }
//       setError("Failed to load weather data.");
//       setWeatherData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data on mount or when URL params change
//   useEffect(() => {
//     const d = searchParams.get("d")?.replace(/\//g, "-") || date;
//     const c = searchParams.get("city") || city;
//     setDate(d);
//     setCity(c);
//     fetchWeatherData(d, c);
//   }, [searchParams]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Update URL with new query params and fetch data
//     const formattedDate = date.replace(/-/g, "/");
//     router.push(`/search?d=${formattedDate}&city=${city}`);
//     // No need to call fetchWeatherData here since useEffect will handle it
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Weather Search</h2>

//       {/* Search Form */}
//       <form onSubmit={handleSearch} className="mb-6 flex gap-4">
//         <div>
//           <label htmlFor="date" className="block text-sm font-medium">
//             Date
//           </label>
//           <input
//             type="date"
//             id="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mt-1 p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="city" className="block text-sm font-medium">
//             City
//           </label>
//           <input
//             type="text"
//             id="city"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="mt-1 p-2 border rounded"
//             placeholder="Enter city"
//           />
//         </div>
//         <button
//           type="submit"
//           className="mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </form>

//       {/* Display Results */}
//       {loading && <p>Loading...</p>}
//       {error && !loading && <p className="text-red-600">{error}</p>}
//       {weatherData && !loading && (
//         <div>
//           <h3 className="text-xl font-semibold">
//             {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
//           </h3>
//           <p className="text-gray-600">Local Time: {weatherData.location.localtime}</p>

//           {/* Current Weather */}
//           <div className="mt-4">
//             <h4 className="text-lg font-medium">Current Weather</h4>
//             <p>Temperature: {weatherData.current.temp_c}°C</p>
//             <p>Wind: {weatherData.current.wind_kph} kph {weatherData.current.wind_dir}</p>
//             <p>Humidity: {weatherData.current.humidity}%</p>
//             <p>UV Index: {weatherData.current.uv}</p>
//           </div>

//           {/* Forecast */}
//           <div className="mt-4">
//             <h4 className="text-lg font-medium">Forecast</h4>
//             {weatherData.forecast.forecastday.map((day) => (
//               <div key={day.date} className="border p-4 mt-2 rounded">
//                 <p className="font-semibold">{day.date}</p>
//                 <p>Max Temp: {day.day.maxtemp_c}°C</p>
//                 <p>Min Temp: {day.day.mintemp_c}°C</p>
//                 <p>Avg Humidity: {day.day.avghumidity}%</p>
//                 <p>Will it rain? {day.day.daily_will_it_rain ? "Yes" : "No"}</p>
//                 <p>Sunrise: {day.astro.sunrise}</p>
//                 <p>Sunset: {day.astro.sunset}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
