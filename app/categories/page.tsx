"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Tag, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { fetchCategories, fetchBlogPosts, type Category } from "@/lib/api"

interface CategoryWithCount extends Category {
  postCount: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategoriesWithCounts = async () => {
      try {
        setLoading(true)
        setError(null)

        const categoriesData = await fetchCategories()

        // Get post counts for each category
        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (category) => {
            try {
              const postsResponse = await fetchBlogPosts(1, 1, undefined, category.slug)
              return {
                ...category,
                postCount: postsResponse.totalDocs,
              }
            } catch {
              return {
                ...category,
                postCount: 0,
              }
            }
          }),
        )

        setCategories(categoriesWithCounts)
      } catch (err) {
        setError("Failed to load categories.")
        console.error("Error loading categories:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCategoriesWithCounts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner size="lg" text="Loading categories..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ErrorMessage message={error} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center py-12 mb-12">
        <Badge variant="secondary" className="mb-4 text-sm">
          <Tag className="mr-1 h-3 w-3" />
          Browse
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">All Categories</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          Discover articles organized by topic. Find exactly what you're looking for.
        </p>
      </header>

      {/* Categories Grid */}
      <section>
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No categories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs">
                        {category.postCount} article{category.postCount !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Explore {category.name.toLowerCase()} articles
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Back to Home */}
      <div className="text-center mt-12">
        <Link href="/">
          <Badge variant="outline" className="hover:bg-accent transition-colors cursor-pointer">
            Back to Home
          </Badge>
        </Link>
      </div>
    </div>
  )
}
