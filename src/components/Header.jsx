import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Blog</Link>
        <Link to="/new">New post</Link>
      </nav>
    </header>
  )
}
