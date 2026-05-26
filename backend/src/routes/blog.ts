import express, { Router, Request, Response } from "express";

const router = Router();

// Mock blog posts (replace with database later)
const BLOG_POSTS = [
  {
    id: "1",
    title: "Getting Started with CQL for HEDIS Measures",
    excerpt:
      "Clinical Quality Language (CQL) is transforming how healthcare organizations implement digital quality measures.",
    category: "CQL",
    date: "May 5, 2026",
    readTime: "8 min read",
    slug: "getting-started-cql-hedis",
    content: "Full blog post content here...",
  },
  {
    id: "2",
    title: "FHIR R4 vs R5: What Healthcare Teams Need to Know",
    excerpt:
      "The transition from FHIR R4 to R5 brings significant improvements in interoperability.",
    category: "FHIR",
    date: "April 28, 2026",
    readTime: "6 min read",
    slug: "fhir-r4-vs-r5",
    content: "Full blog post content here...",
  },
  // Add more posts...
];

// GET all blog posts
router.get("/", (req: Request, res: Response) => {
  try {
    res.json(BLOG_POSTS);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// GET single blog post by slug
router.get("/:slug", (req: Request, res: Response) => {
  try {
    const post = BLOG_POSTS.find((p) => p.slug === req.params.slug);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

// POST create new blog post (optional - for admin)
router.post("/", (req: Request, res: Response) => {
  try {
    const { title, excerpt, category, content } = req.body;
    const newPost = {
      id: Date.now().toString(),
      title,
      excerpt,
      category,
      content,
      date: new Date().toLocaleDateString(),
      readTime: "5 min read",
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    };
    BLOG_POSTS.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

export default router;
