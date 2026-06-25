import { Users, Target, Globe, Award } from "lucide-react";

const TEAM = [
  {
    name: "Md Nazmul Karim",
    role: "Co-Founder",
    email: "nazmul@bisharod.com",
    bio: "Digital health data expert with 10+ years experience in software development, 4+ years in FHIR & clinical data services",
  },
  {
    name: "Md Jahid Iqbal",
    role: "Co-Founder & Manager",
    email: "jahid@bisharod.com",
    bio: "Results-driven Technical Manager with 15+ years of experience ",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Precision",
    desc: "Clinical data must be exact. We build with standards-first precision.",
  },
  {
    icon: Globe,
    title: "Interoperability",
    desc: "Open FHIR standards mean your data works everywhere.",
  },
  {
    icon: Award,
    title: "Quality",
    desc: "HEDIS measures and digital quality programs at the core of everything.",
  },
  {
    icon: Users,
    title: "Partnership",
    desc: "We work alongside your team, not just for them.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-bisharod-navy py-24 px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-bisharod-teal block mb-4">
          About Bisharod
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-6">
          Built for <em className="text-bisharod-teal-light">clinical data</em>{" "}
          excellence
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
          Bisharod specializes in digital health data services built on
          standard, interoperable FHIR healthcare data format — enabling
          healthcare organizations to exchange, analyze, and act on clinical
          information with confidence.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-bisharod-teal block mb-4">
              Our Mission
            </span>
            <h2 className="font-display text-3xl text-bisharod-navy mb-6">
              Making clinical data computable and interoperable
            </h2>
            <p className="text-bisharod-navy/60 leading-relaxed mb-4">
              Healthcare organizations struggle with fragmented,
              non-standardized clinical data. Bisharod bridges that gap by
              implementing FHIR-native services that make data computable,
              shareable, and actionable.
            </p>
            <p className="text-bisharod-navy/60 leading-relaxed">
              From prior authorization to digital quality measures, we help
              payers, providers, and health IT teams modernize their data
              infrastructure using open standards like FHIR, CQL, and HL7.
            </p>
          </div>
          <div className="bg-bisharod-teal-pale border border-bisharod-teal/20 rounded-xl p-8">
            <div className="space-y-4">
              {[
                ["FHIR R4 / R5", "Latest interoperability standards"],
                ["CQL v1.5.3", "ANSI normative quality language"],
                ["HEDIS / dQM", "Digital quality measures"],
                ["Da Vinci IGs", "Prior authorization & CDex"],
                ["CDS Hooks", "Real-time decision support"],
              ].map(([label, desc]) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-bisharod-teal shrink-0" />
                  <div>
                    <span className="font-mono text-sm font-medium text-bisharod-navy">
                      {label}
                    </span>
                    <span className="text-bisharod-navy/50 text-sm">
                      {" "}
                      — {desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-bisharod-mist py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-bisharod-teal block mb-4 text-center">
            Our Values
          </span>
          <h2 className="font-display text-3xl text-bisharod-navy text-center mb-12">
            What drives us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-bisharod-teal-pale flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-bisharod-teal" />
                </div>
                <h3 className="font-semibold text-bisharod-navy mb-2">
                  {title}
                </h3>
                <p className="text-bisharod-navy/50 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-bisharod-teal block mb-4 text-center">
          Our Team
        </span>
        <h2 className="font-display text-3xl text-bisharod-navy text-center mb-12">
          The people behind Bisharod
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {TEAM.map(({ name, role, email, bio }) => (
            <div
              key={name}
              className="bg-bisharod-mist border border-gray-100 rounded-xl p-6"
            >
              <div className="w-14 h-14 rounded-full bg-bisharod-navy flex items-center justify-center mb-4">
                <span className="text-bisharod-teal font-display text-xl">
                  {name[0]}
                </span>
              </div>
              <h3 className="font-semibold text-bisharod-navy mb-1">{name}</h3>
              <p className="text-bisharod-teal text-xs font-semibold uppercase tracking-widest mb-3">
                {role}
              </p>

              {/* Email */}
              <p className="text-sm text-bisharod-teal mb-3">{email}</p>

              <p className="text-bisharod-navy/50 text-sm leading-relaxed">
                {bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-bisharod-navy py-20 px-6 text-center">
        <h2 className="font-display text-3xl text-white mb-4">
          Ready to modernize your clinical data?
        </h2>
        <p className="text-white/50 mb-8 max-w-lg mx-auto">
          Let's talk about how Bisharod can help your organization implement
          FHIR-native data services.
        </p>
        <a
          href="mailto:info@bisharod.com"
          className="inline-flex items-center gap-2 px-8 py-3 bg-bisharod-teal text-bisharod-navy font-semibold rounded hover:bg-bisharod-teal-light transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
