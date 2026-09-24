"use client"

import { useState, useEffect, useCallback } from "react"

export interface DownloadHistoryItem {
  id: string
  originalFileName: string
  convertedFileName: string
  conversionType: "pdf-to-word" | "word-to-pdf"
  conversionDate: string
  fileSize: number
  downloadCount: number
}

const STORAGE_KEY = "mypdf-download-history"
const UPDATE_EVENT = "mypdf:history-updated"

export function getStoredHistory(): DownloadHistoryItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((item: any) => ({
      ...item,
      conversionDate: typeof item.conversionDate === "string"
        ? item.conversionDate
        : new Date(item.conversionDate || Date.now()).toISOString(),
    }))
  } catch (err) {
    console.error("Failed to parse conversion history from localStorage:", err)
    return []
  }
}

export function saveStoredHistory(items: DownloadHistoryItem[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: items }))
  } catch (err) {
    console.error("Failed to save conversion history to localStorage:", err)
  }
}

export function addStoredHistoryItem(item: {
  originalFileName: string
  convertedFileName: string
  conversionType: "pdf-to-word" | "word-to-pdf"
  fileSize: number
}): DownloadHistoryItem {
  const current = getStoredHistory()
  const newItem: DownloadHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    originalFileName: item.originalFileName,
    convertedFileName: item.convertedFileName,
    conversionType: item.conversionType,
    conversionDate: new Date().toISOString(),
    fileSize: item.fileSize,
    downloadCount: 1,
  }
  const updated = [newItem, ...current]
  saveStoredHistory(updated)
  return newItem
}

export function removeStoredHistoryItem(id: string): DownloadHistoryItem[] {
  const current = getStoredHistory()
  const updated = current.filter((item) => item.id !== id)
  saveStoredHistory(updated)
  return updated
}

export function clearStoredHistory(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: [] }))
  } catch (err) {
    console.error("Failed to clear conversion history in localStorage:", err)
  }
}

export function useDownloadHistory() {
  const [history, setHistory] = useState<DownloadHistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const sync = useCallback(() => {
    setHistory(getStoredHistory())
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    // Initial read on mount
    sync()

    // Listen to local window updates and cross-tab storage changes
    const onCustomUpdate = () => sync()
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === STORAGE_KEY) {
        sync()
      }
    }

    window.addEventListener(UPDATE_EVENT, onCustomUpdate)
    window.addEventListener("storage", onStorage)

    return () => {
      window.removeEventListener(UPDATE_EVENT, onCustomUpdate)
      window.removeEventListener("storage", onStorage)
    }
  }, [sync])

  const addItem = useCallback((item: {
    originalFileName: string
    convertedFileName: string
    conversionType: "pdf-to-word" | "word-to-pdf"
    fileSize: number
  }) => {
    return addStoredHistoryItem(item)
  }, [])

  const removeItem = useCallback((id: string) => {
    return removeStoredHistoryItem(id)
  }, [])

  const clearAll = useCallback(() => {
    clearStoredHistory()
  }, [])

  return {
    history,
    isLoaded,
    count: history.length,
    addItem,
    removeItem,
    clearAll,
    refresh: sync,
  }
}
