"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useState } from "react"

const terminalLines = [
  "$ incidentiq analyze --source siem_logs.json",
  "> Ingesting 2,847 events...",
  "> Correlating threat indicators...",
  "> MITRE ATT&CK mapping: T1059.001, T1027",
  "> Severity: HIGH | Confidence: 86%",
  "> Generating incident response playbook...",
  "> Report ready. 3 critical actions required.",
]

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          setTimeout(() => setVisibleLines(0), 2000)
          return prev
        }
        return prev + 1
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="cyber-grid relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-medium tracking-wider text-primary uppercase">AI-Powered Security</span>
          </div>

          <h1 className="mb-2 text-5xl font-bold tracking-tight text-foreground lg:text-6xl xl:text-7xl">
            <span className="text-balance">Incident</span>
            <span className="text-primary glow-cyan-text">IQ</span>
          </h1>
          <p className="mb-6 text-xl font-medium text-muted-foreground lg:text-2xl">
            AI Incident Response Copilot
          </p>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
            Turn raw security logs into actionable incident intelligence using AI.
            Instant threat explanation, MITRE ATT&CK mapping, and remediation guidance.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
            >
              <Play className="h-4 w-4" />
              Try the Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:border-accent hover:bg-accent/20">
              Join Early Access
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="glow-cyan w-full max-w-lg rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-chart-5/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">incidentiq-analysis</span>
            </div>
            <div className="p-4 font-mono text-sm">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={`mb-1 ${
                    line.includes("HIGH") || line.includes("critical")
                      ? "text-destructive"
                      : line.includes("MITRE")
                        ? "text-primary"
                        : line.includes(">")
                          ? "text-muted-foreground"
                          : "text-chart-5"
                  }`}
                >
                  {line}
                </div>
              ))}
              {visibleLines < terminalLines.length && (
                <span className="inline-block h-4 w-2 bg-primary animate-blink" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
