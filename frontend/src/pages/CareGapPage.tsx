import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Users, Search, Loader2 } from 'lucide-react'
import { careGapApi } from '@/api/fhirClient'

export function CareGapPage() {
  const [periodStart, setPeriodStart] = useState('2024-01-01')
  const [periodEnd, setPeriodEnd]     = useState('2024-12-31')
  const [topic, setTopic]             = useState('all')
  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState<any>(null)
  const [error, setError]             = useState('')

  const run = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const data = await careGapApi.run({ periodStart, periodEnd, topic })
      setResult(data)
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Backend unreachable — is bisharod-api.onrender.com running?')
    }
    setLoading(false)
  }

  // Demo rows to show while backend FHIR server isn't connected
  const DEMO = [
    { measure: 'Diabetes HbA1c Control',      topic: 'Diabetes',       denominator: 1240, gaps: 312, pct: 25.2 },
    { measure: 'Colorectal Cancer Screening',  topic: 'Preventive',     denominator: 890,  gaps: 178, pct: 20.0 },
    { measure: 'Breast Cancer Screening',      topic: 'Preventive',     denominator: 640,  gaps: 96,  pct: 15.0 },
    { measure: 'Blood Pressure Control',       topic: 'Cardiovascular', denominator: 2100, gaps: 630, pct: 30.0 },
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-mist">
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/portal" className="flex items-center gap-1 hover:text-bisharod-teal transition-colors">
            <ChevronLeft size={12} /> Portal
          </Link>
          <span>/</span>
          <span className="text-bisharod-navy font-medium">Care Gap Analysis</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-bisharod-teal-pale flex items-center justify-center">
            <Users size={18} className="text-bisharod-teal" />
          </div>
          <h1 className="font-display text-2xl text-bisharod-navy">Care Gap Analysis</h1>
        </div>
        <p className="text-bisharod-navy/50 text-sm mb-8 ml-12">
          CQL-driven population gap identification via{' '}
          <code className="font-mono text-bisharod-teal">POST /api/care-gaps</code>
          {' → '}
          <span className="text-bisharod-teal/70">bisharod-api.onrender.com</span>
        </p>

        {/* Filters */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-bisharod-navy/50 uppercase tracking-widest mb-1.5">Period Start</label>
            <input type="date" value={periodStart} onChange={e => setPeriodStart(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-bisharod-teal" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-bisharod-navy/50 uppercase tracking-widest mb-1.5">Period End</label>
            <input type="date" value={periodEnd} onChange={e => setPeriodEnd(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-bisharod-teal" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-bisharod-navy/50 uppercase tracking-widest mb-1.5">Topic</label>
            <select value={topic} onChange={e => setTopic(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-bisharod-teal">
              <option value="all">All Topics</option>
              <option value="diabetes">Diabetes</option>
              <option value="cardiovascular">Cardiovascular</option>
              <option value="preventive">Preventive Care</option>
            </select>
          </div>
          <button onClick={run} disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded-lg hover:bg-bisharod-teal-light transition-colors disabled:opacity-50">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            {loading ? 'Calling API…' : 'Run Analysis'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* API response */}
        {result && (
          <div className="bg-bisharod-navy text-green-300 font-mono text-xs p-4 rounded-xl mb-6">
            <p className="text-white/40 mb-2">// Response from bisharod-api.onrender.com/api/care-gaps</p>
            {JSON.stringify(result, null, 2)}
          </div>
        )}

        {/* Demo data table */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/40 mb-3">
            Sample Data — wire HAPI FHIR server to get real results
          </p>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bisharod-navy text-white/70 text-xs uppercase tracking-widest">
                  <th className="text-left px-5 py-3 font-semibold">Measure</th>
                  <th className="text-left px-5 py-3 font-semibold">Topic</th>
                  <th className="text-right px-5 py-3 font-semibold">Denominator</th>
                  <th className="text-right px-5 py-3 font-semibold">Gaps</th>
                  <th className="text-right px-5 py-3 font-semibold">Gap %</th>
                </tr>
              </thead>
              <tbody>
                {DEMO.map((r, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-bisharod-mist transition-colors">
                    <td className="px-5 py-3 font-medium text-bisharod-navy">{r.measure}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-mono text-bisharod-teal bg-bisharod-teal/8 border border-bisharod-teal/20 px-2 py-0.5 rounded">{r.topic}</span>
                    </td>
                    <td className="px-5 py-3 text-right text-bisharod-navy/60">{r.denominator.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-bisharod-navy/60">{r.gaps.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`font-semibold ${r.pct > 25 ? 'text-red-500' : r.pct > 15 ? 'text-amber-500' : 'text-green-600'}`}>
                        {r.pct.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
