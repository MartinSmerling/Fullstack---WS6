import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"

export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to load post")
        setPost(data)
      })
      .catch((e) => setError(e.message))
  }, [id])

  const remove = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Delete failed")
    navigate("/")
  }

  if (error) {
    return <p style={{ color: "crimson" }}>{error}</p>
  }

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <em>{post.author}</em>
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to={`/edit/${post._id}`}>Edit</Link>
        <button onClick={remove}>Delete</button>
      </div>
    </div>
  )
}