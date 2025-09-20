import type { Payload } from "payload"

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info("Seeding data...")

  // Create categories
  const techCategory = await payload.create({
    collection: "categories",
    data: {
      name: "Technology",
      slug: "technology",
    },
  })

  const designCategory = await payload.create({
    collection: "categories",
    data: {
      name: "Design",
      slug: "design",
    },
  })

  // Create blog posts
  await payload.create({
    collection: "blog-posts",
    data: {
      title: "The Future of Web Development",
      slug: "future-of-web-development",
      content: [
        {
          children: [
            {
              text: "Web development is evolving rapidly with new frameworks, tools, and methodologies emerging constantly. In this post, we explore the trends that will shape the future of web development, including the rise of serverless architectures, the growing importance of performance optimization, and the shift towards more accessible and inclusive web experiences.",
            },
          ],
        },
      ],
      author: "John Doe",
      publishedDate: new Date("2024-01-15"),
      category: techCategory.id,
    },
  })

  await payload.create({
    collection: "blog-posts",
    data: {
      title: "Modern UI/UX Design Principles",
      slug: "modern-ui-ux-design-principles",
      content: [
        {
          children: [
            {
              text: "Creating exceptional user experiences requires a deep understanding of design principles, user psychology, and modern design trends. This comprehensive guide covers the essential principles of modern UI/UX design, including minimalism, accessibility, responsive design, and the importance of user-centered design thinking in creating products that truly resonate with users.",
            },
          ],
        },
      ],
      author: "Jane Smith",
      publishedDate: new Date("2024-01-10"),
      category: designCategory.id,
    },
  })

  await payload.create({
    collection: "blog-posts",
    data: {
      title: "Building Scalable Applications with Next.js",
      slug: "building-scalable-applications-nextjs",
      content: [
        {
          children: [
            {
              text: "Next.js has become one of the most popular React frameworks for building production-ready applications. This article explores advanced techniques for building scalable applications with Next.js, including server-side rendering, static site generation, API routes, and deployment strategies that ensure your application can handle growth and maintain excellent performance.",
            },
          ],
        },
      ],
      author: "Mike Johnson",
      publishedDate: new Date("2024-01-05"),
      category: techCategory.id,
    },
  })

  payload.logger.info("Seeded 3 blog posts and 2 categories.")
}
