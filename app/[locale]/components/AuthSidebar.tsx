"use client";

import HomeIcon from "@/public/icons/HomeIcon";
import OponIcon from "@/public/icons/OponIcon";
import PodcastIcon from "@/public/icons/PodcastIcon";
import ShopIcon from "@/public/icons/ShopIcon";
import Link from "next/link";
import { useParams ,useRouter} from "next/navigation";
// import {  } from "next/router";
import React from "react";

const links = [
    {
        icon: <HomeIcon />,
        name: "Home",
        href: "/dashboard"
    },
    {
        icon: <OponIcon />,
        name: "Opon.ai",
        href: "/opon"
    },
    {
        icon: <ShopIcon />,
        name: "Shop",
        href: "/shop"
    },
    {
        icon: <PodcastIcon />,
        name: "Podcast",
        href: "/podcast"
    }
];

const AuthSidebar = () => {
    const params = useParams();
    const locale = params.locale as string;
    const router=useRouter()
    return (
        <div className=" w-40  translate-x-8 text-black">
            <div className="gap-2 flex flex-col">
                {links.map((link, id) => {
                    return (
                        <Link href={`/${locale}${link.href}`} key={id}>
                            <div className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded">
                                <div className="h-6 w-6">
                                    {link.icon}
                                </div>
                                <p>{link.name}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="mt-4 w-full ">
                        <button onClick={()=>router.push(`/${locale}/dashboard`)} className="hover:bg-black hover:text-white border rounded-full h-10 w-full flex justify-center items-center bg-transparent" >
                    Start a Test
                        </button>

            </div>
        </div>
    );
};

export default AuthSidebar;