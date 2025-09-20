import { buildConfig } from "payload/config"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { slateEditor } from "@payloadcms/richtext-slate"
import path from "path"

import Categories from "./collections/Categories"
import BlogPosts from "./collections/BlogPosts"

export default buildConfig({
  admin: {
    user: "users",
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
    Categories,
    BlogPosts,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "mongodb://localhost:27017/cms-blog",
  }),
})
