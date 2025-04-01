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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  userName: z
    .string()
    .min(2, "user name is required")
    .regex(
      /^[\w.]{1,30}$/,
      "Username should contain no special characters except '_' and '.'"
    ),
  mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),

  email: z.string().regex(/^\w+@[\w]+\.\w{2,}$/, "Invalid email address"),
  password: z
    .string()
    .min(8, "Password should have at least 8 characters")
    .superRefine((value, ctx) => {
      if (!/[A-Z]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain an uppercase letter",
        });
      }
      if (!/[a-z]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain a lowercase letter",
        });
      }
      if (!/[0-9]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain a number",
        });
      }
      if (!/[@$!%*?&]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain a special character",
        });
      }
    }),
});

export default function Register() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      mobile: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: unknown) => {
    console.log(data);
    router.push("/personaldetail");
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
          Registration Form
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Join us and explore amazing features!
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email"
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
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-lg bg-teal-500 py-2 font-semibold text-lg hover:bg-teal-600"
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
