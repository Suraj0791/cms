import express from "express"
import payload from "payload"
import { seed } from "./seed"

require("dotenv").config()
const app = express()

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin")
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || SURAJ,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)

      // Seed the database with initial data
      await seed()
    },
  })

  // Add your own express routes here

  app.listen(3001, async () => {
    payload.logger.info(`Server listening on port 3001`)
  })
}

start()
