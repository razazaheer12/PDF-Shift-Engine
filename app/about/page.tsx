"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Moon,
  Sun,
  FileText,
  File,
  CheckCircle,
  Shield,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("mypdf-theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("mypdf-theme", newTheme ? "dark" : "light")
  }

  const renderNavigation = () => (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900/95 backdrop-blur-sm border-gray-700" : "bg-white/95 backdrop-blur-sm border-gray-200"
      } border-b`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-500 cursor-pointer">
            MyPDF
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-red-500 bg-red-900/20" : "text-red-500 bg-red-50"
              }`}
            >
              About
            </Link>
            <Link
              href="/privacy"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/history"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              History
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className={`rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-gray-600" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {renderNavigation()}

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div
            className={`rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                About <span className="text-red-500">MyPDF</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto px-4">
                Your trusted partner for seamless PDF and Word document conversions
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Our Mission</h2>
                <p className="text-lg opacity-80 leading-relaxed">
                  At MyPDF, we believe that document conversion should be simple, fast, and accessible to everyone. Our
                  mission is to provide a free, secure, and user-friendly platform that eliminates the barriers between
                  different document formats, empowering users to work more efficiently with their files.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">What We Offer</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div
                    className={`p-4 sm:p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} transition-all duration-300`}
                  >
                    <FileText className="w-6 sm:w-8 h-6 sm:h-8 text-red-500 mb-2 sm:mb-3" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">PDF to Word</h3>
                    <p className="text-sm sm:text-base opacity-80">
                      Convert your PDF documents to editable Word files with incredible accuracy, preserving formatting
                      and layout.
                    </p>
                  </div>
                  <div
                    className={`p-4 sm:p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} transition-all duration-300`}
                  >
                    <File className="w-6 sm:w-8 h-6 sm:h-8 text-red-500 mb-2 sm:mb-3" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Word to PDF</h3>
                    <p className="text-sm sm:text-base opacity-80">
                      Transform your Word documents into professional PDF files that maintain their original appearance
                      across all devices.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Why Choose MyPDF?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div
                      className={`w-12 sm:w-16 h-12 sm:h-16 rounded-full ${
                        isDarkMode ? "bg-red-900/20" : "bg-red-50"
                      } flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                    >
                      <CheckCircle className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">100% Free</h3>
                    <p className="text-sm sm:text-base opacity-80">No hidden fees, no subscriptions. Our service is completely free to use.</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`w-12 sm:w-16 h-12 sm:h-16 rounded-full ${
                        isDarkMode ? "bg-red-900/20" : "bg-red-50"
                      } flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                    >
                      <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Secure & Private</h3>
                    <p className="text-sm sm:text-base opacity-80">
                      Your files are processed securely and deleted automatically after conversion.
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`w-12 sm:w-16 h-12 sm:h-16 rounded-full ${
                        isDarkMode ? "bg-red-900/20" : "bg-red-50"
                      } flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                    >
                      <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Lightning Fast</h3>
                    <p className="text-sm sm:text-base opacity-80">Convert your documents in seconds with our optimized processing engine.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Our Team</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-6">
                  MyPDF is built by a passionate team of developers and designers who understand the importance of
                  seamless document workflows. We're committed to continuously improving our platform and adding new
                  features based on user feedback.
                </p>
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
                  >
                    Get in Touch
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`py-8 px-4 border-t transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">© 2025 MyPDF. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/about"
                className="text-sm opacity-70 hover:opacity-100 hover:text-red-500 transition-all duration-300"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-sm opacity-70 hover:opacity-100 hover:text-red-500 transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="text-sm opacity-70 hover:opacity-100 hover:text-red-500 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
