# CMS + Frontend Integration

A modern blog platform built with Payload CMS and Next.js, featuring a sophisticated dark theme and comprehensive content management capabilities.

## 🏗️ Architecture

- **Backend**: Payload CMS with MongoDB
- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: shadcn/ui

## 📁 Project Structure

\`\`\`
├── cms/                    # Payload CMS Backend
│   ├── collections/        # CMS Collections (BlogPosts, Categories)
│   ├── payload.config.ts   # Payload configuration
│   ├── server.ts          # Express server
│   └── seed.ts            # Database seeding
├── app/                   # Next.js Frontend
│   ├── blog/[slug]/       # Blog detail pages
│   ├── category/[slug]/   # Category pages
│   └── categories/        # Categories listing
├── components/            # Reusable UI components
└── lib/                  # API utilities and helpers
\`\`\`

## 🚀 Setup Instructions

### Backend (Payload CMS)

1. Navigate to the CMS directory:
   \`\`\`bash
   cd cms
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Update the `.env` file with your MongoDB connection string and secret key.

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Access the admin panel at `http://localhost:3001/admin`

### Frontend (Next.js)

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Access the frontend at `http://localhost:3000`

### Docker Setup (Optional)

Run the CMS with Docker:
\`\`\`bash
cd cms
docker build -t cms-blog .
docker run -p 3001:3001 cms-blog
\`\`\`

## 📡 API Endpoints

### Blog Posts
- `GET /api/blog-posts` - List all blog posts
- `GET /api/blog-posts?where[slug][equals]=<slug>` - Get post by slug
- `GET /api/blog-posts?where[category.slug][equals]=<category>` - Filter by category
- `GET /api/blog-posts?where[title][contains]=<search>` - Search posts

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories?where[slug][equals]=<slug>` - Get category by slug

### Query Parameters
- `page` - Page number for pagination
- `limit` - Number of items per page
- `populate` - Include related data (e.g., `populate=category`)

## ✨ Features

### Content Management
- **Rich Text Editor**: Full-featured content editing with Slate.js
- **Category System**: Organize posts with hierarchical categories
- **Author Management**: Track article authors
- **Publication Dates**: Schedule and organize content by date

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Sophisticated navy-based color scheme
- **Search Functionality**: Advanced search with filters
- **Pagination**: Both traditional pagination and infinite scroll
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error messages and fallbacks

### Performance
- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Automatic image optimization
- **Caching**: Efficient data fetching and caching strategies

## 🎨 Design System

The application uses a custom dark theme inspired by modern developer portfolios:

- **Primary Colors**: Deep navy (#0A0F1C) with light accents
- **Typography**: Geist Sans for headings, optimized for readability
- **Components**: Consistent spacing and interaction patterns
- **Accessibility**: WCAG compliant color contrast and keyboard navigation

## 🔧 Development

### Adding New Collections

1. Create a new collection file in `cms/collections/`
2. Export the collection from `cms/payload.config.ts`
3. Update the API utilities in `lib/api.ts`
4. Create corresponding frontend components

### Customizing the Theme

Edit `app/globals.css` to modify the color scheme and design tokens.

### Environment Variables

#### CMS (.env)
- `DATABASE_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Secret key for Payload CMS

#### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - CMS API endpoint

## 📝 Assumptions Made

1. **MongoDB Database**: Using MongoDB for data persistence
2. **Local Development**: Both CMS and frontend run locally during development
3. **Content Structure**: Blog posts have a single category relationship
4. **Image Handling**: Using placeholder images for demonstration
5. **Authentication**: Admin authentication handled by Payload CMS
6. **SEO**: Basic meta tags implemented, can be extended with more detailed SEO

## 🚀 Deployment

### CMS Deployment
- Deploy to platforms like Railway, Heroku, or DigitalOcean
- Ensure MongoDB database is accessible
- Set production environment variables

### Frontend Deployment
- Deploy to Vercel, Netlify, or similar platforms
- Update `NEXT_PUBLIC_API_URL` to production CMS URL
- Configure build settings for Next.js

## 🔮 Future Enhancements

- **User Authentication**: Frontend user accounts and comments
- **Image Uploads**: File management and image optimization
- **SEO Optimization**: Advanced meta tags and structured data
- **Analytics**: Content performance tracking
- **Newsletter**: Email subscription functionality
- **Social Sharing**: Share buttons and Open Graph tags

## 📄 License

This project is built for demonstration purposes. Feel free to use and modify as needed.
\`\`\`

```json file="" isHidden
