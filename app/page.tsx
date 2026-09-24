"use client"

import React, { useState, useRef, useCallback } from "react"
import Link from "next/link"
import {
  HardDrive,
  Cloud,
  FileText,
  File,
  CheckCircle,
  AlertCircle,
  Download,
  Loader2,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useDownloadHistory } from "@/lib/history"

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

export default function MyPDFHomepage() {
  const { addItem: addToDownloadHistory } = useDownloadHistory()

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

  const validateFile = (file: File, type: "pdf" | "word"): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (file.size > maxSize) {
      return "File size exceeds 10MB limit. Please upload a smaller file."
    }

    if (type === "pdf") {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        return "Please upload a valid PDF document (.pdf)."
      }
    } else {
      const validTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      const validExt = file.name.match(/\.(doc|docx)$/i)
      if (!validTypes.includes(file.type) && !validExt) {
        return "Please upload a valid Word document (.doc or .docx)."
      }
    }

    return null
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
      conversionStatus: "Uploading document...",
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

      setState((prev) => ({ ...prev, conversionStatus: "Preparing your download..." }))

      const blob = await response.blob()
      const originalName = file.name.replace(/\.[^/.]+$/, "")
      const convertedFileName = `${originalName}.${targetFormat}`
      const downloadUrl = URL.createObjectURL(blob)

      // Automatic programmatic download trigger
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = convertedFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Reliably save to localStorage history
      const conversionType = targetFormat === "docx" ? "pdf-to-word" : "word-to-pdf"
      addToDownloadHistory({
        originalFileName: file.name,
        convertedFileName,
        conversionType,
        fileSize: file.size,
      })

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
        error: err?.message || "An unexpected error occurred during file conversion.",
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

  const handleDragEnter = (
    e: React.DragEvent,
    setState: React.Dispatch<React.SetStateAction<FileUploadState>>,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setState((prev) => ({ ...prev, isDragging: true }))
  }

  const handleDragLeave = (
    e: React.DragEvent,
    setState: React.Dispatch<React.SetStateAction<FileUploadState>>,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setState((prev) => ({ ...prev, isDragging: false }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (
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
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-500 selection:text-white">
      <Navbar />

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

      <main className="flex-1 pt-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-red-50/50 via-white to-white py-16 sm:py-24 border-b border-gray-100">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute -top-32 left-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-red-50 border border-red-200/80 text-red-600 mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>Free, Fast & 100% Precise Document Converter</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12] mb-6">
              Convert Documents Instantly with{" "}
              <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                Zero Quality Loss
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Transform PDF files to editable Word documents and Word to PDF in seconds.
              Powered by CloudConvert API v2 for reliable, pixel-perfect layout fidelity.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10">
              <Button
                onClick={() => document.getElementById("pdf-to-word")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold px-7 py-6 text-base rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                <span>Convert PDF to Word</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-75" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("word-to-pdf")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border-gray-300 font-semibold px-7 py-6 text-base rounded-xl shadow-2xs hover:shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <File className="w-5 h-5 text-blue-600" />
                <span>Convert Word to PDF</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-75" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure & Auto-Purged</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Cloud Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>No Registration Required</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONVERTER WORKSPACE HUB */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50/70">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* TOOL 1: PDF TO WORD */}
            <div
              id="pdf-to-word"
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 md:p-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">PDF to Word Converter</h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Convert PDF files into fully editable Microsoft Word (.docx) documents.
                    </p>
                  </div>
                </div>
                <div className="inline-flex self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/70">
                  Target: DOCX
                </div>
              </div>

              {/* Dropzone Card */}
              <div className="max-w-xl mx-auto">
                <div
                  className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-all relative ${
                    pdfUpload.isDragging
                      ? "border-red-500 bg-red-50/50 ring-4 ring-red-100"
                      : pdfUpload.error
                        ? "border-red-300 bg-red-50/30"
                        : pdfUpload.isComplete
                          ? "border-emerald-500 bg-emerald-50/20"
                          : "border-gray-300 bg-gray-50/60 hover:border-red-400 hover:bg-red-50/20"
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, setPdfUpload)}
                  onDragLeave={(e) => handleDragLeave(e, setPdfUpload)}
                  onDrop={(e) => handleDrop(e, "docx", setPdfUpload)}
                >
                  {pdfUpload.isComplete ? (
                    <div className="space-y-4 py-2">
                      <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">Conversion Successful!</p>
                        <p className="text-sm text-gray-600 mt-1 font-medium">{pdfUpload.convertedFileName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {pdfUpload.file && formatFileSize(pdfUpload.file.size)}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                        <Button
                          onClick={() => handleDownloadAgain(pdfUpload)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Word File</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => resetUpload(setPdfUpload)}
                          className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-5 py-2.5 rounded-lg flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4 text-gray-500" />
                          <span>Convert Another</span>
                        </Button>
                      </div>
                    </div>
                  ) : pdfUpload.isConverting ? (
                    <div className="space-y-4 py-4">
                      <Loader2 className="w-12 h-12 mx-auto text-red-500 animate-spin" />
                      <div>
                        <p className="font-semibold text-gray-900 text-base">
                          {pdfUpload.conversionStatus || "Processing document..."}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{pdfUpload.file?.name}</p>
                        <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                          <div className="bg-red-500 h-2 rounded-full animate-pulse w-full" />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Powered by CloudConvert</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center">
                        <FileText className="w-7 h-7" />
                      </div>
                      <Button
                        onClick={() => pdfInputRef.current?.click()}
                        className="bg-red-500 hover:bg-red-600 text-white px-7 py-3 text-base font-semibold rounded-lg shadow-sm hover:shadow transition-all mb-3 w-full sm:w-auto"
                      >
                        Choose PDF File
                      </Button>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        or drag & drop your PDF file directly here
                      </p>

                      <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 text-gray-500" />
                          <span>From Device</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Cloud className="w-3.5 h-3.5 text-gray-500" />
                          <span>Google Drive</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400">Supported: .pdf • Max size: 10MB</p>
                    </div>
                  )}

                  {pdfUpload.error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{pdfUpload.error}</span>
                      </div>
                      <button
                        onClick={() => setPdfUpload((prev) => ({ ...prev, error: null }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* TOOL 2: WORD TO PDF */}
            <div
              id="word-to-pdf"
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 md:p-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <File className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Word to PDF Converter</h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Convert DOC and DOCX files into universal, publication-ready PDF documents.
                    </p>
                  </div>
                </div>
                <div className="inline-flex self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                  Target: PDF
                </div>
              </div>

              {/* Dropzone Card */}
              <div className="max-w-xl mx-auto">
                <div
                  className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-all relative ${
                    wordUpload.isDragging
                      ? "border-blue-500 bg-blue-50/50 ring-4 ring-blue-100"
                      : wordUpload.error
                        ? "border-red-300 bg-red-50/30"
                        : wordUpload.isComplete
                          ? "border-emerald-500 bg-emerald-50/20"
                          : "border-gray-300 bg-gray-50/60 hover:border-blue-400 hover:bg-blue-50/20"
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, setWordUpload)}
                  onDragLeave={(e) => handleDragLeave(e, setWordUpload)}
                  onDrop={(e) => handleDrop(e, "pdf", setWordUpload)}
                >
                  {wordUpload.isComplete ? (
                    <div className="space-y-4 py-2">
                      <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">Conversion Successful!</p>
                        <p className="text-sm text-gray-600 mt-1 font-medium">{wordUpload.convertedFileName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {wordUpload.file && formatFileSize(wordUpload.file.size)}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                        <Button
                          onClick={() => handleDownloadAgain(wordUpload)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF File</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => resetUpload(setWordUpload)}
                          className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-5 py-2.5 rounded-lg flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4 text-gray-500" />
                          <span>Convert Another</span>
                        </Button>
                      </div>
                    </div>
                  ) : wordUpload.isConverting ? (
                    <div className="space-y-4 py-4">
                      <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
                      <div>
                        <p className="font-semibold text-gray-900 text-base">
                          {wordUpload.conversionStatus || "Processing document..."}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{wordUpload.file?.name}</p>
                        <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                          <div className="bg-blue-500 h-2 rounded-full animate-pulse w-full" />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Powered by CloudConvert</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center">
                        <File className="w-7 h-7" />
                      </div>
                      <Button
                        onClick={() => wordInputRef.current?.click()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 text-base font-semibold rounded-lg shadow-sm hover:shadow transition-all mb-3 w-full sm:w-auto"
                      >
                        Choose WORD File
                      </Button>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        or drag & drop your DOC or DOCX file here
                      </p>

                      <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 text-gray-500" />
                          <span>From Device</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Cloud className="w-3.5 h-3.5 text-gray-500" />
                          <span>Google Drive</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400">Supported: .doc, .docx • Max size: 10MB</p>
                    </div>
                  )}

                  {wordUpload.error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{wordUpload.error}</span>
                      </div>
                      <button
                        onClick={() => setWordUpload((prev) => ({ ...prev, error: null }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE MYPDF SECTION */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Why Millions Rely on MyPDF
              </h2>
              <p className="text-sm sm:text-base text-gray-500">
                Engineered with industry-leading standards to deliver effortless document conversion with unmatched reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-gray-50/80 border border-gray-200/70 hover:border-red-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Original Formatting Preserved</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fonts, styles, tables, and images are accurately converted with zero displacement or corruption.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50/80 border border-gray-200/70 hover:border-red-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Complete Privacy Guarantee</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your files are transferred over TLS encryption and automatically deleted from the conversion engine immediately.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50/80 border border-gray-200/70 hover:border-red-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Cloud Speed</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  No queue delays or complicated software downloads. Experience lightning-fast conversions right in your browser.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
