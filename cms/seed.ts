import payload from "payload"

export const seed = async () => {
  try {
    // Check if categories already exist
    const existingCategories = await payload.find({
      collection: "categories",
      limit: 1,
    })

    if (existingCategories.docs.length === 0) {
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
                  text: "Web development continues to evolve at a rapid pace. From the rise of modern frameworks like React and Vue to the emergence of new paradigms like server-side rendering and edge computing, developers have more tools than ever to create exceptional user experiences. In this post, we explore the trends shaping the future of web development and what developers should focus on to stay ahead of the curve.",
                },
              ],
            },
          ],
          author: "Sarah Chen",
          publishedDate: new Date("2024-01-15"),
          category: techCategory.id,
        },
      })

      await payload.create({
        collection: "blog-posts",
        data: {
          title: "Designing for Accessibility in 2024",
          slug: "designing-for-accessibility-2024",
          content: [
            {
              children: [
                {
                  text: "Accessibility is not just a nice-to-have feature—it's essential for creating inclusive digital experiences. As we move through 2024, new guidelines and tools are making it easier than ever to design and develop accessible websites. This comprehensive guide covers the latest best practices, from color contrast and keyboard navigation to screen reader optimization and semantic HTML.",
                },
              ],
            },
          ],
          author: "Marcus Rodriguez",
          publishedDate: new Date("2024-01-10"),
          category: designCategory.id,
        },
      })

      await payload.create({
        collection: "blog-posts",
        data: {
          title: "Building Scalable Design Systems",
          slug: "building-scalable-design-systems",
          content: [
            {
              children: [
                {
                  text: "A well-crafted design system is the backbone of consistent, scalable product development. It bridges the gap between design and development, ensuring that teams can work efficiently while maintaining visual and functional consistency across all touchpoints. Learn how to build, maintain, and evolve design systems that grow with your organization.",
                },
              ],
            },
          ],
          author: "Emily Watson",
          publishedDate: new Date("2024-01-05"),
          category: designCategory.id,
        },
      })

      payload.logger.info("Database seeded successfully!")
    }
  } catch (error) {
    payload.logger.error("Error seeding database:", error)
  }
}
