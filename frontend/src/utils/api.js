import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5004/api",
  withCredentials: true,
});

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  logout: () => api.get("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  resetPassword: (data) => api.post("/auth/reset-password", data),
};

export const taskAPI = {
  getTasks: () => api.get("/tasks"),
  createTask: (data) => api.post("/tasks", data),
  updateTask: (id, data) => api.patch(`/tasks/${id}/status`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export const postAPI = {
  getPosts: () => api.get("/posts"),
  createPost: (data) => api.post("/posts", data),
  deletePost: (id) => api.delete(`/posts/${id}`),
};
