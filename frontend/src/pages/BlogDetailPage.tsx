import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit2,
  Share2,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { BLOG_POSTS } from "@/data/blogPosts";

const CATEGORY_COLORS: Record<string, string> = {
  FHIR: "bg-blue-50 text-blue-700 border-blue-200",
  CQL: "bg-purple-50 text-purple-700 border-purple-200",
  "Prior Auth": "bg-green-50 text-green-700 border-green-200",
  "Care Gaps": "bg-teal-50 text-teal-700 border-teal-200",
  HL7: "bg-amber-50 text-amber-700 border-amber-200",
  CDS: "bg-red-50 text-red-700 border-red-200",
};

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post?.category,
  ).slice(0, 3);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-bisharod-mist flex flex-col items-center justify-center gap-4">
        <div className="text-4xl">📄</div>
        <p className="text-bisharod-navy font-semibold">Article not found</p>
        <p className="text-bisharod-navy/40 text-sm">
          This article may have been moved or deleted.
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="text-bisharod-teal flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={15} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bisharod-mist">
      {/* Hero */}
      <div className="bg-bisharod-navy">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <button
            onClick={() => navigate("/blog")}
            className="text-white/40 hover:text-bisharod-teal-light transition flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={14} /> Blog
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-7 pb-12">
          <span
            className={`text-xs px-3 py-1 border rounded-full font-semibold inline-flex items-center gap-1 mb-5 ${
              CATEGORY_COLORS[post.category] ??
              "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            <Tag size={10} />
            {post.category}
          </span>

          <h1 className="font-display text-3xl md:text-5xl text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bisharod-teal/20 border border-bisharod-teal/40 flex items-center justify-center">
                <User size={11} className="text-bisharod-teal" />
              </span>
              <span className="text-white/70 font-medium">
                {post.author_name}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {post.created_at}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.read_time}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition text-xs font-medium"
            >
              <Share2 size={13} />
              {copied ? "Link copied!" : "Share"}
            </button>
            {user && (
              <Link
                to={`/blog/${post.slug}/edit`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bisharod-teal text-bisharod-navy hover:bg-bisharod-teal-light transition text-xs font-semibold"
              >
                <Edit2 size={13} /> Edit Article
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
          {/* Article content */}
          <article
            className="
              prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-bisharod-navy
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-bisharod-navy/10 prose-h2:pb-2
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-bisharod-navy/75 prose-p:leading-relaxed
              prose-a:text-bisharod-teal prose-a:no-underline hover:prose-a:underline
              prose-strong:text-bisharod-navy prose-strong:font-semibold
              prose-em:text-bisharod-navy/80
              prose-code:text-bisharod-teal prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-bisharod-navy prose-pre:text-bisharod-teal-light prose-pre:rounded-xl prose-pre:text-sm
              prose-blockquote:border-l-4 prose-blockquote:border-bisharod-teal prose-blockquote:bg-bisharod-teal/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
              prose-ul:text-bisharod-navy/75 prose-ol:text-bisharod-navy/75 prose-li:text-bisharod-navy/75
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start space-y-5">
            <div className="bg-white border border-bisharod-navy/8 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/35 mb-3">
                Author
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bisharod-navy flex items-center justify-center shrink-0">
                  <span className="text-bisharod-teal font-bold text-sm">
                    {post.author_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-bisharod-navy text-sm">
                    {post.author_name}
                  </p>
                  <p className="text-xs text-bisharod-navy/40">Bisharod Team</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-bisharod-navy/8 rounded-xl p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-bisharod-navy/35 mb-1">
                Article Info
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-bisharod-navy/45">Category</span>
                <span className="font-medium text-bisharod-navy">
                  {post.category}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-bisharod-navy/45">Read time</span>
                <span className="font-medium text-bisharod-navy">
                  {post.read_time}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-bisharod-navy/45">Published</span>
                <span className="font-medium text-bisharod-navy">
                  {post.created_at}
                </span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-bisharod-navy/15 rounded-xl text-sm font-medium text-bisharod-navy hover:bg-bisharod-navy hover:text-white transition"
            >
              <Share2 size={14} />
              {copied ? "Link copied!" : "Share this article"}
            </button>
          </aside>
        </div>

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-bisharod-navy/10">
          <button
            onClick={() => navigate("/blog")}
            className="text-bisharod-teal hover:text-bisharod-teal-light transition flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to all articles
          </button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-bisharod-navy mb-6">
              More in <em className="text-bisharod-teal">{post.category}</em>
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="bg-white border border-bisharod-navy/8 rounded-xl p-5 hover:shadow-md hover:border-bisharod-teal/30 transition group"
                >
                  <div className="h-0.5 bg-bisharod-teal mb-4 w-8 group-hover:w-full transition-all duration-500" />
                  <span className="text-xs text-bisharod-teal font-semibold uppercase tracking-wide">
                    {r.category}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-bisharod-navy group-hover:text-bisharod-teal transition leading-snug">
                    {r.title}
                  </h3>
                  <div className="mt-3 text-xs text-bisharod-navy/40 flex items-center gap-1">
                    <Clock size={11} /> {r.read_time}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
