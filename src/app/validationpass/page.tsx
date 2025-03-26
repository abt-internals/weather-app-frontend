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
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }).optional(),
});

export default function ForgotPasswordForm() {
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
    if (!email) return;

    // Simulate sending email API call
    console.log("Sending OTP to", email);
    setEmailSent(true);
  };

  const onSubmit = (data: unknown) => {
    console.log("Form Submitted", data);
    alert("forgot password");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-4 rounded-lg border p-4 shadow-md"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!emailSent ? (
          <Button type="button" onClick={handleEmailSubmit} className="w-full">
            Send OTP
          </Button>
        ) : (
          <>
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
            <Link href="/forgotpassword">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </Link>
          </>
        )}
      </form>
    </Form>
  );
}
