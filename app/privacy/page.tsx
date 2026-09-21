"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              About
            </Link>
            <Link
              href="/privacy"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-red-500 bg-red-900/20" : "text-red-500 bg-red-50"
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Privacy Policy</h1>
              <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto px-4">
                Your privacy is our priority. Learn how we protect your data and respect your rights.
              </p>
            </div>

            <div className="space-y-8 text-left">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Data Collection</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-4">
                  MyPDF is designed with privacy in mind. We collect minimal data to provide our services:
                </p>
                <ul className="list-disc list-inside space-y-2 opacity-80">
                  <li>Files you upload for conversion (temporarily processed and automatically deleted)</li>
                  <li>Basic usage analytics to improve our service (anonymized)</li>
                  <li>Contact information when you reach out to us (only if you choose to provide it)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">How We Use Your Data</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-4">We use your information solely to:</p>
                <ul className="list-disc list-inside space-y-2 opacity-80">
                  <li>Process your file conversions</li>
                  <li>Improve our service quality and performance</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Ensure the security and integrity of our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">File Security</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-4">
                  Your files are our responsibility while they're in our system:
                </p>
                <ul className="list-disc list-inside space-y-2 opacity-80">
                  <li>All file uploads are encrypted during transmission</li>
                  <li>Files are processed in a secure, isolated environment</li>
                  <li>Converted files are automatically deleted within 24 hours</li>
                  <li>We never store, share, or access the content of your files</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Your Rights</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 opacity-80">
                  <li>Request information about data we may have collected</li>
                  <li>Ask for deletion of any personal information</li>
                  <li>Opt out of analytics tracking</li>
                  <li>Contact us with any privacy concerns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Cookies and Tracking</h2>
                <p className="text-lg opacity-80 leading-relaxed">
                  We use minimal cookies and local storage to enhance your experience, such as remembering your theme
                  preference and download history. These are stored locally on your device and can be cleared at any time
                  through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Third-Party Services</h2>
                <p className="text-lg opacity-80 leading-relaxed">
                  MyPDF does not share your data with third-party services for marketing or advertising purposes. We may
                  use trusted service providers for essential functions like hosting and security, all of whom are bound
                  by strict data protection agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Contact Us</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please don't hesitate to
                  contact us:
                </p>
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
                  >
                    Contact Us
                  </Link>
                </div>
              </section>

              <section className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <p className="text-sm opacity-70">
                  <strong>Last updated:</strong> January 2025
                  <br />
                  This Privacy Policy may be updated from time to time. We will notify users of any significant changes.
                </p>
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
