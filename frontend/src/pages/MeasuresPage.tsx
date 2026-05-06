import { Link } from 'react-router-dom'
import { ChevronLeft, BarChart3 } from 'lucide-react'

export function MeasuresPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-mist">
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/portal" className="flex items-center gap-1 hover:text-bisharod-teal transition-colors">
            <ChevronLeft size={12} /> Portal
          </Link>
          <span>/</span>
          <span className="text-bisharod-navy font-medium">Quality Measures</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <BarChart3 size={18} className="text-blue-500" />
          </div>
          <h1 className="font-display text-2xl text-bisharod-navy">Quality Measures</h1>
        </div>
        <p className="text-bisharod-navy/50 text-sm mb-8 ml-12">
          Evaluate HEDIS &amp; digital quality measures via FHIR <code className="font-mono text-bisharod-teal">$evaluate-measure</code>.
        </p>
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center">
          <p className="text-bisharod-navy/40 text-sm">
            Browse Measure resources, trigger evaluations, and download MeasureReport FHIR bundles.
          </p>
        </div>
      </div>
    </div>
  )
}
