"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { SearchBar } from "@/components/search-bar"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchBlogPosts, fetchCategories, type BlogPost, type Category, type ApiResponse } from "@/lib/api"

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const loadPosts = async (page = 1, search?: string, categorySlug?: string) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<BlogPost> = await fetchBlogPosts(page, 9, search, categorySlug)
      setPosts(response.docs)
      setTotalPages(response.totalPages)
      setHasNextPage(response.hasNextPage)
      setCurrentPage(page)
    } catch (err) {
      setError("Failed to load blog posts. Please try again later.")
      console.error("Error loading posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const categoriesData = await fetchCategories()
      setCategories(categoriesData)
    } catch (err) {
      console.error("Error loading categories:", err)
    }
  }

  useEffect(() => {
    loadPosts()
    loadCategories()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory(null)
    setCurrentPage(1)
    loadPosts(1, query)
  }

  const handleCategoryFilter = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    setSearchQuery("")
    setCurrentPage(1)
    loadPosts(1, undefined, categorySlug || undefined)
  }

  const handleLoadMore = () => {
    if (hasNextPage) {
      loadPosts(currentPage + 1, searchQuery || undefined, selectedCategory || undefined).then(() => {
        // Append new posts to existing ones for infinite scroll effect
        fetchBlogPosts(currentPage + 1, 9, searchQuery || undefined, selectedCategory || undefined).then((response) => {
          setPosts((prev) => [...prev, ...response.docs])
          setCurrentPage(currentPage + 1)
          setHasNextPage(response.hasNextPage)
        })
      })
    }
  }

  if (loading && posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner size="lg" text="Loading articles..." />
      </div>
    )
  }

  if (error && posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ErrorMessage message={error} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Insights on Technology
          <span className="block text-muted-foreground">and Design</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          Exploring the intersection of innovation, craftsmanship, and digital experiences. Stay updated with the latest
          trends and deep insights.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <SearchBar onSearch={handleSearch} />

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryFilter(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: "{searchQuery}"
                <button onClick={() => handleSearch("")} className="ml-1 hover:text-destructive">
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                Category: {categories.find((c) => c.slug === selectedCategory)?.name}
                <button onClick={() => handleCategoryFilter(null)} className="ml-1 hover:text-destructive">
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </section>

      {/* Blog Posts Grid */}
      <section>
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {searchQuery || selectedCategory
                ? "No articles found matching your criteria."
                : "No articles available at the moment."}
            </p>
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

            {/* Pagination Info */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              Showing {posts.length} articles
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
