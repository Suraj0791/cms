// API utilities for fetching data from Payload CMS
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Mock data that simulates Payload CMS responses
const mockCategories: Category[] = [
  { id: "1", name: "Technology", slug: "technology" },
  { id: "2", name: "Design", slug: "design" },
  { id: "3", name: "Development", slug: "development" },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development",
    slug: "future-of-web-development",
    content: [
      {
        children: [
          {
            text: "Web development is evolving rapidly with new frameworks, tools, and methodologies emerging constantly. In this comprehensive guide, we explore the trends that will shape the future of web development, from AI-powered coding assistants to the rise of edge computing and serverless architectures.",
          },
        ],
      },
    ],
    author: "Sarah Chen",
    publishedDate: "2024-01-15T10:00:00.000Z",
    category: mockCategories[0],
  },
  {
    id: "2",
    title: "Designing for Accessibility",
    slug: "designing-for-accessibility",
    content: [
      {
        children: [
          {
            text: "Creating inclusive digital experiences is not just a moral imperative—it's a business necessity. This article explores practical strategies for designing accessible interfaces that work for everyone, including users with disabilities. We'll cover WCAG guidelines, testing methods, and real-world implementation tips.",
          },
        ],
      },
    ],
    author: "Marcus Rodriguez",
    publishedDate: "2024-01-12T14:30:00.000Z",
    category: mockCategories[1],
  },
  {
    id: "3",
    title: "Modern CSS Techniques",
    slug: "modern-css-techniques",
    content: [
      {
        children: [
          {
            text: "CSS has evolved tremendously in recent years, introducing powerful features like Grid, Flexbox, Custom Properties, and Container Queries. This deep dive explores advanced CSS techniques that can help you create more maintainable, responsive, and visually stunning web interfaces.",
          },
        ],
      },
    ],
    author: "Elena Vasquez",
    publishedDate: "2024-01-10T09:15:00.000Z",
    category: mockCategories[1],
  },
  {
    id: "4",
    title: "Building Scalable APIs",
    slug: "building-scalable-apis",
    content: [
      {
        children: [
          {
            text: "As applications grow in complexity and user base, API design becomes crucial for long-term success. This comprehensive guide covers best practices for building scalable, maintainable APIs using modern technologies like GraphQL, REST, and gRPC. Learn about caching strategies, rate limiting, and performance optimization.",
          },
        ],
      },
    ],
    author: "David Kim",
    publishedDate: "2024-01-08T16:45:00.000Z",
    category: mockCategories[2],
  },
  {
    id: "5",
    title: "The Art of User Experience",
    slug: "art-of-user-experience",
    content: [
      {
        children: [
          {
            text: "Great user experience is the result of careful planning, research, and iterative design. This article explores the fundamental principles of UX design, from user research and persona development to prototyping and usability testing. Discover how to create digital products that users love.",
          },
        ],
      },
    ],
    author: "Lisa Thompson",
    publishedDate: "2024-01-05T11:20:00.000Z",
    category: mockCategories[1],
  },
  {
    id: "6",
    title: "JavaScript Performance Optimization",
    slug: "javascript-performance-optimization",
    content: [
      {
        children: [
          {
            text: "Performance is critical for user experience and SEO. This technical deep-dive covers advanced JavaScript optimization techniques, including code splitting, lazy loading, memory management, and profiling tools. Learn how to identify bottlenecks and implement solutions that make your applications lightning-fast.",
          },
        ],
      },
    ],
    author: "Alex Johnson",
    publishedDate: "2024-01-03T13:10:00.000Z",
    category: mockCategories[2],
  },
]

export interface Category {
  id: string
  name: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: any[]
  author: string
  publishedDate: string
  category: Category
}

export interface ApiResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export async function fetchBlogPosts(
  page = 1,
  limit = 10,
  search?: string,
  categorySlug?: string,
): Promise<ApiResponse<BlogPost>> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredPosts = [...mockBlogPosts]

  // Apply search filter
  if (search) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Apply category filter
  if (categorySlug) {
    filteredPosts = filteredPosts.filter((post) => post.category.slug === categorySlug)
  }

  // Sort by published date (newest first)
  filteredPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())

  // Implement pagination
  const totalDocs = filteredPosts.length
  const totalPages = Math.ceil(totalDocs / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  return {
    docs: paginatedPosts,
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter: startIndex + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const post = mockBlogPosts.find((p) => p.slug === slug)
  if (!post) {
    throw new Error("Blog post not found")
  }

  return post
}

export async function fetchCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockCategories
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getExcerpt(content: any[], maxLength = 100): string {
  if (!content || content.length === 0) return ""

  const firstParagraph = content[0]
  if (!firstParagraph?.children?.[0]?.text) return ""

  const text = firstParagraph.children[0].text
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}
