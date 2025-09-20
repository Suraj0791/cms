"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Category } from "@/lib/api"

interface SearchFilters {
  query: string
  category: string | null
  author: string
  dateRange: "all" | "week" | "month" | "year"
}

interface AdvancedSearchProps {
  categories: Category[]
  onSearch: (filters: SearchFilters) => void
  initialFilters?: Partial<SearchFilters>
}

export function AdvancedSearch({ categories, onSearch, initialFilters = {} }: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: null,
    author: "",
    dateRange: "all",
    ...initialFilters,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(filters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      query: "",
      category: null,
      author: "",
      dateRange: "all" as const,
    }
    setFilters(clearedFilters)
    onSearch(clearedFilters)
  }

  const hasActiveFilters = filters.query || filters.category || filters.author || filters.dateRange !== "all"

  return (
    <div className="w-full max-w-2xl">
      {/* Main Search Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles by title, content, or author..."
            value={filters.query}
            onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            className="pl-10 pr-32"
          />
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button type="button" variant="ghost" size="sm" className="h-8">
                  <Filter className="h-4 w-4" />
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                      !
                    </Badge>
                  )}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
            <Button type="submit" size="sm" className="h-8">
              Search
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select
                      value={filters.category || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          category: e.target.value || null,
                        }))
                      }
                      className="w-full p-2 border border-input rounded-md bg-background text-sm"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Author Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Author</label>
                    <Input
                      type="text"
                      placeholder="Filter by author..."
                      value={filters.author}
                      onChange={(e) => setFilters((prev) => ({ ...prev, author: e.target.value }))}
                      className="text-sm"
                    />
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date Range</label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          dateRange: e.target.value as SearchFilters["dateRange"],
                        }))
                      }
                      className="w-full p-2 border border-input rounded-md bg-background text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                      <option value="year">Past Year</option>
                    </select>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Button type="button" variant="ghost" size="sm" onClick={clearFilters} disabled={!hasActiveFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear Filters
                  </Button>
                  <Button type="submit" size="sm">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </form>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.query && (
            <Badge variant="secondary" className="gap-1">
              Search: "{filters.query}"
              <button
                onClick={() => setFilters((prev) => ({ ...prev, query: "" }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              Category: {categories.find((c) => c.slug === filters.category)?.name}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: null }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.author && (
            <Badge variant="secondary" className="gap-1">
              Author: {filters.author}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, author: "" }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.dateRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.dateRange === "week" && "Past Week"}
              {filters.dateRange === "month" && "Past Month"}
              {filters.dateRange === "year" && "Past Year"}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, dateRange: "all" }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
