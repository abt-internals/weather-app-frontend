import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-center bg-cover">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-300 p-4 text-white shadow-md">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Weather App Logo"
            width={90}
            height={40}
          />
          <h1 className="font-bold text-4xl text-neutral-900">Weather App</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/loginpage">
            <Button variant="outline" className="border-white text-black">
              Login
            </Button>
          </Link>
          <Link href="/registration">
            <Button className="bg-white text-blue-600">Register</Button>
          </Link>
        </div>
      </header>

      {/* Content Section */}
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-center bg-cover p-4"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <h2 className="bg-black p-2 font-bold text-4xl text-white shadow-md">
          Welcome to Weather App
        </h2>
        <p className="mt-2 bg-black p-1 text-lg text-sky-400">
          Get real-time weather updates with ease.
        </p>
      </main>
    </div>
  );
}
