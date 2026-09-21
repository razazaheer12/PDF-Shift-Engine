"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import {
  Moon,
  Sun,
  HardDrive,
  Cloud,
  FileText,
  File,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Loader2,
  History,
  Menu,
  Home,
  Info,
  Shield,
  Mail,
  Calendar,
  Clock,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadState {
  file: File | null
  isDragging: boolean
  isConverting: boolean
  conversionStatus: string
  isComplete: boolean
  error: string | null
  convertedUrl: string | null
  convertedFileName: string | null
}

interface DownloadHistoryItem {
  id: string
  originalFileName: string
  convertedFileName: string
  conversionType: "pdf-to-word" | "word-to-pdf"
  conversionDate: Date
  fileSize: number
  downloadCount: number
}

export default function MyPDFHomepage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([])

  const [pdfUpload, setPdfUpload] = useState<FileUploadState>({
    file: null,
    isDragging: false,
    isConverting: false,
    conversionStatus: "",
    isComplete: false,
    error: null,
    convertedUrl: null,
    convertedFileName: null,
  })
  const [wordUpload, setWordUpload] = useState<FileUploadState>({
    file: null,
    isDragging: false,
    isConverting: false,
    conversionStatus: "",
    isComplete: false,
    error: null,
    convertedUrl: null,
    convertedFileName: null,
  })

  const pdfInputRef = useRef<HTMLInputElement>(null)
  const wordInputRef = useRef<HTMLInputElement>(null)

  // Load download history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("mypdf-download-history")
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        conversionDate: new Date(item.conversionDate),
      }))
      setDownloadHistory(parsedHistory)
    }
  }, [])

  // Save download history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mypdf-download-history", JSON.stringify(downloadHistory))
  }, [downloadHistory])

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

  const validateFile = (file: File, type: "pdf" | "word"): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (file.size > maxSize) {
      return "File size must be less than 10MB"
    }

    if (type === "pdf") {
      if (file.type !== "application/pdf") {
        return "Please select a PDF file"
      }
    } else {
      const validTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(file.type) && !file.name.match(/\.(doc|docx)$/i)) {
        return "Please select a DOC or DOCX file"
      }
    }

    return null
  }

  const addToDownloadHistory = (
    originalFile: File,
    conversionType: "pdf-to-word" | "word-to-pdf",
    convertedFileName: string,
  ): DownloadHistoryItem => {
    const historyItem: DownloadHistoryItem = {
      id: Date.now().toString(),
      originalFileName: originalFile.name,
      convertedFileName,
      conversionType,
      conversionDate: new Date(),
      fileSize: originalFile.size,
      downloadCount: 1,
    }

    setDownloadHistory((prev) => [historyItem, ...prev])
    return historyItem
  }

  const handleConversion = async (
    file: File,
    targetFormat: "docx" | "pdf",
    setState: React.Dispatch<React.SetStateAction<FileUploadState>>,
  ) => {
    const error = validateFile(file, targetFormat === "docx" ? "pdf" : "word")
    if (error) {
      setState((prev) => ({ ...prev, error, file: null, isConverting: false }))
      return
    }

    setState({
      file,
      isDragging: false,
      isConverting: true,
      conversionStatus: "Uploading...",
      isComplete: false,
      error: null,
      convertedUrl: null,
      convertedFileName: null,
    })

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("targetFormat", targetFormat)

      setState((prev) => ({ ...prev, conversionStatus: "Converting on server..." }))

      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        let errMsg = "Conversion failed. Please try again."
        try {
          const errData = await response.json()
          if (errData?.error) errMsg = errData.error
        } catch {
          // Fallback
        }
        throw new Error(errMsg)
      }

      setState((prev) => ({ ...prev, conversionStatus: "Preparing download..." }))

      const blob = await response.blob()
      const originalName = file.name.replace(/\.[^/.]+$/, "")
      const convertedFileName = `${originalName}_converted.${targetFormat}`
      const downloadUrl = URL.createObjectURL(blob)

      // Automatic programmatic download
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = convertedFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Add to download history
      const conversionType = targetFormat === "docx" ? "pdf-to-word" : "word-to-pdf"
      addToDownloadHistory(file, conversionType, convertedFileName)

      setState((prev) => ({
        ...prev,
        isConverting: false,
        isComplete: true,
        conversionStatus: "",
        convertedUrl: downloadUrl,
        convertedFileName,
      }))
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isConverting: false,
        isComplete: false,
        error: err?.message || "An unexpected error occurred during conversion.",
      }))
    }
  }

  const handleDownloadAgain = (uploadState: FileUploadState) => {
    if (uploadState.convertedUrl && uploadState.convertedFileName) {
      const link = document.createElement("a")
      link.href = uploadState.convertedUrl
      link.download = uploadState.convertedFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragEnter = useCallback(
    (e: React.DragEvent, setState: React.Dispatch<React.SetStateAction<FileUploadState>>) => {
      e.preventDefault()
      e.stopPropagation()
      setState((prev) => ({ ...prev, isDragging: true }))
    },
    [],
  )

  const handleDragLeave = useCallback(
    (e: React.DragEvent, setState: React.Dispatch<React.SetStateAction<FileUploadState>>) => {
      e.preventDefault()
      e.stopPropagation()
      setState((prev) => ({ ...prev, isDragging: false }))
    },
    [],
  )

  const handleDrop = useCallback(
    (
      e: React.DragEvent,
      targetFormat: "docx" | "pdf",
      setState: React.Dispatch<React.SetStateAction<FileUploadState>>,
    ) => {
      e.preventDefault()
      e.stopPropagation()
      setState((prev) => ({ ...prev, isDragging: false }))

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleConversion(files[0], targetFormat, setState)
      }
    },
    [],
  )

  const resetUpload = (setState: React.Dispatch<React.SetStateAction<FileUploadState>>) => {
    setState((prev) => {
      if (prev.convertedUrl) {
        URL.revokeObjectURL(prev.convertedUrl)
      }
      return {
        file: null,
        isDragging: false,
        isConverting: false,
        conversionStatus: "",
        isComplete: false,
        error: null,
        convertedUrl: null,
        convertedFileName: null,
      }
    })
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-red-500 bg-red-900/20" : "text-red-500 bg-red-50"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              <Info className="w-4 h-4" />
              About
            </Link>
            <Link
              href="/privacy"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              <Shield className="w-4 h-4" />
              Privacy
            </Link>
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              <Mail className="w-4 h-4" />
              Contact
            </Link>
            <Link
              href="/history"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              }`}
            >
              <History className="w-4 h-4" />
              History ({downloadHistory.length})
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
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

            {/* Mobile Menu Toggle */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="outline"
              size="icon"
              className={`md:hidden rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Menu className="h-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isDarkMode ? "text-red-500 bg-red-900/20" : "text-red-500 bg-red-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link
                href="/privacy"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
              <Link
                href="/history"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isDarkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <History className="w-4 h-4" />
                Download History ({downloadHistory.length})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  const renderHomePage = () => (
    <div className="pt-20">
      {/* Hidden file inputs */}
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleConversion(file, "docx", setPdfUpload)
          e.target.value = ""
        }}
      />
      <input
        ref={wordInputRef}
        type="file"
        accept=".doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleConversion(file, "pdf", setWordUpload)
          e.target.value = ""
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-red-500">MyPDF</span> — Your Free Online PDF Toolkit
          </h1>
          <p className="text-lg md:text-xl mb-12 opacity-80 max-w-2xl mx-auto">
            Easily convert PDF to Word or Word to PDF in seconds. Fast, secure, and 100% free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              onClick={() => document.getElementById("pdf-to-word")?.scrollIntoView({ behavior: "smooth" })}
            >
              Convert PDF to Word
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              onClick={() => document.getElementById("word-to-pdf")?.scrollIntoView({ behavior: "smooth" })}
            >
              Convert Word to PDF
            </Button>
          </div>

          <p className="text-xs sm:text-sm opacity-70 px-4">No sign-up needed. Just upload and convert instantly.</p>
        </div>
      </section>

      {/* PDF to Word Converter Section */}
      <section id="pdf-to-word" className={`py-12 sm:py-16 md:py-20 px-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">PDF to WORD Converter</h2>
              <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto px-4">
                Convert your PDF to editable Word documents with incredible accuracy.
              </p>
            </div>

            <div className="max-w-md mx-auto px-4">
              <div
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-300 relative ${
                  pdfUpload.isDragging
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : pdfUpload.error
                      ? "border-red-400"
                      : pdfUpload.isComplete
                        ? "border-green-500"
                        : isDarkMode
                          ? "border-gray-600 bg-gray-800 hover:border-red-500"
                          : "border-gray-300 bg-gray-50 hover:border-red-500"
                }`}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, setPdfUpload)}
                onDragLeave={(e) => handleDragLeave(e, setPdfUpload)}
                onDrop={(e) => handleDrop(e, "docx", setPdfUpload)}
              >
                {pdfUpload.isComplete ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                    <div>
                      <p className="font-semibold text-green-600 dark:text-green-400">Conversion Complete!</p>
                      <p className="text-sm opacity-70">{pdfUpload.file?.name}</p>
                      <p className="text-xs opacity-60">{pdfUpload.file && formatFileSize(pdfUpload.file.size)}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download completed!</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button
                          onClick={() => handleDownloadAgain(pdfUpload)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm rounded-lg flex items-center justify-center gap-2 shadow hover:shadow-md transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download Again
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => resetUpload(setPdfUpload)}
                          className="px-6 py-2 text-sm rounded-lg"
                        >
                          Convert Another
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : pdfUpload.isConverting ? (
                  <div className="space-y-4">
                    <Loader2 className="w-16 h-16 mx-auto text-red-500 animate-spin" />
                    <div>
                      <p className="font-semibold text-base">{pdfUpload.conversionStatus || "Processing conversion..."}</p>
                      <p className="text-sm opacity-70">{pdfUpload.file?.name}</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                        <div className="bg-red-500 h-2 rounded-full animate-pulse w-full"></div>
                      </div>
                      <p className="text-xs opacity-60 mt-2">Powered by CloudConvert</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileText className="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <Button
                      onClick={() => pdfInputRef.current?.click()}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-3 sm:mb-4 w-full sm:w-auto"
                    >
                      Select PDF File
                    </Button>
                    <p className="text-xs sm:text-sm opacity-70 mb-3 sm:mb-4">or drag and drop your PDF file here</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm opacity-70">
                        <HardDrive className="w-4 h-4" />
                        <span>Device</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm opacity-70">
                        <Cloud className="w-4 h-4" />
                        <span>Google Drive</span>
                      </div>
                    </div>

                    <p className="text-xs opacity-60">Output format: DOCX • Max size: 10MB</p>
                  </div>
                )}

                {pdfUpload.error && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {pdfUpload.error}
                      <button
                        onClick={() => setPdfUpload((prev) => ({ ...prev, error: null }))}
                        className="ml-2 hover:text-red-900 dark:hover:text-red-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Word to PDF Converter Section */}
      <section id="word-to-pdf" className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Convert WORD to PDF</h2>
              <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto px-4">
                Make your DOC or DOCX files easy to read by converting them to PDF.
              </p>
            </div>

            <div className="max-w-md mx-auto px-4">
              <div
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-300 relative ${
                  wordUpload.isDragging
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : wordUpload.error
                      ? "border-red-400"
                      : wordUpload.isComplete
                        ? "border-green-500"
                        : isDarkMode
                          ? "border-gray-600 bg-gray-800 hover:border-red-500"
                          : "border-gray-300 bg-gray-50 hover:border-red-500"
                }`}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, setWordUpload)}
                onDragLeave={(e) => handleDragLeave(e, setWordUpload)}
                onDrop={(e) => handleDrop(e, "pdf", setWordUpload)}
              >
                {wordUpload.isComplete ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                    <div>
                      <p className="font-semibold text-green-600 dark:text-green-400">Conversion Complete!</p>
                      <p className="text-sm opacity-70">{wordUpload.file?.name}</p>
                      <p className="text-xs opacity-60">{wordUpload.file && formatFileSize(wordUpload.file.size)}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download completed!</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button
                          onClick={() => handleDownloadAgain(wordUpload)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm rounded-lg flex items-center justify-center gap-2 shadow hover:shadow-md transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download Again
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => resetUpload(setWordUpload)}
                          className="px-6 py-2 text-sm rounded-lg"
                        >
                          Convert Another
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : wordUpload.isConverting ? (
                  <div className="space-y-4">
                    <Loader2 className="w-16 h-16 mx-auto text-red-500 animate-spin" />
                    <div>
                      <p className="font-semibold text-base">{wordUpload.conversionStatus || "Processing conversion..."}</p>
                      <p className="text-sm opacity-70">{wordUpload.file?.name}</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                        <div className="bg-red-500 h-2 rounded-full animate-pulse w-full"></div>
                      </div>
                      <p className="text-xs opacity-60 mt-2">Powered by CloudConvert</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <File className="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <Button
                      onClick={() => wordInputRef.current?.click()}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-3 sm:mb-4 w-full sm:w-auto"
                    >
                      Select WORD File
                    </Button>
                    <p className="text-xs sm:text-sm opacity-70 mb-3 sm:mb-4">or drag and drop your DOC/DOCX file here</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm opacity-70">
                        <HardDrive className="w-4 h-4" />
                        <span>Device</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm opacity-70">
                        <Cloud className="w-4 h-4" />
                        <span>Google Drive</span>
                      </div>
                    </div>

                    <p className="text-xs opacity-60">Output format: PDF • Max size: 10MB</p>
                  </div>
                )}

                {wordUpload.error && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {wordUpload.error}
                      <button
                        onClick={() => setWordUpload((prev) => ({ ...prev, error: null }))}
                        className="ml-2 hover:text-red-900 dark:hover:text-red-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )


  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {renderNavigation()}
      {renderHomePage()}
    </div>
  )
}
