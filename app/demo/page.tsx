import type { Metadata } from "next"
import { DemoDashboard } from "@/components/demo-dashboard"
import { DemoNavbar } from "@/components/demo-navbar"

export const metadata: Metadata = {
  title: "IncidentIQ - Interactive Demo",
  description: "Try the IncidentIQ AI incident response copilot. Paste security logs and get instant threat analysis, MITRE ATT&CK mapping, and remediation guidance.",
}

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-background cyber-grid">
      <DemoNavbar />
      <div className="pt-16">
        <DemoDashboard />
      </div>
    </main>
  )
}
