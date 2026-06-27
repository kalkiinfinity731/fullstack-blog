import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchUserPosts = async () => {
      try {
        const res = await api.get("/posts");
        const userPosts = res.data.filter((p) => p.author_id === user.id);
        setPosts(userPosts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserPosts();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) return <p className="text-purpleText">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purpleAccent">Profile</h2>
        <button onClick={handleLogout} className="btn">Logout</button>
      </div>
      <div className="card mb-6">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <h3 className="text-xl font-bold mb-4">Your Posts</h3>
      {posts.length === 0 ? (
        <p className="text-purpleText">You haven't created any posts yet.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="card flex justify-between items-center">
              <Link to={`/post/${post.id}`} className="hover:text-purpleAccent">
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <p className="text-sm text-purpleAccent">{new Date(post.created_at).toLocaleDateString()}</p>
              </Link>
              <div className="space-x-2">
                <Link to={`/edit/${post.id}`} className="text-purpleAccent hover:underline">Edit</Link>
                <button
                  onClick={async () => {
                    if (window.confirm("Delete this post?")) {
                      await api.delete(`/posts/${post.id}`);
                      setPosts(posts.filter((p) => p.id !== post.id));
                    }
                  }}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
