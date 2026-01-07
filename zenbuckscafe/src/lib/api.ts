import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    profile: "/auth/profile",
  },
  products: {
    list: "/products",
    categories: "/products/categories",
    byId: (id: string) => `/products/${id}`,
  },
  orders: {
    create: "/orders",
    list: "/orders",
    byId: (id: string) => `/orders/${id}`,
    payment: (id: string) => `/orders/${id}/payment`,
  },
};
