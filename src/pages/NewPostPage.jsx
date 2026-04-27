import { useNavigate } from "react-router-dom"
import PostForm from "../components/PostForm"

export default function NewPostPage() {
  const navigate = useNavigate()

  const createPost = async (payload) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        // 🔴 näytetään virhe heti
        alert(data.error || "Post creation failed")
        return
      }

      // ✅ onnistui → siirry postaukseen
      navigate(`/posts/${data._id}`)
    } catch (err) {
      alert("Network error: " + err.message)
    }
  }

  return (
    <div>
      <h1>New post</h1>
      <PostForm
        initialValues={{}}
        onSubmit={createPost}
        submitText="Create"
      />
    </div>
  )
}