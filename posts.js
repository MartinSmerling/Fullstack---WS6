const router = require("express").Router()
const Post = require("../models/Post")

// GET /api/posts - list all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    next(err)
  }
})

// GET /api/posts/:id - single post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: "Post not found" })
    res.json(post)
  } catch (err) {
    next(err)
  }
})

// POST /api/posts - create
router.post("/", async (req, res, next) => {
  try {
    const { title, content, author } = req.body
    const saved = await new Post({ title, content, author }).save()
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

// PUT /api/posts/:id - update
router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, context: "query" }
    )
    if (!updated) return res.status(404).json({ error: "Post not found" })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/posts/:id - delete
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Post not found" })
    res.json({ message: "Post deleted", id: deleted._id })
  } catch (err) {
    next(err)
  }
})

module.exports = router