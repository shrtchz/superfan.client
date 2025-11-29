"use client"
import React from 'react'
import AINavbar from './AINavbar'
import { usePathname } from 'next/navigation'
import ShopNavbar from './ShopNav'
import PodcastNavbar from './PodcastNav'

const Header = () => {
    const location=usePathname()
    
  return (
    <div className='w-full h-max'>
        {
            location.includes("opon")?
            <AINavbar/>
:
location.includes("shop")?<ShopNavbar/>:<PodcastNavbar/>
        }
    </div>
  )
}

export default Header