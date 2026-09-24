import React from "react"
import Link from "next/link"
import { FileText, Shield, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white shadow-xs">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                My<span className="text-red-500">PDF</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-4">
              A fast, modern, and free online PDF conversion toolkit that lets you seamlessly convert PDF documents to Word and vice versa with 100% precision.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero-Storage Guarantee: Files auto-purged post conversion</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3">
              Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#pdf-to-word" className="text-gray-600 hover:text-red-600 transition-colors">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link href="/#word-to-pdf" className="text-gray-600 hover:text-red-600 transition-colors">
                  Word to PDF
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-gray-600 hover:text-red-600 transition-colors">
                  Conversion History
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} MyPDF. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with high precision for seamless document workflows
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
