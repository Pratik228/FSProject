import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to handle tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    return response;
  },
  register: (data) => api.post("/auth/register", data),
  logout: async () => {
    localStorage.removeItem("token");
    return api.get("/auth/logout");
  },
  getProfile: () => api.get("/auth/profile"),
  resetPassword: (data) => api.post("/auth/reset-password", data),

  googleAuth: () =>
    (window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`),
};

export const taskAPI = {
  getTasks: () => api.get("/tasks"),
  createTask: (data) => api.post("/tasks", data),
  updateTask: (id, data) => api.patch(`/tasks/${id}/status`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export const postAPI = {
  getPosts: () => api.get("/posts"),
  createPost: (formData) =>
    api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deletePost: (id) => api.delete(`/posts/${id}`),
};
