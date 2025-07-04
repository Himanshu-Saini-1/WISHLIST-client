import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
const API = axios.create({
  baseURL,
});

export const signup = (userData) => API.post("/users/signup", userData);
export const login = (credentials) => API.post("/users/login", credentials);
export const createWishlist = (data) => API.post("/wishlists", data);
export const getWishlists = (email) => API.get(`/wishlists/${email}`);
export const updateWishlist = (id, data) => API.put(`/wishlists/${id}`, data);
export const deleteWishlist = (id) => API.delete(`/wishlists/${id}`);
