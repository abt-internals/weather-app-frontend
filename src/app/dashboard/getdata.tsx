// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../lib/api";

// export default function Dashboard() {
//   const router = useRouter();
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         if (!token) {
//           console.error("No access token found");
//           router.push("/login");
//           return;
//         }
//         console.log("Requesting /dashboard with token:", token);
//         const response = await api.get("/dashboard", {
//           headers: {
//             // Accept: "application/json",
//             // "Content-Type": "application/json",
//             // "User-Agent": "axios/1.6.8",
//             // "X-Requested-With": "XMLHttpRequest",
//             "ngrok-skip-browser-warning": "true", // Important to bypass ngrok warning
//     "Accept": "application/json", // Ensure JSON response
//     "User-Agent": "MyCustomClient"

//           },
//         });
//         console.log("Response status:", response.status);
//         console.log("Response headers:", response.headers);
//         console.log("Response data:", response.data);
//         if (typeof response.data === "string" && response.data.startsWith("<!DOCTYPE html>")) {
//           throw new Error("Received HTML instead of JSON");
//         }
//         setData(response.data);
//       } catch (error) {
//         console.error("Error message:", error.message);
//         if (error.response) {
//           console.error("Response status:", error.response.status);
//           console.error("Response headers:", error.response.headers);
//           console.error("Response data:", error.response.data);
//         } else if (error.request) {
//           console.error("No response received:", error.request);
//         } else {
//           console.error("Request setup error:", error.message);
//         }
//         setError("Failed to load dashboard data.");
//       }
//     };
//     fetchDashboardData();
//   }, [router]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//       {error ? (
//         <p className="text-red-600">{error}</p>
//       ) : data ? (
//         <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }
"use client";

import type { AxiosError } from "axios"; // Import AxiosError for proper typing
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No access token found");
          router.push("/login");
          return;
        }
        console.log("Requesting /dashboard with token:", token);

        const response = await api.get("/dashboard", {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Accept: "application/json",
            "User-Agent": "MyCustomClient",
            Authorization: `Bearer ${token}`, // Ensure token is sent
          },
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        console.log("Response data:", response.data);

        if (
          typeof response.data === "string" &&
          response.data.startsWith("<!DOCTYPE html>")
        ) {
          throw new Error("Received HTML instead of JSON");
        }
        setData(response.data);
      } catch (err) {
        const error = err as AxiosError; // Explicitly cast error

        console.error("Error message:", error.message);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }

        setError("Failed to load dashboard data.");
      }
    };

    fetchDashboardData();
  }, [router]);

  return (
    <div className="p-6">
      <h2 className="mb-4 font-bold text-2xl">Dashboard</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : data ? (
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
