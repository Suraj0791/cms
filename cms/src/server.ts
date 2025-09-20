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
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  // Seed data if needed
  if (process.env.PAYLOAD_SEED === "true") {
    await seed(payload)
    process.exit()
  }

  app.listen(3001)

  payload.logger.info("Server started on port 3001")
}

start()
