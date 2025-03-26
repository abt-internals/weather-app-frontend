"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  userName: z.string().min(2, "user name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
  dob: z.string(),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().max(6, "Pincode is required"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  temperaryAddress: z.string().min(5, "Temperary address is required"),
});

const countryStateCity: Record<string, Record<string, string[]>> = {
  India: {
    Maharashtra: ["Mumbai", "Pune", "Satara"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco", "San Diego"],
    Texas: ["Houston", "Austin", "Dallas"],
  },
};

export default function RegistrationForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      mobile: "",
      dob: "",
      gender: undefined,
      country: "",
      state: "",
      city: "",
      pincode: "",
      permanentAddress: "",
      temperaryAddress: "",
    },
  });

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const selectedCountry = form.watch("country");

  const handleCountryChange = (value: string) => {
    form.setValue("country", value);
    const newStates = countryStateCity[value]
      ? Object.keys(countryStateCity[value])
      : [];
    setStates(newStates);
    setCities([]);
    form.setValue("state", "");
    form.setValue("city", "");
  };

  const handleStateChange = (value: string) => {
    form.setValue("state", value);
    const newCities =
      selectedCountry && countryStateCity[selectedCountry]?.[value]
        ? countryStateCity[selectedCountry][value]
        : [];
    setCities(newCities);
    form.setValue("city", "");
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                      <FormLabel>
                        User Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>
                        Mobile Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleCountryChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(countryStateCity).map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleStateChange(value);
                        }}
                        value={field.value}
                        disabled={!states.length}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!cities.length}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Pincode <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="pincode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="temperaryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Temperary Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full rounded-md border-2 border-stone-200 p-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permanentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Permanent Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full rounded-md border-2 border-stone-200 p-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
