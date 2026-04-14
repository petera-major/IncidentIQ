"use client"

import { useEffect, useState } from "react"

const STEPS = [
  { label: "Parsing logs...", duration: 600 },
  { label: "Running detection pipeline...", duration: 800 },
  { label: "Mapping MITRE ATT&CK techniques...", duration: 700 },
  { label: "Generating incident report...", duration: 900 },
]

export function AnalysisLoader() {
  const [stepIndex, setStepIndex] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    let elapsed = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((step, i) => {
      const t = setTimeout(() => setStepIndex(i), elapsed)
      timers.push(t)
      elapsed += step.duration
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-cyan/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-cyan border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border border-purple/30 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>

      <div className="text-center space-y-1">
        <p className="text-cyan font-mono text-sm glow-cyan-text">
          {STEPS[stepIndex]?.label}{dots}
        </p>
        <p className="text-muted-foreground text-xs">
          AI analysis in progress
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < stepIndex
                  ? "bg-cyan"
                  : i === stepIndex
                  ? "bg-cyan animate-pulse-glow"
                  : "bg-muted"
              }`}
            />
            <span
              className={`text-xs font-mono transition-colors duration-300 ${
                i < stepIndex
                  ? "text-cyan/60 line-through"
                  : i === stepIndex
                  ? "text-cyan"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}