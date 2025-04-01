"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  dob: z
    .string()
    .regex(
      /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
      "Invalid Format !!! Date Should be in format YYYY/MM/DD. Month Should be below 12 and Date should be below 31"
    ),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z
    .string()
    .min(6)
    .max(6)
    .regex(/^[0-9]+$/),
  permanentAddress: z.string().min(5, "Permanent address is required"),
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
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dob: "",
      gender: undefined,
      country: "",
      state: "",
      city: "",
      pincode: "",
      permanentAddress: "",
    },
  });

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [showLocationFields, setShowLocationFields] = useState(false);
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

  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
    alert("registration completed");
  };

  return (
    <div className="flex min-h-screen">
      {/* Right Section */}
      <div className="flex w-full flex-col items-center justify-center bg-gray-900 p-10 text-white shadow-lg lg:w-1/2">
        <h2 className="mb-6 font-semibold text-2xl">Personal Detail</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Birth<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="YYYY/MM/DD" {...field} />
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
                    <FormLabel>
                      Gender<span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                      placeholder=" eg. A/P.Karad tal-karad dist-satara 415110 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="toggleLocation"
                className="border-red-800"
                checked={showLocationFields}
                onCheckedChange={() =>
                  setShowLocationFields(!showLocationFields)
                }
              />
              <label
                htmlFor="toggleLocation"
                className="font-medium text-black text-sm underline decoration-red-800"
              >
                <ul className="text-white"> Temperary Address</ul>{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {showLocationFields && (
              <>
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
                        <FormMessage />
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
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600"
            >
              Registration
            </Button>
          </form>
        </Form>
      </div>

      {/* Left Section */}
      <div className="relative flex w-1/2 items-center justify-center bg-gray-100 p-10">
        <Image
          src="/image.png"
          alt="Whether Illustration"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
