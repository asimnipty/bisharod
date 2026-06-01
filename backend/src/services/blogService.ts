export const getBlogs = () => {
  return [
    {
      id: 1,
      title: "Getting Started with CQL for HEDIS Measures",
      slug: "getting-started-cql-hedis",
      content: "<p>...</p>",
      category: "CQL",
      created_at: "May 5, 2026",
      read_time: "8 min read",
    },
  ];
};

export const getBlogBySlug = (slug: string) => {
  return getBlogs().find((b) => b.slug === slug);
};
