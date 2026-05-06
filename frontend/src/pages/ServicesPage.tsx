import { ShieldCheck, BarChart3, PenLine, RefreshCw, Network, Users, Zap, Code2 } from 'lucide-react'

const SERVICES = [
  {
    icon: ShieldCheck,
    title: 'Prior Authorization',
    desc: 'CMS-mandated ePriorAuth workflows using FHIR-based Da Vinci PAS implementation guides. Automate coverage determination.',
    tags: ['PAS IG', 'X12 278', 'CRD', 'DTR'],
  },
  {
    icon: BarChart3,
    title: 'Digital Quality Measures',
    desc: 'Migrate HEDIS measures to CMS-aligned dQMs powered by CQL and FHIR. Real-time care gap detection.',
    tags: ['HEDIS', 'eCQM', 'QI-Core', 'DEQM IG'],
  },
  {
    icon: PenLine,
    title: 'Authoring Capabilities',
    desc: 'Build, test, and publish computable clinical knowledge using MAT and CQL. Author eCQMs and FHIR Library resources.',
    tags: ['MAT', 'ELM', 'VSAC', 'FHIR Library'],
  },
  {
    icon: RefreshCw,
    title: 'FHIR API Upgradation',
    desc: 'Migrate systems to FHIR DSTU3, R4, and R5 APIs with backward compatibility and full IG conformance.',
    tags: ['DSTU3', 'R4', 'R5', 'SMART on FHIR'],
  },
  {
    icon: Network,
    title: 'HL7 v2 & v3 Integration',
    desc: 'Bidirectional translation between legacy HL7 v2/v3 messages and modern FHIR R4 resources.',
    tags: ['ADT', 'ORM/ORU', 'CDA', 'MLLP'],
  },
  {
    icon: Users,
    title: 'Care Gap Analysis',
    desc: 'CQL-driven care gap identification across patient populations via FHIR $care-gaps operation in real time.',
    tags: ['Gap in Care', '$care-gaps', 'DEQM IG'],
  },
  {
    icon: Zap,
    title: 'Clinical Decision Support',
    desc: 'Real-time CDS Hooks at the point of care — powered by CQL logic evaluated against live FHIR patient data.',
    tags: ['CDS Hooks', 'PlanDefinition', 'CPGs'],
  },
  {
    icon: Code2,
    title: 'CQL — Clinical Quality Language',
    desc: 'The HL7 ANSI normative standard that transforms clinical guidelines into machine-executable logic for quality programs.',
    tags: ['CQL 1.5.3', 'ELM', 'FHIR-native'],
  },
]

export function ServicesPage() {
  return (
    <div className="bg-bisharod-mist min-h-screen">
      {/* Header */}
      <div className="bg-bisharod-navy py-20 px-6 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-bisharod-teal block mb-4">
          Platform Services
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
          What we <em className="text-bisharod-teal-light">deliver</em>
        </h1>
        <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
          End-to-end FHIR-based services spanning regulatory compliance, quality measurement,
          integration, and clinical intelligence.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc, tags }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-xl p-6 group hover:border-bisharod-teal/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-bisharod-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

              <div className="w-10 h-10 rounded-lg bg-bisharod-teal-pale flex items-center justify-center mb-4">
                <Icon size={18} className="text-bisharod-teal" />
              </div>

              <h3 className="font-semibold text-bisharod-navy text-sm mb-2 leading-snug">{title}</h3>
              <p className="text-bisharod-navy/50 text-xs leading-relaxed mb-4">{desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-bisharod-teal bg-bisharod-teal/8 border border-bisharod-teal/20 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
