import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/posts")
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to load posts")
        setPosts(data)
      })
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div>
      <h1>Blog</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {posts.length === 0 ? (
        <p>No posts yet. Create one!</p>
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p._id}>
              <Link to={`/posts/${p._id}`}>{p.title}</Link>{" "}
              <Link to={`/edit/${p._id}`}>(edit)</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
