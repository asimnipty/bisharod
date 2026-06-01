import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, Edit, Trash2 } from "lucide-react";

const API = "https://bisharod-api.onrender.com";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  created_at: string;
  read_time: string;
  author_id: string;
  author_name: string;
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("auth_token");
  const currentUserId = localStorage.getItem("user_id");
  const isAuthor = post && currentUserId && post.author_id === currentUserId;

  useEffect(() => {
    fetch(`${API}/api/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => {
        console.error(err);
        setError("Blog post not found");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;

    setDeleting(true);
    try {
      const response = await fetch(`${API}/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete blog");
      navigate("/blog");
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete blog post");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bisharod-mist flex items-center justify-center">
        <p className="text-bisharod-navy/60">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-bisharod-mist flex flex-col items-center justify-center">
        <p className="text-bisharod-navy/60 mb-4">
          {error || "Blog post not found"}
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="text-bisharod-teal hover:text-bisharod-teal-dark transition flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bisharod-mist">
      {/* Back button */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate("/blog")}
          className="text-bisharod-teal hover:text-bisharod-teal-dark transition flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>

      {/* Article Header */}
      <div className="bg-bisharod-navy text-white py-12 px-6 mt-4">
        <div className="max-w-3xl mx-auto">
          {/* Category */}
          <span className="text-xs px-3 py-1 bg-bisharod-teal text-bisharod-navy rounded-full font-semibold inline-block mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl mb-4 text-white">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {post.created_at}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> {post.read_time}
              </span>
            </div>
            <div className="text-sm text-white/60">
              By{" "}
              <span className="text-white font-semibold">
                {post.author_name}
              </span>
            </div>
          </div>

          {/* Edit/Delete buttons for author */}
          {isAuthor && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(`/blog/${post.slug}/edit`)}
                className="flex items-center gap-2 px-4 py-2 bg-bisharod-teal text-bisharod-navy rounded-lg text-sm font-semibold hover:bg-bisharod-teal-light transition"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50"
              >
                <Trash2 size={14} /> {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <article
          className="prose prose-lg max-w-none text-bisharod-navy"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Back button at bottom */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <button
          onClick={() => navigate("/blog")}
          className="text-bisharod-teal hover:text-bisharod-teal-dark transition flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    </div>
  );
}
