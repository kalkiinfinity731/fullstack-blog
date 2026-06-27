import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", { username, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 card">
      <h2 className="text-2xl font-bold mb-6 text-purpleAccent">Register</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-purpleBg text-purpleText border border-purpleAccent"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-purpleBg text-purpleText border border-purpleAccent"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-purpleBg text-purpleText border border-purpleAccent"
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="btn w-full">Register</button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-purpleAccent hover:underline">Login</Link>
      </p>
    </div>
  );
}
