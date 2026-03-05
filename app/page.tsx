import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { PipelineVisualization } from "@/components/pipeline-visualization"
import { ExampleReport } from "@/components/example-report"
import { EarlyAccess } from "@/components/early-access"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PipelineVisualization />
      <ExampleReport />
      <EarlyAccess />
      <Footer />
    </main>
  )
}
