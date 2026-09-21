"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Moon,
  Sun,
  Mail,
  Clock,
  Info,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingContact(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmittingContact(false)
    setContactSubmitted(true)
    setContactForm({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setContactSubmitted(false), 5000)
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
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-red-500 bg-red-900/20" : "text-red-500 bg-red-50"
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Contact Us</h1>
              <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto px-4">
                Have a question or feedback? We'd love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-red-500">Send us a Message</h2>
                {contactSubmitted ? (
                  <div
                    className={`p-6 rounded-xl ${
                      isDarkMode ? "bg-green-900/20" : "bg-green-50"
                    } border border-green-500 text-center`}
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="opacity-80">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 focus:border-red-500"
                            : "bg-white border-gray-300 focus:border-red-500"
                        } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 focus:border-red-500"
                            : "bg-white border-gray-300 focus:border-red-500"
                        } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 focus:border-red-500"
                            : "bg-white border-gray-300 focus:border-red-500"
                        } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-300 resize-none ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 focus:border-red-500"
                            : "bg-white border-gray-300 focus:border-red-500"
                        } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                        placeholder="Tell us more about your inquiry or feedback..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmittingContact}
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmittingContact ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-red-500">Get in Touch</h2>
                <div className="space-y-6">
                  <div
                    className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} transition-all duration-300`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full ${
                          isDarkMode ? "bg-red-900/20" : "bg-red-50"
                        } flex items-center justify-center`}
                      >
                        <Mail className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Email Support</h3>
                        <p className="opacity-80">We typically respond within 24 hours</p>
                      </div>
                    </div>
                    <a
                      href="mailto:support@mypdf.com"
                      className="text-red-500 hover:text-red-600 transition-colors duration-300 font-medium"
                    >
                      support@mypdf.com
                    </a>
                  </div>

                  <div
                    className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} transition-all duration-300`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full ${
                          isDarkMode ? "bg-red-900/20" : "bg-red-50"
                        } flex items-center justify-center`}
                      >
                        <Clock className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Response Time</h3>
                        <p className="opacity-80">Monday - Friday, 9 AM - 6 PM EST</p>
                      </div>
                    </div>
                    <p className="opacity-80">We aim to respond to all inquiries within 24 hours during business days.</p>
                  </div>

                  <div
                    className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} transition-all duration-300`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full ${
                          isDarkMode ? "bg-red-900/20" : "bg-red-50"
                        } flex items-center justify-center`}
                      >
                        <Info className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Feedback & Suggestions</h3>
                        <p className="opacity-80">Help us improve MyPDF</p>
                      </div>
                    </div>
                    <p className="opacity-80">
                      We value your feedback and suggestions for new features. Your input helps us make MyPDF better for
                      everyone.
                    </p>
                  </div>
                </div>
              </div>
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
