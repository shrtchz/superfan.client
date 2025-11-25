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
    <footer className="mb2 w-full border-t border-b h-[31px] flex items-center   py4">
           <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <div className="flex justify-between items-center w-full ">
          {/* Left side - Copyright */}
          <div className="text-sm  flex gap-1 h-max items-center text-gray-900 whitespace-nowrap pl-9 2xl:pl-8">
            © {currentYear} 
            <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
            <p className="uppercase">Superfan NG</p>
          </div>

          {/* Center - Social Media Icons */}
          {/* <div className="flex items-center space-x-3">
          
             <Link 
              href="https://facebook.com/your-profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-black transition-colors"
            >
           <div className="">
            <Image src={"/facebook-svgrepo-com.svg"} alt="fb" height={20} width={20}/>
           </div>
            </Link>
            <Link 
              href="https://x.com/your-profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-black transition-colors"
            >
             <FaXTwitter />
            </Link>
             <Link 
              href="https://wa.me/your-number" 
              target="_blank" 
              rel="noopener noreferrer"
              className=" text-green-700 transition-colors"
            >
                         <Image src={"/whatsapp-svgrepo-com (1).svg"} alt="fb" height={20} width={20}/>

            </Link>
            <Link 
              href="https://wa.me/your-number" 
              target="_blank" 
              rel="noopener noreferrer"
              className=" text-green-700 transition-colors"
            >
                         <Image src={"/instagram-svgrepo-com (2).svg"} alt="fb" height={20} width={20}/>

            </Link>
          </div> */}

          {/* Right side - Navigation Links */}
          <div className="flex items-center gap-2 text-sm text-gray-600 ">
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