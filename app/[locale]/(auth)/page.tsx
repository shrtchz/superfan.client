"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

export default function HeroPage() {
  const t = useTranslations("Home")
  const params = useParams()
  const locale = params.locale as string
const router=useRouter();
    console.log(`[HeroPage] Locale changed to: ${locale}`)
    console.log(`[HeroPage] Translation:`, t("heroDescription"))


  return (
    <main className="flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl px-8 gap-16">
        {/* Left side - Character */}
        <div className="flex-shrink-0 flex items-center gap-12">
          <Image 
            src="/indian-old-skull-with-a-feather-svgrepo-com.svg" 
            alt="Character" 
            width={340} 
            height={340} 
          />
        </div>

        {/* Right side - Content */}
        <div className="flex-1 max-w-md">
          <h1 className="text-xl  text-black font-bold text-center leading-tight mb-8">
            {t("heroDescription")}
          </h1>

          <div className="flex flex-col gap-4">
            <button 
            onClick={
()=>router.push(`/${locale}/get-started`)
            }
            
            className="w-full bg-black border-2 cursor-pointer hover:bg-black/90 border-white text-white font-bold py-3 px-6 rounded transition-colors duration-200 uppercase rounded-full">
              {t("getStarted")}
            </button>

            <Link
              href={`/${locale}/sign-in`}
              className="w-full text-center border-2 border-black hover:bg-gray-200 rounded-full text-black font-bold py-3 px-6  transition-colors duration-200"
            >
              {t("alreadyHaveAccount")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}