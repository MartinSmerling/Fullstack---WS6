require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

// ✅ Body & CORS MIDDLEWARET ENSIN
app.use(cors())
app.use(express.json())

// ✅ SITTEN REITIT
const postsRouter = require("./routes/posts")
app.use("/api/posts", postsRouter)

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err))

app.get("/", (req, res) => {
  res.json({ message: "WS06 backend running" })
})

app.use((req, res) => {
  res.status(404).json({ error: "unknown endpoint" })
})

app.use((err, req, res, next) => {
  console.error(err)

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid id format" })
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: Object.values(err.errors).map(e => e.message),
    })
  }

  res.status(500).json({ error: "Server error" })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})