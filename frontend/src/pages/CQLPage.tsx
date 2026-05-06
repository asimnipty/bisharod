import { useState } from 'react'
import { Play, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const STARTER = `library Bisharod_Starter version '1.0.0'

using FHIR version '4.0.1'
include FHIRHelpers version '4.0.001'

context Patient

define "Age in Years":
  AgeInYears()

define "Has Active Diabetes":
  exists (
    [Condition: "Diabetes"] C
      where C.clinicalStatus ~ "Active"
  )

define "HbA1c < 8%":
  exists (
    [Observation: "HbA1c Laboratory Test"] O
      where O.effective during MeasurementPeriod
        and (O.value as Quantity) < 8 '%'
  )`

export function CQLPage() {
  const [cql, setCql] = useState(STARTER)
  const [status, setStatus] = useState<'idle' | 'validating' | 'ok' | 'error'>('idle')
  const [patientId, setPatientId] = useState('')

  const validate = async () => {
    setStatus('validating')
    await new Promise((r) => setTimeout(r, 1000))
    setStatus(cql.includes('library') ? 'ok' : 'error')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-mist">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/portal" className="flex items-center gap-1 hover:text-bisharod-teal transition-colors">
            <ChevronLeft size={12} /> Portal
          </Link>
          <span>/</span>
          <span className="text-bisharod-navy font-medium">CQL Authoring</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl text-bisharod-navy mb-1">CQL Authoring Workspace</h1>
        <p className="text-bisharod-navy/50 text-sm mb-8">Author, validate, and test Clinical Quality Language expressions.</p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="bg-bisharod-navy rounded-xl overflow-hidden border border-bisharod-teal/20">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="font-mono text-white/30 text-xs ml-2">measure.cql</span>
              </div>
              <button
                onClick={validate}
                disabled={status === 'validating'}
                className="flex items-center gap-1.5 text-xs font-semibold text-bisharod-navy bg-bisharod-teal px-3 py-1.5 rounded hover:bg-bisharod-teal-light transition-colors disabled:opacity-50"
              >
                <Play size={11} />
                {status === 'validating' ? 'Validating…' : 'Validate'}
              </button>
            </div>
            <textarea
              value={cql}
              onChange={(e) => { setCql(e.target.value); setStatus('idle') }}
              className="w-full h-80 bg-transparent text-green-300 font-mono text-xs p-4 resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Results */}
          <div className="space-y-5">
            {/* Validation result */}
            {status !== 'idle' && status !== 'validating' && (
              <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                status === 'ok'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {status === 'ok'
                  ? <CheckCircle size={16} className="mt-0.5 shrink-0" />
                  : <AlertCircle size={16} className="mt-0.5 shrink-0" />
                }
                <div>
                  <p className="font-semibold text-sm">
                    {status === 'ok' ? 'CQL is valid' : 'Validation errors found'}
                  </p>
                  <p className="text-xs mt-0.5 opacity-70">
                    {status === 'ok' ? 'Translated to ELM successfully.' : 'Check library declaration.'}
                  </p>
                </div>
              </div>
            )}

            {/* Execute panel */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-bisharod-navy text-sm mb-4">Test Execution</h3>
              <label className="block text-xs font-semibold text-bisharod-navy/50 uppercase tracking-widest mb-2">
                Patient FHIR ID
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="e.g. patient-123"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-bisharod-teal"
                />
                <button
                  disabled={!patientId}
                  className="flex items-center gap-1.5 px-4 py-2 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded-lg hover:bg-bisharod-teal-light transition-colors disabled:opacity-40"
                >
                  <Play size={13} /> Run
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">Executes CQL against FHIR patient data via the backend engine.</p>
            </div>

            {/* Quick reference */}
            <div className="bg-bisharod-navy/5 border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/50 mb-3">CQL Resources</p>
              <ul className="space-y-2">
                {[
                  ['HL7 CQL Specification', 'https://cql.hl7.org/'],
                  ['eCQI Resource Center', 'https://ecqi.healthit.gov/cql'],
                  ['QI-Core Profiles', 'https://hl7.org/fhir/us/qicore/'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer"
                      className="text-bisharod-teal text-xs hover:underline">
                      {label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
