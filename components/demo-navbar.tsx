"use client"

import Link from "next/link"
import { Shield, ArrowLeft, Radio } from "lucide-react"

export function DemoNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">
              Incident<span className="text-primary">IQ</span>
            </span>
            <span className="hidden rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-mono text-primary sm:inline-block">
              DEMO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Radio className="h-3 w-3 text-chart-5 animate-pulse-glow" />
          <span className="text-xs font-mono text-muted-foreground">SYSTEM ONLINE</span>
        </div>
      </div>
    </nav>
  )
}
