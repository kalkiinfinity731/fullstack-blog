import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError("Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!post) return <p className="text-purpleText">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-purpleAcccent hover:underline mb-4 inline-block">← Back to Dashboard</Link>
      <div className="card">
        <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
        <p className="text-sm text-purpleAccent mb-4">
          By {post.author_name || "Unknown"} • {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>
      {user && post.author_id === user.id && (
        <div className="mt-4 space-x-4">
          <Link to={`/edit/${post.id}`} className="text-purpleAccent hover:underline">Edit</Link>
          <button
            onClick={async () => {
              if (window.confirm("Delete this post?")) {
                await api.delete(`/posts/${post.id}`);
                window.location.href = "/";
              }
            }}
            className="text-red-400 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
