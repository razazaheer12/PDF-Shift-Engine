import React from "react"
import Link from "next/link"
import { Shield, Lock, FileCheck, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 bg-slate-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="text-center mb-10 md:mb-12">
              <div className="w-12 h-12 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                Your privacy is paramount. Discover how MyPDF protects your files, data, and rights.
              </p>
            </div>

            <div className="space-y-8 text-left text-gray-700">
              <section className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900">
                <div className="flex items-center gap-2 mb-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Zero-Storage Guarantee</span>
                </div>
                <p className="text-sm leading-relaxed">
                  We do not permanently store or analyze your documents. Files uploaded to MyPDF are streamed through TLS-encrypted channels, converted via CloudConvert API v2, and purged immediately after download.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-red-500 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  <span>Data Collection & Processing</span>
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  MyPDF is built with privacy-first engineering:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                  <li><strong>Document Content:</strong> Only held temporarily during server conversion, then deleted automatically.</li>
                  <li><strong>Local Storage:</strong> Conversion history is saved exclusively on your local device browser. We never track your file names on external servers.</li>
                  <li><strong>Support Messages:</strong> If you submit a contact inquiry, your email is used solely to respond to your request.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-red-500 flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  <span>Security Infrastructure</span>
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  Our system incorporates industry-standard security safeguards:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                  <li>All transfers between your browser and our backend use HTTPS/TLS 1.3 encryption.</li>
                  <li>Automated memory garbage collection releases buffer memory immediately upon stream completion.</li>
                  <li>No unauthorized third-party trackers or marketing cookies are embedded in the conversion flow.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-red-500">Your Rights & Control</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  You retain full ownership of all documents you convert. You can clear your local conversion history at any time with a single click in the <Link href="/history" className="text-red-500 underline font-medium">History</Link> page, or by clearing your browser cache.
                </p>
              </section>

              <section className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-500">
                <p>
                  <strong>Effective Date:</strong> January 2025 (Updated for PDF-Shift-Engine CloudConvert v2)
                </p>
                <Link
                  href="/contact"
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  Contact Privacy Team →
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
