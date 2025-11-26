"use client"
import React from 'react'
import AINavbar from './AINavbar'
import { usePathname } from 'next/navigation'
import ShopNavbar from './ShopNav'
import PodcastNavbar from './PodcastNav'

const Header = () => {
    const location=usePathname()
    
  return (
    <div>
        {
            location.includes("opon")?
            <AINavbar/>
:
location.includes("opon")?<ShopNavbar/>:<PodcastNavbar/>
        }
    </div>
  )
}

export default Header