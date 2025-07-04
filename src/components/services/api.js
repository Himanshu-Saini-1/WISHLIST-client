import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const signup = (userData) => API.post("/users/signup", userData);
export const login = (credentials) => API.post("/users/login", credentials);
export const createWishlist = (data) => API.post("/wishlists", data);
export const getWishlists = (email) => API.get(`/wishlists/${email}`);
export const updateWishlist = (id, data) => API.put(`/wishlists/${id}`, data);
export const deleteWishlist = (id) => API.delete(`/wishlists/${id}`);
