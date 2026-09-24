import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MyPDF Free Online Toolkit",
  description: "Convert PDF to Word or Word to PDF in secs. Fast, secure, & 100% free.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_API_KEY}`}
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen antialiased`}>{children}</body>
    </html>
  )
}
