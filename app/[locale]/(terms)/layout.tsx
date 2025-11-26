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
      <main className="flex-1 w-full flex   mt-1">
        <div className="container mx-auto px-14 py-4 flex justifybetween">
            <div className="w-40">

          <Sidebar />
            </div>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
