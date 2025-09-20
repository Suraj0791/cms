"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BlogCard } from "@/components/blog-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { fetchBlogPosts, fetchCategories, type BlogPost, type Category } from "@/lib/api"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const loadCategoryAndPosts = async (page = 1) => {
    try {
      setLoading(true)
      setError(null)

      // Load category info and posts in parallel
      const [categoriesData, postsResponse] = await Promise.all([
        fetchCategories(),
        fetchBlogPosts(page, 9, undefined, slug),
      ])

      const categoryData = categoriesData.find((cat) => cat.slug === slug)
      if (!categoryData) {
        throw new Error("Category not found")
      }

      setCategory(categoryData)

      if (page === 1) {
        setPosts(postsResponse.docs)
      } else {
        setPosts((prev) => [...prev, ...postsResponse.docs])
      }

      setCurrentPage(page)
      setHasNextPage(postsResponse.hasNextPage)
    } catch (err) {
      setError("Category not found or failed to load articles.")
      console.error("Error loading category:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      loadCategoryAndPosts()
    }
  }, [slug])

  const handleLoadMore = () => {
    if (hasNextPage && !loading) {
      loadCategoryAndPosts(currentPage + 1)
    }
  }

  if (loading && !category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner size="lg" text="Loading category..." />
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ErrorMessage message={error || "Category not found"} />
        <div className="text-center mt-6">
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Category Header */}
      <header className="text-center py-12 mb-12">
        <Badge variant="secondary" className="mb-4 text-sm">
          <Tag className="mr-1 h-3 w-3" />
          Category
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{category.name}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          Explore our latest insights and articles about {category.name.toLowerCase()}.
          {posts.length > 0 && ` ${posts.length} article${posts.length !== 1 ? "s" : ""} available.`}
        </p>
      </header>

      {/* Articles Grid */}
      <section>
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-6">No articles found in this category yet.</p>
            <Link href="/">
              <Button variant="outline">Browse All Articles</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="text-center">
                <Button onClick={handleLoadMore} variant="outline" size="lg" disabled={loading}>
                  {loading ? "Loading..." : "Load More Articles"}
                </Button>
              </div>
            )}

            {/* Articles Count */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              Showing {posts.length} articles in {category.name}
            </div>
          </>
        )}
      </section>

      {/* Related Categories */}
      <section className="mt-16 pt-8 border-t border-border/50">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Explore Other Categories</h2>
          <Link href="/">
            <Button variant="ghost" size="sm">
              View All Categories
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
