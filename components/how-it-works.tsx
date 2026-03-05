"use client"

import { FileText, Brain, Target, ShieldCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    icon: FileText,
    title: "Security Logs",
    description: "Ingest raw logs from SIEM, EDR, cloud trails, and firewall events in any format.",
  },
  {
    icon: Brain,
    title: "AI Threat Detection",
    description: "Deep analysis powered by AI identifies attack patterns, anomalies, and indicators of compromise.",
  },
  {
    icon: Target,
    title: "MITRE ATT&CK Mapping",
    description: "Automatically maps detected techniques to the MITRE ATT&CK framework for standardized classification.",
  },
  {
    icon: ShieldCheck,
    title: "Response Strategy",
    description: "Generates actionable remediation steps, executive summaries, and incident response playbooks.",
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-wider text-primary uppercase">Process</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl text-balance">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From raw security data to actionable intelligence in seconds.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="relative mx-auto max-w-4xl">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
          <div
            className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-primary transition-all duration-500 md:block"
            style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = i <= activeStep

              return (
                <div key={i} className="relative flex items-center gap-6 md:gap-8">
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-lg border transition-all duration-500 ${
                        isActive
                          ? "border-primary/50 bg-primary/10 glow-cyan"
                          : "border-border bg-card"
                      }`}
                    >
                      <Icon className={`h-6 w-6 transition-colors duration-500 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`rounded-lg border p-6 transition-all duration-500 flex-1 ${
                      isActive
                        ? "border-primary/20 bg-card"
                        : "border-border bg-card/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-mono tracking-wider ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                      {isActive && i === activeStep && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                      )}
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
