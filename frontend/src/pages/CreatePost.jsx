import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/posts", { title, content });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-purpleAccent">Create Post</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-purpleBg text-purpleText border border-purpleAccent"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded bg-purpleBg text-purpleText border border-purpleAccent h-40"
            required
            minLength={10}
          />
        </div>
        <button type="submit" className="btn">Publish</button>
      </form>
    </div>
  );
}
