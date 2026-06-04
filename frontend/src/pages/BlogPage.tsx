import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Plus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { BLOG_POSTS } from "@/data/blogPosts";

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
  const [activeCategory, setActiveCategory] = useState("All");
  const { user } = useAuthStore();

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

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
        <p className="text-white/50 max-w-xl mx-auto text-sm">
          Practical guides, technical deep-dives, and industry insights on FHIR,
          CQL, and digital health interoperability.
        </p>
        {user && (
          <Link
            to="/blog/new"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-bisharod-teal text-bisharod-navy rounded-lg font-semibold text-sm hover:bg-bisharod-teal-light transition"
          >
            <Plus size={16} /> Write Article
          </Link>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                activeCategory === cat
                  ? "bg-bisharod-teal text-bisharod-navy border-bisharod-teal"
                  : "bg-white text-bisharod-navy/60 border-bisharod-navy/15 hover:border-bisharod-teal/40 hover:text-bisharod-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-bisharod-navy/40">
            No articles in this category yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-bisharod-navy/8 rounded-xl hover:shadow-lg hover:border-bisharod-teal/30 transition-all group flex flex-col"
              >
                <div className="h-1 bg-bisharod-teal rounded-t-xl" />
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`text-xs px-2.5 py-1 border rounded-md font-semibold self-start ${
                      CATEGORY_COLORS[post.category] ??
                      "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {post.category}
                  </span>
                  <h2 className="mt-3 text-bisharod-navy font-semibold leading-snug group-hover:text-bisharod-teal transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm mt-2 text-bisharod-navy/55 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-4 text-xs mt-4 text-bisharod-navy/40">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {post.created_at}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {post.read_time}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bisharod-teal hover:gap-2 transition-all"
                  >
                    Read article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
