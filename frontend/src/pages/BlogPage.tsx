import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const POSTS = [
  {
    id: 1,
    title: "Getting Started with CQL for HEDIS Measures",
    excerpt:
      "Clinical Quality Language (CQL) is transforming how healthcare organizations implement digital quality measures. Learn how to author your first CQL expression for HEDIS compliance.",
    category: "CQL",
    date: "May 5, 2026",
    readTime: "8 min read",
    slug: "getting-started-cql-hedis",
  },
  {
    id: 2,
    title: "FHIR R4 vs R5: What Healthcare Teams Need to Know",
    excerpt:
      "The transition from FHIR R4 to R5 brings significant improvements in interoperability and data modeling. Here is what your team needs to prepare for.",
    category: "FHIR",
    date: "April 28, 2026",
    readTime: "6 min read",
    slug: "fhir-r4-vs-r5",
  },
  {
    id: 3,
    title: "Prior Authorization Automation with Da Vinci PAS",
    excerpt:
      "CMS mandates are driving payers and providers to implement electronic prior authorization. The Da Vinci PAS implementation guide provides the blueprint.",
    category: "Prior Auth",
    date: "April 15, 2026",
    readTime: "10 min read",
    slug: "prior-auth-da-vinci-pas",
  },
  {
    id: 4,
    title: "Care Gap Analysis Using FHIR $care-gaps Operation",
    excerpt:
      "Identifying care gaps at population scale is now possible with the FHIR $care-gaps operation. Learn how to implement it using CQL-defined quality measures.",
    category: "Care Gaps",
    date: "April 2, 2026",
    readTime: "7 min read",
    slug: "care-gap-analysis-fhir",
  },
  {
    id: 5,
    title: "HL7 v2 to FHIR Migration: A Practical Guide",
    excerpt:
      "Most healthcare organizations still rely on HL7 v2 messages for lab results, ADT events, and orders. Here is how to bridge legacy systems to modern FHIR APIs.",
    category: "HL7",
    date: "March 20, 2026",
    readTime: "12 min read",
    slug: "hl7-v2-fhir-migration",
  },
  {
    id: 6,
    title: "Clinical Decision Support with CDS Hooks",
    excerpt:
      "CDS Hooks enables real-time clinical decision support integrated directly into EHR workflows. Learn how to build and deploy CDS services using FHIR and CQL.",
    category: "CDS",
    date: "March 8, 2026",
    readTime: "9 min read",
    slug: "clinical-decision-support-cds-hooks",
  },
];

const CATEGORIES = [
  "All",
  "FHIR",
  "CQL",
  "Prior Auth",
  "Care Gaps",
  "HL7",
  "CDS",
];

const CATEGORY_COLORS: Record<string, string> = {
  FHIR: "bg-blue-50 text-blue-700 border-blue-200",
  CQL: "bg-purple-50 text-purple-700 border-purple-200",
  "Prior Auth": "bg-green-50 text-green-700 border-green-200",
  "Care Gaps":
    "bg-bisharod-teal-pale text-bisharod-teal border-bisharod-teal/20",
  HL7: "bg-amber-50 text-amber-700 border-amber-200",
  CDS: "bg-red-50 text-red-700 border-red-200",
};

export function BlogPage() {
  return (
    <div className="min-h-screen bg-bisharod-mist">
      {/* Hero */}
      <div className="bg-bisharod-navy py-20 px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-bisharod-teal block mb-4">
          Blog & Articles
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
          Clinical data <em className="text-bisharod-teal-light">insights</em>
        </h1>
        <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
          Practical guides, technical deep-dives, and industry insights on FHIR,
          CQL, quality measures, and digital health interoperability.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-bisharod-navy/60 hover:border-bisharod-teal hover:text-bisharod-teal transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* Color bar */}
              <div className="h-1 bg-bisharod-teal" />

              <div className="p-6">
                {/* Category */}
                <span
                  className={`inline-block text-xs font-semibold font-mono px-2.5 py-1 rounded border mb-4 ${CATEGORY_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
                >
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="font-semibold text-bisharod-navy text-base leading-snug mb-3 group-hover:text-bisharod-teal transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-bisharod-navy/50 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-bisharod-navy/40 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                {/* Read more */}
                <button className="flex items-center gap-1.5 text-xs font-semibold text-bisharod-teal hover:gap-2.5 transition-all">
                  Read article <ArrowRight size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-bisharod-navy rounded-xl p-10 text-center">
          <h3 className="font-display text-2xl text-white mb-3">
            Stay up to date
          </h3>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Get the latest insights on FHIR, CQL, and digital health
            interoperability delivered to your inbox.
          </p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-bisharod-teal"
            />
            <button className="px-5 py-2.5 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded-lg hover:bg-bisharod-teal-light transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
