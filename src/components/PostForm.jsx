import { useState } from "react"

export default function PostForm({ initialValues, onSubmit, submitText = "Save" }) {
  const [title, setTitle] = useState(initialValues.title || "")
  const [content, setContent] = useState(initialValues.content || "")
  const [author, setAuthor] = useState(initialValues.author || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, content, author })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 600 }}>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label>
        Content
        <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
      </label>

      <label>
        Author
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>

      <button type="submit">{submitText}</button>
    </form>
  )
}
