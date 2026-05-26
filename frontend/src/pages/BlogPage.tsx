import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogApi } from "@/api/fhirClient"; // Import the blog API

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch blog posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

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
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat
                  ? "border-bisharod-teal text-bisharod-teal bg-bisharod-teal/5"
                  : "border-gray-200 bg-white text-bisharod-navy/60 hover:border-bisharod-teal hover:text-bisharod-teal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-bisharod-navy/50">Loading blog posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200 text-red-600">
            {error}
          </div>
        )}

        {/* No Posts State */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-bisharod-navy/50">No blog posts found.</p>
          </div>
        )}

        {/* Posts grid */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                {/* Color bar */}
                <div className="h-1 bg-bisharod-teal" />

                <div className="p-6">
                  {/* Category */}
                  <span
                    className={`inline-block text-xs font-semibold font-mono px-2.5 py-1 rounded border mb-4 ${
                      CATEGORY_COLORS[post.category] ??
                      "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
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
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-bisharod-teal hover:gap-2.5 transition-all"
                  >
                    Read article <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

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
