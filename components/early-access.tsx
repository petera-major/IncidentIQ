"use client"

import Link from "next/link"
import { Download, Users, Play, Shield } from "lucide-react"

export function EarlyAccess() {
  return (
    <section id="early-access" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-primary/20 bg-card">
          <div className="absolute left-0 top-0 h-16 w-px bg-primary/40" />
          <div className="absolute left-0 top-0 h-px w-16 bg-primary/40" />
          <div className="absolute bottom-0 right-0 h-16 w-px bg-primary/40" />
          <div className="absolute bottom-0 right-0 h-px w-16 bg-primary/40" />

          <div className="relative p-8 lg:p-12">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium tracking-wider text-primary uppercase">Coming Soon</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl text-balance">
                IncidentIQ Early Access
              </h2>
              <p className="mx-auto max-w-lg text-muted-foreground leading-relaxed">
                IncidentIQ is currently available as a web demo. A desktop security copilot for
                SOC analysts is coming soon.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] sm:w-auto">
                <Download className="h-4 w-4" />
                Download Early Access
              </button>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-accent/50 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:border-accent hover:bg-accent/20 sm:w-auto">
                <Users className="h-4 w-4" />
                Join Waitlist
              </button>
              <Link
                href="/demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 sm:w-auto"
              >
                <Play className="h-4 w-4" />
                Try Web Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
