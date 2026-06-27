import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-purpleAccent">Dashboard</h2>
      {posts.length === 0 ? (
        <p className="text-purpleText">No posts yet. Be the first to create one!</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className="block card hover:bg-purple-800 transition">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-purpleAccent mt-1">
                By {post.author_name || "Unknown"} • {new Date(post.created_at).toLocaleDateString()}
              </p>
              <p className="mt-2 line-clamp-2">{post.content}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
