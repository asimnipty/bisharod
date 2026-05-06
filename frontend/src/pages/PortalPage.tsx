import { Link } from 'react-router-dom'
import { Code2, BarChart3, Users, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const MODULES = [
  { icon: Code2,      label: 'CQL Authoring',        desc: 'Write, validate, and execute CQL expressions', to: '/portal/cql',        color: 'text-purple-500',  bg: 'bg-purple-50' },
  { icon: Users,      label: 'Care Gap Analysis',     desc: 'Population-level gap identification',          to: '/portal/care-gaps',  color: 'text-bisharod-teal', bg: 'bg-bisharod-teal-pale' },
  { icon: BarChart3,  label: 'Quality Measures',      desc: 'Evaluate HEDIS & digital quality measures',   to: '/portal/measures',   color: 'text-blue-500',    bg: 'bg-blue-50' },
  { icon: ShieldCheck,label: 'Prior Authorization',   desc: 'Submit and track PA requests',                 to: '/portal/prior-auth', color: 'text-green-600',   bg: 'bg-green-50' },
]

export function PortalPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-mist">
      {/* Header */}
      <div className="bg-bisharod-navy px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-bisharod-teal text-xs font-semibold uppercase tracking-widest mb-2">Bisharod Portal</p>
          <h1 className="font-display text-3xl text-white mb-1">
            Welcome back, {user?.name?.split(' ')[0] ?? 'User'}
          </h1>
          <p className="text-white/40 text-sm">
            {user?.role} · {user?.organizationId}
          </p>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/50 mb-6">Modules</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {MODULES.map(({ icon: Icon, label, desc, to, color, bg }) => (
            <Link
              key={to}
              to={to}
              className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-6 hover:border-bisharod-teal/40 hover:shadow-md transition-all group"
            >
              <div className={`w-11 h-11 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-bisharod-navy text-sm mb-1">{label}</h3>
                <p className="text-bisharod-navy/50 text-xs leading-relaxed">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-bisharod-teal transition-colors mt-1 shrink-0" />
            </Link>
          ))}
        </div>

        {/* Standards strip */}
        <div className="mt-12 bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/50 mb-4">Active Standards</p>
          <div className="flex flex-wrap gap-2">
            {['FHIR R4','FHIR R5','CQL 1.5.3','QI-Core','US Core','DEQM IG','Da Vinci PAS','CDS Hooks v2','SMART on FHIR','HL7 v2.x','C-CDA','VSAC'].map((s) => (
              <span key={s} className="font-mono text-[11px] text-bisharod-teal border border-bisharod-teal/25 bg-bisharod-teal/5 px-2.5 py-1 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
