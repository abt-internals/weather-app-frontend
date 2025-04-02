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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().regex(/^\w+@[\w]+\.\w{2,}$/, "Invalid email address"),
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const handleEmailSubmit = async () => {
    const email = form.getValues("email");

    // Check if email is valid before proceeding
    const emailValidation = forgotPasswordSchema.shape.email.safeParse(email);
    if (!emailValidation.success) {
      form.setError("email", { message: "Please enter a valid email" });
      return;
    }

    console.log("Sending OTP to", email);
    setEmailSent(true);
  };

  const onSubmit = (data: unknown) => {
    console.log("Form Submitted", data);
    alert("Forgot password");

    router.push("/forgotpassword");
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
      <div className=" flex-col items-center justify-center bg-gray-900 p-10 text-white shadow-lg lg:w-1/2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-60 max-w-md space-y-4 rounded-lg border p-4 shadow-md "
          >
            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!emailSent ? (
              <Button
                type="button"
                onClick={handleEmailSubmit}
                className="item-center flex bg-blue-500 hover:bg-sky-700"
              >
                Send OTP
              </Button>
            ) : (
              <>
                {/* OTP Input */}
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter OTP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter OTP sent to your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-950 hover:bg-sky-700"
                  disabled={!form.watch("otp")}
                >
                  Submit
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
