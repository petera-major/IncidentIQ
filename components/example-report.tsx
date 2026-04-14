import { AlertTriangle, Shield, CheckCircle, FileText, Lock } from "lucide-react"

export function ExampleReport() {
  return (
    <section id="report" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-wider text-destructive uppercase">Intelligence Output</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl text-balance">Example Incident Report</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            See what an AI-generated threat intelligence briefing looks like.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-destructive/5 px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-destructive" />
                  <span className="text-xs font-mono font-bold tracking-widest text-destructive uppercase">
                    IncidentIQ Incident Report
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">INC-2026-0342</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 border-b border-border p-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Threat Level</p>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-1 text-sm font-bold text-destructive mt-1">
                    HIGH
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Confidence</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full w-[86%] rounded-full bg-warning" />
                  </div>
                  <span className="text-sm font-bold text-warning font-mono">86%</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-primary font-mono uppercase tracking-wider">Incident Summary</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4">
                  Encoded PowerShell command executed from WINWORD.EXE suggesting possible macro-based malware delivery.
                  The obfuscated command attempts to download and execute a remote payload, consistent with
                  a living-off-the-land binary (LOLBin) attack pattern.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold text-accent font-mono uppercase tracking-wider">{'MITRE ATT&CK'}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-mono text-accent-foreground">
                    <span className="text-accent font-bold">Execution</span>
                    T1059.001 - PowerShell
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-mono text-accent-foreground">
                    <span className="text-accent font-bold">Defense Evasion</span>
                    T1027 - Obfuscated Files
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-warning/30 bg-warning/10 px-3 py-1.5 text-xs font-mono text-foreground">
                    <span className="text-warning font-bold">Initial Access</span>
                    T1566.001 - Spearphishing
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-chart-5" />
                  <h3 className="text-sm font-semibold text-chart-5 font-mono uppercase tracking-wider">Recommended Response</h3>
                </div>
                <div className="space-y-2">
                  {[
                    "Isolate affected host from network immediately",
                    "Rotate all compromised credentials",
                    "Block suspicious IP at perimeter firewall",
                    "Review PowerShell execution logs for lateral movement",
                    "Scan endpoints for indicators of compromise",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-md bg-secondary/50 px-3 py-2">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-chart-5/30 bg-chart-5/10 text-xs font-mono text-chart-5">
                        {i + 1}
                      </div>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <h3 className="mb-2 text-sm font-semibold text-foreground font-mono uppercase tracking-wider">Executive Summary</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A potentially malicious document was opened by an employee, triggering hidden code execution
                  on their workstation. The attack appears to be an initial compromise attempt that could lead to
                  data exfiltration or ransomware deployment. Immediate containment actions have been recommended
                  and should be executed within the next 30 minutes to prevent lateral movement across the network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
