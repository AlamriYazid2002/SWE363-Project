import api from "../lib/apiClient";

export async function login(email, password) {
  const { data } = await api.post("/api/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
}

export async function register(payload) {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export async function me() {
  const { data } = await api.get("/api/me");
  return data;
}
