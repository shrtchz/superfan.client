"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'

const Sidebar = () => {
    const params=useParams();
      const locale=params.locale;
  return (
    <div className=' flex w-40'>
        <div className=" gap-2 text- flex flex-col">
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
  )
}

export default Sidebar