import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    return response;
  },
  register: (data) => api.post("/auth/register", data),
  logout: async () => {
    const response = await api.get("/auth/logout");
    delete api.defaults.headers.common["Authorization"];
    return response;
  },
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
