"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Moon,
  Sun,
  History,
  Trash2,
  Download,
  X,
  Calendar,
  File,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface DownloadHistoryItem {
  id: string
  originalFileName: string
  convertedFileName: string
  conversionType: "pdf-to-word" | "word-to-pdf"
  conversionDate: Date
  fileSize: number
  downloadCount: number
}

export default function HistoryPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([])

  useEffect(() => {
    const savedTheme = localStorage.getItem("mypdf-theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }

    const savedHistory = localStorage.getItem("mypdf-download-history")
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        conversionDate: new Date(item.conversionDate),
      }))
      setDownloadHistory(parsedHistory)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("mypdf-theme", newTheme ? "dark" : "light")
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const [notice, setNotice] = useState<string | null>(null)

  const handleHistoryDownload = (item: DownloadHistoryItem) => {
    setNotice(
      `"${item.convertedFileName}" was downloaded directly to your device upon conversion. For your privacy and security, converted files are automatically purged from our servers. If you need a new copy, please re-upload the original file on the Home page.`
    )
  }

  const clearDownloadHistory = () => {
    setDownloadHistory([])
    localStorage.removeItem("mypdf-download-history")
  }

  const removeHistoryItem = (id: string) => {
    setDownloadHistory((prev) => prev.filter((item) => item.id !== id))
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
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/history"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-red-500 bg-red-900/20" : "text-red-500 bg-red-50"
              }`}
            >
              History ({downloadHistory.length})
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
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div
            className={`rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Download History</h1>
                <p className="text-xl opacity-80">
                  View and re-download your converted files ({downloadHistory.length} total conversions)
                </p>
              </div>
              {downloadHistory.length > 0 && (
                <Button
                  onClick={clearDownloadHistory}
                  variant="outline"
                  className="mt-4 md:mt-0 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </Button>
              )}
            </div>

            {notice && (
              <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 flex items-start justify-between gap-4">
                <p className="text-sm leading-relaxed">{notice}</p>
                <button
                  onClick={() => setNotice(null)}
                  className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-200 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {downloadHistory.length === 0 ? (
              <div className="text-center py-16">
                <History className="w-24 h-24 mx-auto mb-6 opacity-30" />
                <h3 className="text-2xl font-semibold mb-4 opacity-70">No conversions yet</h3>
                <p className="text-lg opacity-60 mb-8">
                  Start converting your files to see them appear in your download history.
                </p>
                <Link
                  href="/"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
                >
                  Start Converting
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {downloadHistory.map((item) => (
                  <div
                    key={item.id}
                    className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {item.conversionType === "pdf-to-word" ? (
                            <FileText className="w-5 h-5 text-red-500" />
                          ) : (
                            <File className="w-5 h-5 text-red-500" />
                          )}
                          <h3 className="text-lg font-semibold">{item.originalFileName}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.conversionType === "pdf-to-word"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            }`}
                          >
                            {item.conversionType === "pdf-to-word" ? "PDF → WORD" : "WORD → PDF"}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm opacity-70">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.conversionDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <File className="w-4 h-4" />
                            {formatFileSize(item.fileSize)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Downloaded {item.downloadCount} time{item.downloadCount !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => handleHistoryDownload(item)}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <Button
                          onClick={() => removeHistoryItem(item.id)}
                          variant="outline"
                          size="icon"
                          className="text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
