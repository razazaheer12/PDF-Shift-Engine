import React from "react"
import Link from "next/link"
import { FileText, File, CheckCircle, Shield, Clock, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 bg-slate-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="text-center mb-10 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                About <span className="text-red-500">MyPDF</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Your trusted partner for high-precision, lightning-fast PDF and Word document conversions.
              </p>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-red-500">Our Mission</h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  At MyPDF, we believe that document conversion should be effortless, secure, and accessible to everyone. Our
                  mission is to provide a free, reliable, and user-friendly platform that eliminates formatting barriers between
                  different document standards, empowering students, professionals, and teams to work without friction.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-500">What We Offer</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/70 hover:border-red-200 transition-colors">
                    <FileText className="w-7 h-7 text-red-500 mb-3" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">PDF to Word</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Convert PDF files into fully editable Microsoft Word documents with exact formatting and table preservation.
                    </p>
                  </div>
                  <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/70 hover:border-blue-200 transition-colors">
                    <File className="w-7 h-7 text-blue-600 mb-3" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Word to PDF</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Transform Word files (DOC and DOCX) into clean, standard PDF files that look identical across all screens and printers.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-red-500">Why Choose MyPDF?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-red-100/80 text-red-600 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1.5">100% Free</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      No hidden fees, no subscriptions, and no credit card required.
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1.5">Secure & Private</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Files are processed via TLS and purged from conversion servers immediately.
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1.5">Lightning Fast</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Conversions happen in seconds thanks to our optimized CloudConvert engine.
                    </p>
                  </div>
                </div>
              </section>

              <section className="pt-4 border-t border-gray-100 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Have Questions or Suggestions?</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-6">
                  We are constantly refining the MyPDF platform to deliver the best document conversion experience.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-7 py-3 rounded-xl shadow-sm hover:shadow transition-all text-sm"
                >
                  <span>Get in Touch with Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
