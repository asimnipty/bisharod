import { useState } from 'react'
import { Play, CheckCircle, AlertCircle, ChevronLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cqlApi } from '@/api/fhirClient'

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

type Status = 'idle' | 'loading' | 'ok' | 'error'

export function CQLPage() {
  const [cql, setCql]           = useState(STARTER)
  const [status, setStatus]     = useState<Status>('idle')
  const [result, setResult]     = useState<any>(null)
  const [errors, setErrors]     = useState<string[]>([])
  const [patientId, setPatientId] = useState('')
  const [execResult, setExecResult] = useState<any>(null)
  const [execLoading, setExecLoading] = useState(false)

  const validate = async () => {
    setStatus('loading')
    setErrors([])
    setResult(null)
    try {
      const data = await cqlApi.validate(cql)
      setResult(data)
      setErrors(data.errors ?? [])
      setStatus(data.valid ? 'ok' : 'error')
    } catch (err: any) {
      setErrors([err?.response?.data?.error ?? 'Backend unreachable'])
      setStatus('error')
    }
  }

  const execute = async () => {
    setExecLoading(true)
    setExecResult(null)
    try {
      const data = await cqlApi.execute(cql, patientId)
      setExecResult(data)
    } catch (err: any) {
      setExecResult({ error: err?.response?.data?.error ?? 'Execution failed' })
    }
    setExecLoading(false)
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
        <p className="text-bisharod-navy/50 text-sm mb-8">
          Author, validate, and execute Clinical Quality Language expressions against the backend engine.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="bg-bisharod-navy rounded-xl overflow-hidden border border-bisharod-teal/20">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="font-mono text-white/30 text-xs ml-2">measure.cql</span>
              </div>
              <button
                onClick={validate}
                disabled={status === 'loading'}
                className="flex items-center gap-1.5 text-xs font-semibold text-bisharod-navy bg-bisharod-teal px-3 py-1.5 rounded hover:bg-bisharod-teal-light transition-colors disabled:opacity-50"
              >
                {status === 'loading'
                  ? <><Loader2 size={11} className="animate-spin" /> Validating…</>
                  : <><Play size={11} /> Validate</>
                }
              </button>
            </div>
            <textarea
              value={cql}
              onChange={e => { setCql(e.target.value); setStatus('idle') }}
              className="w-full h-80 bg-transparent text-green-300 font-mono text-xs p-4 resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Results panel */}
          <div className="space-y-4">

            {/* Validation result */}
            {status !== 'idle' && status !== 'loading' && (
              <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                status === 'ok'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {status === 'ok'
                  ? <CheckCircle size={16} className="mt-0.5 shrink-0" />
                  : <AlertCircle size={16} className="mt-0.5 shrink-0" />
                }
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {status === 'ok' ? 'CQL is valid ✅' : 'Validation failed'}
                  </p>
                  {errors.length > 0 && (
                    <ul className="mt-1 space-y-1">
                      {errors.map((e, i) => (
                        <li key={i} className="text-xs font-mono">{e}</li>
                      ))}
                    </ul>
                  )}
                  {result?.warnings?.length > 0 && (
                    <p className="text-xs mt-1 opacity-70">{result.warnings[0]}</p>
                  )}
                </div>
              </div>
            )}

            {/* Execute panel */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-bisharod-navy text-sm mb-4">
                Test Execution
                <span className="ml-2 text-xs font-normal text-bisharod-navy/40">
                  → bisharod-api.onrender.com
                </span>
              </h3>
              <label className="block text-xs font-semibold text-bisharod-navy/50 uppercase tracking-widest mb-2">
                Patient FHIR ID
              </label>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={patientId}
                  onChange={e => setPatientId(e.target.value)}
                  placeholder="e.g. patient-123"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-bisharod-teal"
                />
                <button
                  onClick={execute}
                  disabled={!patientId || execLoading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded-lg hover:bg-bisharod-teal-light transition-colors disabled:opacity-40"
                >
                  {execLoading
                    ? <Loader2 size={13} className="animate-spin" />
                    : <Play size={13} />
                  }
                  Run
                </button>
              </div>

              {execResult && (
                <pre className="bg-bisharod-navy text-green-300 font-mono text-xs p-4 rounded-lg overflow-auto max-h-48">
                  {JSON.stringify(execResult, null, 2)}
                </pre>
              )}
            </div>

            {/* API status */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/50 mb-3">
                Backend Connection
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-bisharod-navy/60">
                  {import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'}
                </span>
              </div>
              <p className="text-xs text-bisharod-navy/40 mt-2">
                CQL requests route to Express → CQL Translation Service → FHIR
              </p>
            </div>

            {/* Resources */}
            <div className="bg-bisharod-navy/5 border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/50 mb-3">
                CQL Resources
              </p>
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
