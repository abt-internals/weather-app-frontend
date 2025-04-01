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

const newPasswordSchema = z
  .object({
    newPassword: z
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function NewPassword() {
  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: unknown) => {
    console.log("newPassword Data:", data);
    alert("New password created");
    router.push("/loginpage");
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="relative hidden w-full md:w-1/2 lg:flex">
        <Image
          src="/image.png"
          alt="Background Illustration"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-gray-900 p-6 text-white shadow-lg md:w-1/2">
        <h2 className="mb-6 text-center font-bold text-2xl text-teal-400 md:text-3xl">
          Create New Password
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full rounded-lg border p-2 text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full rounded-lg border p-2 text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
            >
              Create Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
