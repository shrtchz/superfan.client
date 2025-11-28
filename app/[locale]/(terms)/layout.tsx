import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "./components/Sidebar";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-white darkbg-black text-white flex flex-col">
      <Navbar />

      {/* Main Content - Takes up remaining space */}
      <main className="flex-1 w-full flex justify-center  ">
        <div className="w-[90%] grid gap-2 grid-cols-4">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-3 w-full">

            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
