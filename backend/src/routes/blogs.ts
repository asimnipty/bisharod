import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

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

// In-memory storage (replace with database in production)
let blogs: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with CQL for HEDIS Measures",
    slug: "getting-started-cql-hedis",
    content: `
      <p>Clinical Quality Language (CQL) is transforming healthcare...</p>
      <h2>Why CQL matters</h2>
      <p>CQL enables standardized logic...</p>
    `,
    category: "CQL",
    created_at: "May 5, 2026",
    updated_at: "May 5, 2026",
    read_time: "8 min read",
    author_id: "system",
    author_name: "Bisharod Team",
  },
];

let nextId = 2;

// ✅ GET all blogs
router.get("/", async (req, res) => {
  res.json(blogs);
});

// ✅ GET blog by slug
router.get("/:slug", async (req, res) => {
  const blog = blogs.find((b) => b.slug === req.params.slug);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(blog);
});

// ✅ POST - Create new blog (requires auth + author:blogs permission)
router.post("/", authenticate, authorize("author:blogs"), async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ error: "Missing required fields: title, content, category" });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Check for duplicate slug
    if (blogs.some((b) => b.slug === slug)) {
      return res
        .status(400)
        .json({ error: "A blog with this title already exists" });
    }

    // Estimate read time (roughly 200 words per minute)
    const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const now = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newBlog: BlogPost = {
      id: nextId++,
      title,
      slug,
      content,
      category,
      created_at: now,
      updated_at: now,
      read_time: `${readTime} min read`,
      author_id: req.user!.sub,
      author_name: req.user!.name,
    };

    blogs.push(newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ PUT - Update blog (requires auth + author:blogs permission, own blog or admin)
router.put(
  "/:slug",
  authenticate,
  authorize("author:blogs"),
  async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const blog = blogs.find((b) => b.slug === req.params.slug);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Check authorization: only author or admin can edit
      if (blog.author_id !== req.user!.sub && req.user!.role !== "admin") {
        return res
          .status(403)
          .json({ error: "You can only edit your own blogs" });
      }

      // Update fields
      if (title) blog.title = title;
      if (content) blog.content = content;
      if (category) blog.category = category;

      const now = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      blog.updated_at = now;

      res.json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ✅ DELETE blog (requires auth + author:blogs permission, own blog or admin)
router.delete(
  "/:slug",
  authenticate,
  authorize("author:blogs"),
  async (req, res) => {
    try {
      const index = blogs.findIndex((b) => b.slug === req.params.slug);

      if (index === -1) {
        return res.status(404).json({ error: "Blog not found" });
      }

      const blog = blogs[index];

      // Check authorization: only author or admin can delete
      if (blog.author_id !== req.user!.sub && req.user!.role !== "admin") {
        return res
          .status(403)
          .json({ error: "You can only delete your own blogs" });
      }

      blogs.splice(index, 1);
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default router;
