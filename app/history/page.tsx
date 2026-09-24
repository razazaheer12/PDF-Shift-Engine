"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  History,
  Trash2,
  Download,
  X,
  Calendar,
  File,
  FileText,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useDownloadHistory, DownloadHistoryItem } from "@/lib/history"

export default function HistoryPage() {
  const { history: downloadHistory, removeItem, clearAll, isLoaded } = useDownloadHistory()
  const [notice, setNotice] = useState<string | null>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  const handleHistoryDownload = (item: DownloadHistoryItem) => {
    setNotice(
      `"${item.convertedFileName}" was downloaded directly to your device upon conversion. For your privacy and confidentiality, converted documents are purged from our servers automatically. To get a fresh copy, please re-upload your document on the Home page.`
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-10">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-8 border-b border-gray-100">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                  <History className="w-7 h-7 text-red-500" />
                  <span>Conversion History</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Track your recent document conversions in this browser session.
                </p>
              </div>

              {isLoaded && downloadHistory.length > 0 && (
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear History</span>
                </Button>
              )}
            </div>

            {/* Privacy notice banner */}
            {notice && (
              <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start justify-between gap-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{notice}</p>
                </div>
                <button
                  onClick={() => setNotice(null)}
                  className="text-blue-500 hover:text-blue-700 p-1 shrink-0"
                  aria-label="Dismiss notice"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* History list or empty state */}
            {!isLoaded ? (
              <div className="py-20 text-center text-gray-400 text-sm">
                Loading history...
              </div>
            ) : downloadHistory.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center">
                  <History className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No conversions yet</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
                  Convert a PDF to Word or Word to PDF to see your file history recorded here.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all text-sm"
                >
                  <span>Start Converting</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {downloadHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border border-gray-200/80 bg-gray-50/50 hover:bg-white hover:border-gray-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        {item.conversionType === "pdf-to-word" ? (
                          <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <File className="w-4 h-4" />
                          </div>
                        )}
                        <h4 className="text-base font-semibold text-gray-900 truncate">
                          {item.originalFileName}
                        </h4>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                            item.conversionType === "pdf-to-word"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.conversionType === "pdf-to-word" ? "PDF → DOCX" : "WORD → PDF"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatDate(item.conversionDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <File className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatFileSize(item.fileSize)}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600 font-medium">Output: {item.convertedFileName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <Button
                        onClick={() => handleHistoryDownload(item)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Info</span>
                      </Button>
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-600 hover:border-red-200"
                        title="Delete from history"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
