import { buildConfig } from "payload/config"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { slateEditor } from "@payloadcms/richtext-slate"
import Categories from "./collections/Categories"
import BlogPosts from "./collections/BlogPosts"

export default buildConfig({
  admin: {
    user: "users",
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Categories,
    BlogPosts,
    {
      slug: "users",
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
  ],
  typescript: {
    outputFile: "../types/payload-types.ts",
  },
  graphQL: {
    schemaOutputFile: "../schema.graphql",
  },
  plugins: [],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  })
})
