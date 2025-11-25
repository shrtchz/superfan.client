import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <div className="h-screen bg-white darkbg-black text-white flex flex-col">
          <Navbar />
          
          {/* Main Content - Takes up remaining space */}
          <main className="flex-1 w-full flex  items-center  justify-center mt-1">

            {children}
          </main>
          
          <Footer />
        </div>
  );
}