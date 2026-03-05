"use client"

import { useEffect, useState } from "react"
import { Activity, Radio, Database, FileSearch, Shield, CheckCircle2 } from "lucide-react"

const pipelineStages = [
  { label: "Logs Received", icon: Database, status: "Ingesting 2,847 events..." },
  { label: "Threat Detection", icon: FileSearch, status: "Analyzing patterns..." },
  { label: "MITRE Technique Mapping", icon: Shield, status: "Mapping attack techniques..." },
  { label: "Response Strategy Generated", icon: CheckCircle2, status: "Generating remediation steps..." },
]

export function PipelineVisualization() {
  const [currentStage, setCurrentStage] = useState(-1)
  const [statusText, setStatusText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= pipelineStages.length - 1) {
          setTimeout(() => {
            setCurrentStage(-1)
            setCharIndex(0)
            setStatusText("")
          }, 2000)
          return prev
        }
        setCharIndex(0)
        setStatusText("")
        return prev + 1
      })
    }, 2800)
    return () => clearInterval(stageInterval)
  }, [])

  // Typing effect for status text
  useEffect(() => {
    if (currentStage < 0 || currentStage >= pipelineStages.length) return
    const fullText = pipelineStages[currentStage].status
    if (charIndex >= fullText.length) return

    const timeout = setTimeout(() => {
      setStatusText(fullText.slice(0, charIndex + 1))
      setCharIndex(charIndex + 1)
    }, 30)
    return () => clearTimeout(timeout)
  }, [currentStage, charIndex])

  return (
    <section id="pipeline" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-wider text-accent uppercase">Intelligence Engine</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl text-balance">AI Analysis Pipeline</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Watch how IncidentIQ processes raw security data through its intelligence engine in real time.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Pipeline card */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground font-mono">PIPELINE STATUS</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className={`h-4 w-4 ${currentStage >= 0 ? "text-chart-5 animate-pulse-glow" : "text-muted-foreground"}`} />
                <span className="text-xs font-mono text-muted-foreground">
                  {currentStage >= 0 ? "PROCESSING" : "IDLE"}
                </span>
              </div>
            </div>

            {/* Stages */}
            <div className="p-6">
              <div className="flex flex-col gap-6">
                {pipelineStages.map((stage, i) => {
                  const Icon = stage.icon
                  const isActive = i === currentStage
                  const isComplete = i < currentStage
                  const isPending = i > currentStage

                  return (
                    <div key={i} className="relative">
                      {/* Connector line */}
                      {i < pipelineStages.length - 1 && (
                        <div className="absolute left-5 top-12 h-6 w-px">
                          <div className={`h-full w-full transition-colors duration-300 ${isComplete ? "bg-primary" : "bg-border"}`} />
                        </div>
                      )}

                      <div className={`flex items-start gap-4 rounded-lg border p-4 transition-all duration-500 ${
                        isActive
                          ? "border-primary/30 bg-primary/5"
                          : isComplete
                            ? "border-chart-5/20 bg-chart-5/5"
                            : "border-border bg-card"
                      }`}>
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md transition-all duration-500 ${
                          isActive
                            ? "bg-primary/20 text-primary"
                            : isComplete
                              ? "bg-chart-5/20 text-chart-5"
                              : "bg-secondary text-muted-foreground"
                        }`}>
                          {isComplete ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-sm font-semibold transition-colors ${
                              isActive ? "text-primary" : isComplete ? "text-chart-5" : "text-foreground"
                            }`}>
                              {stage.label}
                            </h4>
                            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />}
                          </div>
                          <p className="mt-1 text-xs font-mono text-muted-foreground">
                            {isActive ? (
                              <>
                                {statusText}
                                <span className="inline-block w-1.5 h-3 bg-primary/60 ml-0.5 animate-blink" />
                              </>
                            ) : isComplete ? (
                              "Complete"
                            ) : isPending ? (
                              "Waiting..."
                            ) : (
                              stage.status
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{
                    width: `${currentStage < 0 ? 0 : ((currentStage + 1) / pipelineStages.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
