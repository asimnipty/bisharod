import { Link } from 'react-router-dom'
import { ChevronLeft, ShieldCheck } from 'lucide-react'

export function PriorAuthPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-mist">
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/portal" className="flex items-center gap-1 hover:text-bisharod-teal transition-colors">
            <ChevronLeft size={12} /> Portal
          </Link>
          <span>/</span>
          <span className="text-bisharod-navy font-medium">Prior Authorization</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
            <ShieldCheck size={18} className="text-green-600" />
          </div>
          <h1 className="font-display text-2xl text-bisharod-navy">Prior Authorization</h1>
        </div>
        <p className="text-bisharod-navy/50 text-sm mb-8 ml-12">
          Submit and track PA requests using Da Vinci PAS IG.
        </p>
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center">
          <p className="text-bisharod-navy/40 text-sm">
            Build Claim bundles, submit ePriorAuth, and monitor real-time ClaimResponse status.
          </p>
        </div>
      </div>
    </div>
  )
}
