export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TechBlog</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exploring the intersection of technology, design, and innovation. Stay updated with the latest trends and
              insights.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/category/technology" className="hover:text-foreground transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="/category/design" className="hover:text-foreground transition-colors">
                  Design
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground">Follow us for the latest updates and insights.</p>
          </div>
        </div>
        <div className="border-t border-border/50 mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">© 2024 TechBlog. Built with Payload CMS and Next.js.</p>
        </div>
      </div>
    </footer>
  )
}
