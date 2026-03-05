"use client"

import { useState, useCallback } from "react"
import {
  Shield,
  Upload,
  Play,
  Terminal,
  AlertTriangle,
  CheckCircle,
  FileText,
  Loader2,
  Zap,
} from "lucide-react"
import { analyzeIncident } from "../src/lib/api"


const exampleLogs: Record<string, { label: string; logs: string }> = {
  powershell: {
    label: "PowerShell Attack",
    logs: `EventID: 4688
ProcessName: WINWORD.EXE
CommandLine: powershell.exe -enc UwB0AGEAcgB0AC0AUAByAG8AYwBlAHMAcwAgAC0ARgBpAGwAZQBQAGEAdABoACAAJwBoAHQAdABwADoALwAvAG0AYQBsAHcAYQByAGUALgBlAHgAZQAnAA==
ParentProcess: WINWORD.EXE
User: CORP\\jsmith
Timestamp: 2026-03-04T14:23:01Z
Host: WS-FINANCE-042
LogSource: Windows Security`,
  },
  cloudtrail: {
    label: "AWS CloudTrail",
    logs: `{
  "eventSource": "iam.amazonaws.com",
  "eventName": "CreateAccessKey",
  "sourceIPAddress": "198.51.100.42",
  "userAgent": "aws-cli/2.15.0",
  "requestParameters": {
    "userName": "admin-backup"
  },
  "responseElements": {
    "accessKey": {
      "accessKeyId": "AKIA***REDACTED***",
      "status": "Active",
      "userName": "admin-backup"
    }
  },
  "eventTime": "2026-03-04T08:15:33Z",
  "awsRegion": "us-east-1"
}`,
  },
  bruteforce: {
    label: "Brute Force",
    logs: `Mar  4 03:14:22 auth-server sshd[28451]: Failed password for root from 203.0.113.50 port 44231 ssh2
Mar  4 03:14:23 auth-server sshd[28452]: Failed password for root from 203.0.113.50 port 44232 ssh2
Mar  4 03:14:24 auth-server sshd[28453]: Failed password for admin from 203.0.113.50 port 44233 ssh2
Mar  4 03:14:25 auth-server sshd[28454]: Failed password for root from 203.0.113.50 port 44234 ssh2
Mar  4 03:14:26 auth-server sshd[28455]: Failed password for admin from 203.0.113.50 port 44235 ssh2
Mar  4 03:14:27 auth-server sshd[28456]: Accepted password for root from 203.0.113.50 port 44236 ssh2
Mar  4 03:14:28 auth-server sshd[28456]: pam_unix(sshd:session): session opened for user root`,
  },
}


interface AnalysisResult {
  severity: "critical" | "high" | "medium" | "low"
  confidence: number
  summary: string
  mitre: { tactic: string; id: string; name: string }[]
  remediation: string[]
  executive: string
}

const analysisResults: Record<string, AnalysisResult> = {
  powershell: {
    severity: "high",
    confidence: 86,
    summary:
      "Encoded PowerShell command executed from WINWORD.EXE suggesting possible macro-based malware delivery. The obfuscated command attempts to download and execute a remote payload, consistent with a living-off-the-land binary (LOLBin) attack pattern.",
    mitre: [
      { tactic: "Execution", id: "T1059.001", name: "PowerShell" },
      { tactic: "Defense Evasion", id: "T1027", name: "Obfuscated Files" },
      { tactic: "Initial Access", id: "T1566.001", name: "Spearphishing Attachment" },
    ],
    remediation: [
      "Isolate affected host (WS-FINANCE-042) from network",
      "Rotate credentials for user CORP\\jsmith",
      "Block outbound connections to suspicious IPs",
      "Review PowerShell execution logs for lateral movement",
      "Scan all endpoints for similar indicators of compromise",
    ],
    executive:
      "A potentially malicious document was opened by an employee in the finance department, triggering hidden code execution on their workstation. The attack appears to be an initial compromise attempt that could lead to data exfiltration or ransomware deployment. Immediate containment actions should be executed within the next 30 minutes to prevent lateral movement.",
  },
  cloudtrail: {
    severity: "critical",
    confidence: 92,
    summary:
      "Unauthorized IAM access key creation detected from an external IP address. A new access key was created for the 'admin-backup' user from IP 198.51.100.42, which is not associated with any known corporate network. This indicates potential credential compromise or insider threat.",
    mitre: [
      { tactic: "Persistence", id: "T1098", name: "Account Manipulation" },
      { tactic: "Credential Access", id: "T1528", name: "Steal Application Access Token" },
      { tactic: "Defense Evasion", id: "T1078", name: "Valid Accounts" },
    ],
    remediation: [
      "Immediately disable the newly created access key",
      "Rotate all credentials for admin-backup user",
      "Review CloudTrail logs for additional suspicious activity",
      "Enable MFA on all IAM admin accounts",
      "Implement IP-based access restrictions for IAM operations",
    ],
    executive:
      "An unauthorized party gained access to cloud administration tools and created new security credentials. This could allow persistent access to company cloud resources including databases, storage, and compute infrastructure. Emergency credential rotation is required immediately.",
  },
  bruteforce: {
    severity: "high",
    confidence: 94,
    summary:
      "SSH brute force attack detected from IP 203.0.113.50 against authentication server. Multiple failed login attempts were followed by a successful authentication as root, indicating the attacker likely discovered valid credentials through password guessing.",
    mitre: [
      { tactic: "Credential Access", id: "T1110.001", name: "Password Guessing" },
      { tactic: "Initial Access", id: "T1078", name: "Valid Accounts" },
      { tactic: "Persistence", id: "T1098", name: "Account Manipulation" },
    ],
    remediation: [
      "Immediately block IP 203.0.113.50 at all perimeter firewalls",
      "Force password reset for root and admin accounts",
      "Disable direct root SSH access",
      "Implement fail2ban or similar rate limiting",
      "Enable key-based authentication, disable password auth",
      "Audit the server for any changes made during the session",
    ],
    executive:
      "An external attacker successfully gained root access to a critical authentication server through repeated password guessing. The attacker now has full administrative access and could compromise any system that relies on this server for authentication. Immediate lockdown of the server is required.",
  },
}


