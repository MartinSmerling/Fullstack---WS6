import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PostForm from "../components/PostForm"

export default function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(setPost)
      .catch(e => setError(e.message))
  }, [id])

  const updatePost = async (payload) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Update failed")
    navigate(`/posts/${id}`)
  }

  if (error) return <p style={{ color: "crimson" }}>{error}</p>
  if (!post) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit post</h1>
      <PostForm initialValues={post} onSubmit={updatePost} submitText="Update" />
    </div>
  )
}
