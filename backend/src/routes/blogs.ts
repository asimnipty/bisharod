import { Router } from "express";
import { pool } from "../db/pool";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

// helper — generate slug from title
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// helper — estimate read time
function readTime(content: string): string {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// helper — format date
function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── GET /api/blogs ────────────────────────────────────────────────────────────
router.get("/", async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT b.id, b.title, b.slug, b.excerpt,
            LEFT(b.content, 300) AS content_preview,
            b.category, b.read_time, b.author_name,
            TO_CHAR(b.created_at, 'Month DD, YYYY') AS created_at
     FROM blogs b
     ORDER BY b.created_at DESC`,
  );
  res.json(rows);
});

// ── GET /api/blogs/:slug ──────────────────────────────────────────────────────
router.get("/:slug", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT b.id, b.title, b.slug, b.content, b.excerpt,
            b.category, b.read_time, b.author_id, b.author_name,
            TO_CHAR(b.created_at, 'Month DD, YYYY') AS created_at,
            TO_CHAR(b.updated_at, 'Month DD, YYYY') AS updated_at
     FROM blogs b
     WHERE b.slug = $1`,
    [req.params.slug],
  );
  if (!rows[0]) return res.status(404).json({ error: "Blog not found" });
  res.json(rows[0]);
});

// ── POST /api/blogs ───────────────────────────────────────────────────────────
router.post("/", authenticate, authorize("author:blogs"), async (req, res) => {
  const { title, content, category, excerpt } = req.body;

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ error: "title, content, category are required" });
  }

  const slug = slugify(title);

  // check duplicate slug
  const exists = await pool.query("SELECT id FROM blogs WHERE slug = $1", [
    slug,
  ]);
  if (exists.rows[0]) {
    return res
      .status(409)
      .json({ error: "A post with this title already exists" });
  }

  const { rows } = await pool.query(
    `INSERT INTO blogs (title, slug, content, excerpt, category, read_time, author_id, author_name)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, title, slug, category, read_time, author_name,
               TO_CHAR(created_at, 'Month DD, YYYY') AS created_at`,
    [
      title,
      slug,
      content,
      excerpt ?? null,
      category,
      readTime(content),
      req.user!.sub,
      req.user!.name,
    ],
  );

  res.status(201).json(rows[0]);
});

// ── PUT /api/blogs/:slug ──────────────────────────────────────────────────────
router.put(
  "/:slug",
  authenticate,
  authorize("author:blogs"),
  async (req, res) => {
    const { title, content, category, excerpt } = req.body;

    // fetch existing
    const existing = await pool.query("SELECT * FROM blogs WHERE slug = $1", [
      req.params.slug,
    ]);
    if (!existing.rows[0])
      return res.status(404).json({ error: "Blog not found" });

    const blog = existing.rows[0];

    // only author or admin can edit
    if (
      String(blog.author_id) !== req.user!.sub &&
      req.user!.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "You can only edit your own posts" });
    }

    const { rows } = await pool.query(
      `UPDATE blogs
     SET title      = COALESCE($1, title),
         content    = COALESCE($2, content),
         category   = COALESCE($3, category),
         excerpt    = COALESCE($4, excerpt),
         read_time  = COALESCE($5, read_time),
         updated_at = NOW()
     WHERE slug = $6
     RETURNING id, title, slug, category, read_time, author_name,
               TO_CHAR(created_at, 'Month DD, YYYY') AS created_at,
               TO_CHAR(updated_at, 'Month DD, YYYY') AS updated_at`,
      [
        title ?? null,
        content ?? null,
        category ?? null,
        excerpt ?? null,
        content ? readTime(content) : null,
        req.params.slug,
      ],
    );

    res.json(rows[0]);
  },
);

// ── DELETE /api/blogs/:slug ───────────────────────────────────────────────────
router.delete(
  "/:slug",
  authenticate,
  authorize("author:blogs"),
  async (req, res) => {
    const existing = await pool.query("SELECT * FROM blogs WHERE slug = $1", [
      req.params.slug,
    ]);
    if (!existing.rows[0])
      return res.status(404).json({ error: "Blog not found" });

    const blog = existing.rows[0];

    if (
      String(blog.author_id) !== req.user!.sub &&
      req.user!.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "You can only delete your own posts" });
    }

    await pool.query("DELETE FROM blogs WHERE slug = $1", [req.params.slug]);
    res.json({ message: "Blog deleted successfully" });
  },
);

export default router;
