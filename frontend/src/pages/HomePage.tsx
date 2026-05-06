import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

const SERVICES = [
  'Prior Authorization',
  'Digital Quality Measures (HEDIS)',
  'CQL Authoring',
  'FHIR R4 / R5 / DSTU3 APIs',
  'HL7 v2 & v3 Integration',
  'Care Gap Analysis',
  'Clinical Decision Support',
]

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-bisharod-navy overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,184,156,0.13),transparent_70%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-bisharod-teal-light border border-bisharod-teal/30 bg-bisharod-teal/10 px-3 py-1.5 rounded-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-bisharod-teal animate-pulse-slow" />
              FHIR-Native Clinical Data Platform
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] mb-6">
              Clinical data services<br />
              built on <em className="text-bisharod-teal-light not-italic">open standards</em>
            </h1>

            <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-md">
              Bisharod specializes in digital health data services built on standard,
              interoperable FHIR healthcare data format.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="flex items-center gap-2 px-6 py-3 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded hover:bg-bisharod-teal-light transition-colors"
              >
                Explore Services <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 text-sm rounded hover:border-bisharod-teal hover:text-bisharod-teal-light transition-colors"
              >
                Access Portal
              </Link>
            </div>
          </div>

          {/* Services checklist */}
          <div className="bg-white/[0.04] border border-bisharod-teal/20 rounded-xl p-8 backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-bisharod-teal mb-6">
              Platform Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-3 text-white/80 text-sm">
                  <CheckCircle size={15} className="text-bisharod-teal shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10 flex gap-6">
              {[['FHIR', 'R4 · R5 · DSTU3'], ['CQL', 'v1.5.3 Normative'], ['HL7', 'v2 & v3']].map(([label, sub]) => (
                <div key={label}>
                  <p className="font-mono text-bisharod-teal-light font-medium">{label}</p>
                  <p className="text-white/35 text-[11px] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Welcome strip */}
      <section className="bg-bisharod-teal-pale border-y border-bisharod-teal/20 py-14 text-center px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-bisharod-teal mb-4">About Bisharod</p>
        <p className="text-bisharod-navy text-xl max-w-2xl mx-auto leading-relaxed">
          Bisharod specializes in <strong className="text-bisharod-teal">digital health data services</strong> built on
          standard, interoperable <strong className="text-bisharod-teal">FHIR healthcare data format</strong> — enabling
          healthcare organizations to exchange, analyze, and act on clinical information with confidence.
        </p>
      </section>
    </>
  )
}
