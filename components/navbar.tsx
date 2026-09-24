"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, Shield, Mail, History, Menu, X, FileText } from "lucide-react"
import { useDownloadHistory } from "@/lib/history"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { count, isLoaded } = useDownloadHistory()

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/privacy", label: "Privacy", icon: Shield },
    { href: "/contact", label: "Contact", icon: Mail },
    {
      href: "/history",
      label: "History",
      icon: History,
      badge: isLoaded ? count : null,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-sm group-hover:bg-red-600 transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              My<span className="text-red-500">PDF</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? "text-red-600 bg-red-50"
                      : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-red-500" : "text-gray-400 group-hover:text-red-500"}`} />
                  <span>{link.label}</span>
                  {link.badge !== null && link.badge !== undefined && (
                    <span
                      className={`ml-1 text-xs px-2 py-0.5 rounded-full font-semibold ${
                        active
                          ? "bg-red-200/80 text-red-700"
                          : "bg-gray-100 text-gray-700 group-hover:bg-red-100 group-hover:text-red-600"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-red-600 bg-red-50 font-semibold"
                        : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? "text-red-500" : "text-gray-400"}`} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge !== null && link.badge !== undefined && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-700">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
export default Navbar
