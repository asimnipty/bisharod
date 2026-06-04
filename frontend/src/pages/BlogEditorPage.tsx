import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Loader } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const API = "https://bisharod-api.onrender.com";

const CATEGORIES = ["FHIR", "CQL", "Prior Auth", "Care Gaps", "HL7", "CDS"];

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
}

export function BlogEditorPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("CQL");
  const [loading, setLoading] = useState(!!slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API}/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((data: BlogPost) => {
        setTitle(data.title);
        setContent(data.content);
        setExcerpt(data.excerpt ?? "");
        setCategory(data.category);
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const method = slug ? "PUT" : "POST";
    const url = slug ? `${API}/api/blogs/${slug}` : `${API}/api/blogs`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, category, excerpt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      navigate(`/blog/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bisharod-mist flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-bisharod-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bisharod-mist">
      <div className="bg-bisharod-navy text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/blog")}
            className="text-bisharod-teal-light hover:text-bisharod-teal transition flex items-center gap-2 mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Blog
          </button>
          <h1 className="font-display text-3xl text-white">
            {slug ? "Edit Article" : "Write New Article"}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-bisharod-navy mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              required
              className="w-full px-4 py-3 border border-bisharod-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-bisharod-teal text-bisharod-navy"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-bisharod-navy mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-bisharod-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-bisharod-teal bg-white text-bisharod-navy"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-bisharod-navy mb-2">
              Excerpt{" "}
              <span className="text-bisharod-navy/40 font-normal">
                (optional — shown on blog listing)
              </span>
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary of the article…"
              rows={2}
              className="w-full px-4 py-3 border border-bisharod-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-bisharod-teal text-bisharod-navy text-sm"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-bisharod-navy mb-2">
              Content{" "}
              <span className="text-bisharod-navy/40 font-normal">
                (HTML supported)
              </span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article here. Use <p>, <h2>, <h3>, <strong>, <code>, <ul><li> etc."
              required
              rows={18}
              className="w-full px-4 py-3 border border-bisharod-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-bisharod-teal font-mono text-sm text-bisharod-navy"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-bisharod-teal text-bisharod-navy rounded-lg font-semibold hover:bg-bisharod-teal-light transition disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader size={16} className="animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <Save size={16} /> {slug ? "Update Post" : "Publish Post"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="px-6 py-3 border border-bisharod-navy/20 text-bisharod-navy rounded-lg font-semibold hover:bg-bisharod-mist transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
