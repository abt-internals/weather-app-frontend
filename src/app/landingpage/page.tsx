"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center bg-blue-500 px-10 text-white">
      {/* Text Content */}
      <div className="ml-10 max-w-2xl">
        <h1 className="mt-32 font-semibold text-5xl text-white4 leading-tight">
          <p className="text-neutral-300 text-sm"> GLOBALPEDIA</p>
          Let our <span className="text-sky-400">world</span> of
          <br /> knowledge be your <br /> trusted guide.
        </h1>
        <p className="mt-4 text-sm opacity-90 ">
          Globalpedia is your go-to guide with the latest labor laws, norms, and{" "}
          <br /> regulations. Whether you’re hiring a single person or growing
          your <br /> global workforce, you’ll know what to expect.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mt-6 ml-10 w-full max-w-lg">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full border-sky-300 border-b bg-transparent py-2 text-lg text-sky-900 focus:outline-none"
        />
        <span className="absolute top-2 right-3 text-sky-400 text-xl">
          {" "}
          <Search />
        </span>
      </div>

      {/* Earth Image */}
      <div className="absolute top-1/6 right-20 ml-10 max-w-sm">
        <Image
          src="/earth.png"
          alt="Globe"
          width={300}
          height={300}
          className="opacity-100"
        />
      </div>

      {/* Content Cards */}
      <div className="mt-25 flex gap-6 ">
        <Card className="h-60 w-60 bg-gradient-to-br from-purple-500 to-pink-500">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Image
              src="/usa.png"
              alt="USA"
              width={400}
              height={400}
              className="rounded-md"
            />
            <p className="mt-4 text-center font-medium">
              United States of America
            </p>
          </CardContent>
        </Card>
        <Card className="h-60 w-60 bg-gradient-to-br from-orange-500 to-red-500">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Image
              src="/user.png"
              alt="User"
              width={300}
              height={300}
              className="rounded-md"
            />
            <p className="mt-4 text-center font-medium">Globalpedia User</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
