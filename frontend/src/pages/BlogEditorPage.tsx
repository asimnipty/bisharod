import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Loader } from "lucide-react";

const API = "https://bisharod-api.onrender.com";

const CATEGORIES = ["FHIR", "CQL", "Prior Auth", "Care Gaps", "HL7", "CDS"];

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  read_time: string;
  author_id: string;
  author_name: string;
}

export function BlogEditorPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("CQL");
  const [loading, setLoading] = useState(slug ? true : false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("auth_token") || "dev-token";

  useEffect(() => {
    if (slug) {
      // Load existing blog for editing
      fetch(`${API}/api/blogs/${slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Blog not found");
          return res.json();
        })
        .then((data: BlogPost) => {
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load blog post");
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const method = slug ? "PUT" : "POST";
      const url = slug ? `${API}/api/blogs/${slug}` : `${API}/api/blogs`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save blog");
      }

      const savedBlog: BlogPost = await response.json();
      navigate(`/blog/${savedBlog.slug}`);
    } catch (err) {
      console.error("Error saving blog:", err);
      setError(err instanceof Error ? err.message : "Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bisharod-mist flex items-center justify-center">
        <p className="text-bisharod-navy/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bisharod-mist">
      {/* Header */}
      <div className="bg-bisharod-navy text-white py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/blog")}
            className="text-bisharod-teal-light hover:text-bisharod-teal transition flex items-center gap-2 mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Blog
          </button>
          <h1 className="font-display text-3xl md:text-4xl text-white">
            {slug ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-white/60 mt-2">
            {slug
              ? "Update your blog post content"
              : "Share your insights with the community"}
          </p>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
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
              placeholder="Enter blog post title"
              required
              className="w-full px-4 py-3 border border-bisharod-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-bisharod-teal"
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
              className="w-full px-4 py-3 border border-bisharod-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-bisharod-teal bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-bisharod-navy mb-2">
              Content (HTML supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here. You can use HTML tags for formatting."
              required
              rows={15}
              className="w-full px-4 py-3 border border-bisharod-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-bisharod-teal font-mono text-sm"
            />
            <p className="text-xs text-bisharod-navy/50 mt-2">
              Tip: Use &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;strong&gt;, etc.
              for formatting
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-bisharod-teal text-white rounded-lg font-semibold hover:bg-bisharod-teal-dark transition disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader size={16} className="animate-spin" /> Saving...
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
