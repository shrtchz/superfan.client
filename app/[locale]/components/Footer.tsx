/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
// import { MessageCircle, Twitter, Facebook } from "lucide-react";
// import {FaWhatsappSquare} from "react-icons/fa";
import {  FaXTwitter} from "react-icons/fa6";
export function Footer() {
  const currentYear = new Date().getFullYear();
  const params=useParams();
  const locale=params.locale;


  return (
    <footer className=" w-full border-t border-gray-300 border-b h-[31px] flex items-center justify-center py4">
           <div className=" w-[90%]  py-4 flex ">

        <div className="px-1 grid  grid-cols-4 w-full ">
        <div className="pl-7 col-span-1 text-sm  flex gap-1 h-max items-center text-gray-900 whitespace-nowrap ">
            © {currentYear} 
            <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
            <p className="uppercase">Superfan NG</p>
          </div>
<div className="col-span-2"></div>
          {/* Right side - Navigation Links */}
          <div className="flex justify-end -span-1 flex gap-1 text-sm text-gray-600 ">
            <Link 
              href={`/${locale}/about`} 
              className="font-medium text-gray-900 transition-colors whitespace-nowrap"
            >
              About
            </Link>
            <Link 
              href={`/${locale}/terms-condition`} 
              className="font-medium text-gray-900 transition-colors whitespace-nowrap"
            >
              Terms of Use
            </Link>
            <Link 
              href={`/${locale}/privacy`}
              className="font-medium text-gray-900 transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className="font-medium text-gray-900 transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}