"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const handleCountryChange = (value: string) => {
    setValue("country", value);
    const newStates = countryStateCity[value]
      ? Object.keys(countryStateCity[value])
      : [];
    setStates(newStates);
    setCities([]);
    setValue("state", "");
    setValue("city", "");
  };

  const handleStateChange = (value: string) => {
    setValue("state", value);
    const newCities =
      selectedCountry && countryStateCity[selectedCountry]?.[value]
        ? countryStateCity[selectedCountry][value]
        : [];
    setCities(newCities);
    setValue("city", "");
  };

  const handleGenderChange = (value: string) => {
    setValue("gender", value as "Male" | "Female" | "Other");
  };

  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };

  return (
    <Card className="mx-auto mt-10 max-w-lg rounded-lg bg-white p-6 shadow-md">
      <CardContent>
        <h2 className="mb-4 text-center font-semibold text-2xl">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input className="w-full" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label className="mb-2">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input className="w-full" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2">
                User Name <span className="text-red-500">*</span>
              </Label>
              <Input className="w-full" {...register("userName")} />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input className="w-full" {...register("mobile")} />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input className="w-full" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                className="w-full"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2">Date of Birth</Label>
              <Input className="w-full" type="date" {...register("dob")} />
            </div>

            <div>
              <Label className="mb-2">Gender</Label>
              <Select
                onValueChange={handleGenderChange}
                value={watch("gender")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2">Country</Label>
              <Select
                onValueChange={handleCountryChange}
                value={selectedCountry}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(countryStateCity).map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2">State</Label>
              <Select
                onValueChange={handleStateChange}
                value={selectedState}
                disabled={!states.length}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 ">City</Label>
              <Select
                onValueChange={(value) => setValue("city", value)}
                value={watch("city")}
                disabled={!cities.length}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2">
                Pincode <span className="text-red-500">*</span>
              </Label>
              <Input
                className="w-full"
                type="pincode"
                {...register("pincode")}
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm">{errors.pincode.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="mb-2">
              Temperary Address <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              type="message"
              {...register("temperaryAddress")}
            />
            {errors.temperaryAddress && (
              <p className="text-red-500 text-sm">
                {errors.temperaryAddress.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">
              Permanent Address <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              type="message"
              {...register("permanentAddress")}
            />
            {errors.permanentAddress && (
              <p className="text-red-500 text-sm">
                {errors.permanentAddress.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
