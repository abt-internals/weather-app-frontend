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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Schema Validation with zod
const schema = z.object({
  date_of_birth: z
    .string()
    .regex(
      /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
      "Format: YYYY/MM/DD"
    ),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  temp_address: z.string().min(5, "Permanent address is required"),
  perm_address: z.string().min(5, "Permanent address is required"),

  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode")
    .optional(),
});

export default function PersonalDetails() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date_of_birth: "",
      gender: undefined,
      temp_address: "",
      perm_address: "",

      country: "",
      state: "",
      city: "",
      pincode: "",
    },
  });
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [showLocationFields, setShowLocationFields] = useState(false);
  const [step1Data, setStep1Data] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("formStep1");
    if (savedData) {
      setStep1Data(JSON.parse(savedData));
    }
  }, []);

  const countryStateCity: Record<string, Record<string, string[]>> = {
    India: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    },
    USA: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Austin", "Dallas"],
    },
  };

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
    const selectedCountry = form.getValues("country");

    if (selectedCountry && countryStateCity[selectedCountry]) {
      const newCities = countryStateCity[selectedCountry][value] || [];
      setCities(newCities);
    } else {
      setCities([]);
    }

    form.setValue("city", "");
  };

  // Handle form submission
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onSubmit = async (data: any) => {
    const finalData = { ...step1Data, ...data };

    console.log("Final Registration Data:", JSON.stringify(finalData, null, 2));

    // Validate before sending
    const validationResult = schema.safeParse(finalData);
    if (!validationResult.success) {
      console.error("Validation Error:", validationResult.error);
      alert("Validation failed. Please check your inputs.");
      return;
    }

    try {
      await dataIntegrate(finalData);
      alert("Registration Completed");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  // Send data to API
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const dataIntegrate = async (formData: any) => {
    try {
      const response = await fetch(
        "https://812c-103-200-214-122.ngrok-free.app/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log("Server Response:", result);
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
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
                name="date_of_birth"
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
              name="temp_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temporary Address *</FormLabel>
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
              name="perm_address"
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
                <li className="text-white">
                  {" "}
                  Temperary Address <span className="text-red-500">*</span>
                </li>{" "}
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
