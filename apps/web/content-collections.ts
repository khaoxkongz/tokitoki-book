import { defineCollection, defineConfig } from "@content-collections/core";
import matter from "gray-matter";
import { z } from "zod";

function extractFrontMatter(content: string) {
  const { data, content: body, excerpt } = matter(content, { excerpt: true });
  return { data, body, excerpt: excerpt || "" };
}

const contents = defineCollection({
  name: "posts",
  directory: "./src/contents",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    published: z.string().date(),
    episode: z.number().int().positive(),
    description: z.string().optional(),
    authors: z.string().array(),
    content: z.string(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content);

    const headerImageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    const headerImage = headerImageMatch ? headerImageMatch[2] : undefined;

    return {
      ...post,
      slug: post._meta.path,
      excerpt: frontMatter.excerpt,
      description: frontMatter.data.description,
      headerImage,
      content: frontMatter.body,
    };
  },
});

export default defineConfig({
  content: [contents],
});