function getSeverityConfig(severity: string) {
  switch (severity) {
    case "critical":
      return { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "CRITICAL" }
    case "high":
      return { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "HIGH" }
    case "medium":
      return { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", label: "MEDIUM" }
    case "low":
      return { color: "text-chart-5", bg: "bg-chart-5/10", border: "border-chart-5/30", label: "LOW" }
    default:
      return { color: "text-muted-foreground", bg: "bg-secondary", border: "border-border", label: "UNKNOWN" }
  }
}

function getTacticColor(tactic: string) {
  switch (tactic) {
    case "Execution":
    case "Credential Access":
      return "border-accent/30 bg-accent/10 text-accent-foreground"
    case "Defense Evasion":
    case "Persistence":
      return "border-warning/30 bg-warning/10 text-foreground"
    case "Initial Access":
      return "border-destructive/30 bg-destructive/10 text-foreground"
    default:
      return "border-primary/30 bg-primary/10 text-foreground"
  }
}


export function DemoDashboard() {
  const [logInput, setLogInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisType, setAnalysisType] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)
  const [progressText, setProgressText] = useState("")

  const progressSteps = [
    "Parsing log entries...",
    "Identifying threat indicators...",
    "Correlating attack patterns...",
    "Mapping MITRE ATT&CK techniques...",
    "Generating remediation playbook...",
    "Compiling incident report...",
  ]

  const analyze = useCallback(
    (type: string) => {
      setIsAnalyzing(true)
      setResult(null)
      setAnalysisType(type)
      setAnalyzeProgress(0)

      let step = 0
      const interval = setInterval(() => {
        step++
        setAnalyzeProgress(Math.min((step / progressSteps.length) * 100, 100))
        setProgressText(progressSteps[Math.min(step - 1, progressSteps.length - 1)])
        if (step >= progressSteps.length) {
          clearInterval(interval)
          setTimeout(() => {
            setResult(analysisResults[type])
            setIsAnalyzing(false)
          }, 500)
        }
      }, 600)
    },
    [progressSteps]
  )

  const loadExample = (key: string) => {
    setLogInput(exampleLogs[key].logs)
    setResult(null)
    setAnalysisType(key)
  }

  const handleAnalyze = async () => {
    if (!logInput.trim()) return
  
    const detectedSource =
      logInput.includes("powershell") || logInput.includes("WINWORD")
        ? "windows"
        : logInput.includes("iam.amazonaws") || logInput.includes("CloudTrail")
          ? "cloudtrail"
          : "generic"
  
    setIsAnalyzing(true)
    setResult(null)
    setAnalyzeProgress(0)
  
    // Run progress animation
    let step = 0
    const interval = setInterval(() => {
      step++
      setAnalyzeProgress(Math.min((step / progressSteps.length) * 100, 100))
      setProgressText(progressSteps[Math.min(step - 1, progressSteps.length - 1)])
      if (step >= progressSteps.length) clearInterval(interval)
    }, 600)
  
    try {
      const data = await analyzeIncident({
        source: detectedSource,
        raw_logs: logInput,
        metadata: {},
      })
  
      // Map backend response to frontend AnalysisResult shape
      setResult({
        severity: data.severity,
        confidence: Math.round(data.confidence * 100),
        summary: data.what_happened,
        mitre: data.mapped_tactics.map((t: string) => {
          const [id, ...nameParts] = t.split(" - ")
          return { tactic: "Technique", id, name: nameParts.join(" - ") }
        }),
        remediation: data.recommended_steps,
        executive: data.executive_summary,
      })
    } catch (err) {
      console.error("Analysis failed:", err)
    } finally {
      clearInterval(interval)
      setIsAnalyzing(false)
    }
  }

  const severityConfig = result ? getSeverityConfig(result.severity) : null

  return (
    <div className="grid min-h-[calc(100vh-5rem)] gap-6 p-6 lg:grid-cols-2">
      {/* ─── Left: Log Input Panel ─── */}
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col flex-1">
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground font-mono">Paste Security Logs</h2>
            </div>
          </div>

          {/* Text area */}
          <div className="flex-1 p-4">
            <textarea
              value={logInput}
              onChange={(e) => {
                setLogInput(e.target.value)
                setResult(null)
              }}
              placeholder="Paste your security logs here (SIEM events, EDR alerts, CloudTrail, syslog, etc.)..."
              className="h-full min-h-[200px] w-full resize-none rounded-md border border-border bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* File upload area */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center justify-center rounded-md border border-dashed border-border bg-background/50 px-4 py-3">
              <Upload className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Drag and drop .log or .json files</span>
            </div>
          </div>

          {/* Analyze button */}
          <div className="border-t border-border px-4 py-3">
            <button
              onClick={handleAnalyze}
              disabled={!logInput.trim() || isAnalyzing}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Analyze Incident
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick demo buttons */}
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-3 text-xs font-mono text-muted-foreground uppercase tracking-wider">Quick Examples</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {Object.entries(exampleLogs).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => loadExample(key)}
                className={`rounded-md border px-3 py-2 text-xs font-medium transition-all ${
                  analysisType === key
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-secondary-foreground hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                Load {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold text-foreground font-mono">Incident Report</h2>
          </div>
          {result && (
            <span className={`rounded-md px-2 py-0.5 text-xs font-bold font-mono ${severityConfig?.bg} ${severityConfig?.color}`}>
              {severityConfig?.label}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-semibold text-foreground">Processing Logs</p>
                <p className="text-xs font-mono text-primary">{progressText}<span className="animate-blink">|</span></p>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${analyzeProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Severity & Confidence */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={`rounded-md border p-3 ${severityConfig?.border} ${severityConfig?.bg}`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`h-4 w-4 ${severityConfig?.color}`} />
                    <span className="text-xs text-muted-foreground font-mono uppercase">Severity</span>
                  </div>
                  <p className={`mt-1 text-lg font-bold font-mono ${severityConfig?.color}`}>{severityConfig?.label}</p>
                </div>
                <div className="rounded-md border border-border bg-secondary/30 p-3">
                  <span className="text-xs text-muted-foreground font-mono uppercase">Confidence</span>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-warning transition-all duration-1000"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-warning font-mono">{result.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* What Happened */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-semibold text-primary font-mono uppercase tracking-wider">What Happened</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
              </div>

              {/* MITRE ATT&CK */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <h3 className="text-xs font-semibold text-accent font-mono uppercase tracking-wider">{'MITRE ATT&CK Mapping'}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.mitre.map((tech, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-mono ${getTacticColor(tech.tactic)}`}
                    >
                      <span className="font-bold">{tech.tactic}</span>
                      {tech.id} - {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Remediation */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-chart-5" />
                  <h3 className="text-xs font-semibold text-chart-5 font-mono uppercase tracking-wider">Recommended Remediation</h3>
                </div>
                <div className="space-y-2">
                  {result.remediation.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-md bg-secondary/50 px-3 py-2">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-chart-5/30 bg-chart-5/10 text-xs font-mono text-chart-5">
                        {i + 1}
                      </div>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Summary */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <h3 className="mb-2 text-xs font-semibold text-foreground font-mono uppercase tracking-wider">Executive Summary</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.executive}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary/50">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">No Analysis Yet</p>
                <p className="mt-1 text-xs text-muted-foreground max-w-[280px]">
                  Paste security logs or load an example, then click Analyze to generate an incident report.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
