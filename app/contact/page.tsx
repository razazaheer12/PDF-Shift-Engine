"use client"

import React, { useState } from "react"
import {
  Mail,
  Clock,
  Info,
  CheckCircle,
  Loader2,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingContact(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmittingContact(false)
    setContactSubmitted(true)
    setContactForm({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setContactSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 bg-slate-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="text-center mb-10 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                Contact <span className="text-red-500">Us</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                Have a question, feedback, or feature request? We would love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900">Send us a Message</h2>
                {contactSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-emerald-800 mb-1">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-700">
                      Thank you for reaching out. We will review your message and reply within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                        placeholder="Inquiry regarding document conversion"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors resize-none"
                        placeholder="Please describe your question or suggestion in detail..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmittingContact}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow transition-all text-sm disabled:opacity-60"
                    >
                      {isSubmittingContact ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Information Cards */}
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900">Direct Support</h2>
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-gray-50 border border-gray-200/70">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-red-100/80 text-red-600 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Email Inquiries</h3>
                        <p className="text-xs text-gray-500">Fast response within 24 hours</p>
                      </div>
                    </div>
                    <a
                      href="mailto:support@mypdf.com"
                      className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      support@mypdf.com
                    </a>
                  </div>

                  <div className="p-5 rounded-xl bg-gray-50 border border-gray-200/70">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-100/80 text-blue-600 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Support Hours</h3>
                        <p className="text-xs text-gray-500">Mon - Fri, 9:00 AM - 6:00 PM EST</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Our engineering and support team reviews user inquiries on all business days.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-gray-50 border border-gray-200/70">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Feature Requests</h3>
                        <p className="text-xs text-gray-500">Built for the community</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Need support for additional file formats or bulk conversions? Let us know!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
