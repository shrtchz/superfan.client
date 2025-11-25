import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import "../globals.css"
import { Rubik } from "next/font/google"
import { ThemeProvider } from "./components/theme-provider"
export type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: "Superfan - The fun way to test indigenous IQ.",
  description: "The fun way to test indigenous knowledge, aptitude and reasoning.",
}
// Configure Rubik font
const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
})



export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
 
  
  // Provide messages for the specific locale
  const messages = await getMessages({locale});

  return (
    <html lang={locale} className={rubik.variable}>
      <body className="bg-white">
      {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}