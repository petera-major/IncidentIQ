import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-foreground">
            Incident<span className="text-primary">IQ</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {'\u00A9'} 2026 IncidentIQ. AI-Powered Incident Response.
        </p>
      </div>
    </footer>
  )
}
