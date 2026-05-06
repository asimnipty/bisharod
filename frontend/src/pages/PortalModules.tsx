import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

function PageShell({ title, desc, children }: { title: string; desc: string; children?: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-mist">
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/portal" className="flex items-center gap-1 hover:text-bisharod-teal">
            <ChevronLeft size={12} /> Portal
          </Link>
          <span>/</span>
          <span className="text-bisharod-navy font-medium">{title}</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-display text-2xl text-bisharod-navy mb-1">{title}</h1>
        <p className="text-bisharod-navy/50 text-sm mb-8">{desc}</p>
        {children}
      </div>
    </div>
  )
}

export function CareGapsPage() {
  return (
    <PageShell title="Care Gap Analysis" desc="CQL-driven gap identification via FHIR $care-gaps operation.">
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-bisharod-navy/40 text-sm">
        Filter by period, topic, and organization — then run analysis against the FHIR server.
      </div>
    </PageShell>
  )
}

export function MeasuresPage() {
  return (
    <PageShell title="Quality Measures" desc="Evaluate HEDIS and digital quality measures via $evaluate-measure.">
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-bisharod-navy/40 text-sm">
        Browse Measure resources, trigger evaluations, and download MeasureReport FHIR bundles.
      </div>
    </PageShell>
  )
}

export function PriorAuthPage() {
  return (
    <PageShell title="Prior Authorization" desc="Submit and track PA requests using Da Vinci PAS IG.">
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-bisharod-navy/40 text-sm">
        Build Claim bundles, submit ePriorAuth, and monitor real-time ClaimResponse status.
      </div>
    </PageShell>
  )
}
