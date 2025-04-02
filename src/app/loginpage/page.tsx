// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import api from "../../lib/api";
// import { useRouter } from "next/navigation";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export default function LoginForm() {
//   const router = useRouter();
//   const form = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // const onSubmit = async (data) => {
//   //   try {
//   //     const response = await api.post("/login", {
//   //       : data.email,
//   //       password: data.password,
//   //     });
//   //     localStorage.setItem("access_token", response.data.access_token);
//   //     localStorage.setItem("refresh_token", response.data.refresh_token);
//   //     console.log("Login successful, tokens stored:", response.data);
//   //     router.push("/dashboard");
//   //   } catch (error) {
//   //     if (error.response) {
//   //       console.error("Login failed:", error.response.status, error.response.data);
//   //       form.setError("root", {
//   //         type: "manual",
//   //         message: error.response.data?.message || "Login failed. Please check your credentials.",
//   //       });
//   //     } else {
//   //       console.error("Network error:", error.message);
//   //       form.setError("root", {
//   //         type: "manual",
//   //         message: "Network error. Please check your connection or server status.",
//   //       });
//   //     }
//   //   }
//   // };
//   const onSubmit = async (data: { email: string | Blob; password: string | Blob; }) => {
//     try {
//       const formData = new FormData();
//       formData.append("username", data.email);
//       formData.append("password", data.password);

//       const response = await api.post("/login", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       localStorage.setItem("access_token", response.data.access_token);
//       localStorage.setItem("refresh_token", response.data.refresh_token);
//       console.log("Login successful, tokens stored:", response.data);
//       router.push("/dashboard");
//       // window.location.href = "https://0aee-2401-4900-7c75-17f1-6c98-3d8c-e2f7-ebf7.ngrok-free.app/dashboard";
//     } catch (error) {
//       console.error("Login failed:", error);
//       form.setError("root", {
//         type: "manual",
//         message: error.response?.data?.message || "Login failed.",
//       });
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
//         <h2 className="mb-4 text-center font-semibold text-2xl">Login</h2>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Enter your email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Enter your password"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {form.formState.errors.root && (
//               <p className="text-red-600 text-sm">
//                 {form.formState.errors.root.message}
//               </p>
//             )}
//             <div className="text-right">
//               <Link
//                 href="/validationpass"
//                 className="text-blue-600 text-sm hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//           </form>
//         </Form>
//         <p className="mt-4 text-center text-sm">
//           Don't have an account?{" "}
//           <Link
//             href="/registrationform"
//             className="text-blue-600 hover:underline"
//           >
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "../../lib/api";

import type { AxiosError } from "axios"; // Import AxiosError for proper error typing

// Define validation schema using Zod
const loginSchema = z.object({
  email: z.string().regex(/^\w+@[\w]+\.\w{2,}$/, "Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define TypeScript types for form data
type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {

  const router = useRouter();
  const form = useForm<LoginFormValues>({

    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();


  const onSubmit = async (data: LoginFormValues) => {
    try {
      const formData = new FormData();
      formData.append("username", data.email);
      formData.append("password", data.password);
      console.log("Login Data:", data);
    alert("Login successful");
    router.push("/dashboard");

      const response = await api.post("/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      console.log("Login successful, tokens stored:", response.data);

      router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("Login failed:", error);

      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";

      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="relative hidden w-1/2 lg:flex">
        <Image
          src="/image.png"
          alt="Background Illustration"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-gray-900 p-10 text-white shadow-lg lg:w-1/2">
        <h2 className="mb-6 text-center font-bold text-3xl text-teal-400">
          Login Form
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Welcome to whether Application!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.root.message}
              </p>
            )}
            <div className="text-right">
              <Link
                href="/validationpass"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-sky-700 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/registration" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
