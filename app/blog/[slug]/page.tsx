"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { fetchBlogPost, type BlogPost, formatDate } from "@/lib/api"

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)
        setError(null)
        const postData = await fetchBlogPost(slug)
        setPost(postData)
      } catch (err) {
        setError("Article not found or failed to load.")
        console.error("Error loading post:", err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner size="lg" text="Loading article..." />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ErrorMessage message={error || "Article not found"} />
        <div className="text-center mt-6">
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const renderContent = (content: any[]) => {
    return content.map((block, index) => {
      if (block.children) {
        return (
          <p key={index} className="text-lg leading-relaxed mb-6 text-pretty">
            {block.children.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        )
      }
      return null
    })
  }

  return (
    <article className="container mx-auto px-4 py-8">
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

      {/* Article Header */}
      <header className="max-w-4xl mx-auto mb-12">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-4">
            <Tag className="mr-1 h-3 w-3" />
            {post.category.name}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">{post.title}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border/50 pb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time className="text-sm">{formatDate(post.publishedDate)}</time>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">{renderContent(post.content)}</div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Written by</p>
              <p className="font-semibold">{post.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/category/${post.category.slug}`}>
                <Badge variant="outline" className="hover:bg-accent transition-colors">
                  More in {post.category.name}
                </Badge>
              </Link>
            </div>
          </div>
        </footer>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Articles
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
