import axios from "axios";

export async function bootstrapSession() {
  const token = localStorage.getItem("token");
  if (!token) return { user: null, token: null };

  try {
    const { data } = await axios.get(
      (import.meta.env.VITE_API_BASE || "http://localhost:5000") + "/api/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { user: data, token };
  } catch {
    localStorage.removeItem("token");
    return { user: null, token: null };
  }
}
