// API utilities for fetching data from Payload CMS
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

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
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    populate: "category",
  })

  if (search) {
    params.append("where[title][contains]", search)
  }

  if (categorySlug) {
    params.append("where[category.slug][equals]", categorySlug)
  }

  const response = await fetch(`${API_URL}/blog-posts?${params}`)
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts")
  }

  return response.json()
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/blog-posts?where[slug][equals]=${slug}&populate=category`)
  if (!response.ok) {
    throw new Error("Failed to fetch blog post")
  }

  const data = await response.json()
  if (data.docs.length === 0) {
    throw new Error("Blog post not found")
  }

  return data.docs[0]
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`)
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  const data = await response.json()
  return data.docs
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
