import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("org@test.com");
  const [password, setPassword] = useState("P@ssw0rd!");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const base = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const { data } = await axios.post(base + "/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      const me = await axios.get(base + "/api/me", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      onLogin(me.data);
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24 }}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}
