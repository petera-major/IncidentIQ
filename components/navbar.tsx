"use client"

import Link from "next/link"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Incident<span className="text-primary">IQ</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            How It Works
          </Link>
          <Link href="/#pipeline" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            AI Pipeline
          </Link>
          <Link href="/#report" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Example Report
          </Link>
          <Link
            href="/demo"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          >
            Try the Demo
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-muted-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="/#pipeline"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              AI Pipeline
            </Link>
            <Link
              href="/#report"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Example Report
            </Link>
            <Link
              href="/demo"
              onClick={() => setMobileOpen(false)}
              className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Try the Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
