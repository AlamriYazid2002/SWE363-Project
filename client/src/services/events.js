import api from "../lib/apiClient";

export async function listEvents(params = {}) {
  const { data } = await api.get("/api/events", { params });
  return data;
}

export async function getEvent(id) {
  const { data } = await api.get(`/api/events/${id}`);
  return data;
}

export async function createEvent(payload) {
  const { data } = await api.post("/api/events", payload);
  return data;
}

export async function updateEvent(id, payload) {
  const { data } = await api.patch(`/api/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id) {
  const { data } = await api.delete(`/api/events/${id}`);
  return data;
}
