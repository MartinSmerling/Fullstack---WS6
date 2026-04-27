import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import NewPostPage from "./pages/NewPostPage"
import PostPage from "./pages/PostPage"
import EditPostPage from "./pages/EditPostPage"

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewPostPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
        </Routes>
      </main>
    </>
  )
}