import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <LoadingSpinner size="lg" text="Loading category..." />
    </div>
  )
}
