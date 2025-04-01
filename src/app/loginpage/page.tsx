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
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().regex(/^\w+@[\w]+\.\w{2,}$/, "Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = (data: unknown) => {
    console.log("Login Data:", data);
    alert("Login successful");
    router.push("/dashboard");
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
