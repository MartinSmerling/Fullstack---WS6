const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
      trim: true,
    },
    author: {
      type: String,
      default: "Anonymous",
      trim: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema)
