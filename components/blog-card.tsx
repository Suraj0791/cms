import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type BlogPost, formatDate, getExcerpt } from "@/lib/api"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {post.category.name}
          </Badge>
          <time className="text-sm text-muted-foreground">{formatDate(post.publishedDate)}</time>
        </div>
        <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
          <h3 className="text-xl font-semibold leading-tight line-clamp-2">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3">
          {getExcerpt(post.content, 150)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">By {post.author}</span>
          <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
            Read more
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
