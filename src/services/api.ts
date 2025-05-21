
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Album services
export const albumService = {
  getAlbums: () => api.get('/albums'),
  getAlbumById: (id: string) => api.get(`/albums/${id}`),
  getNewReleases: () => api.get('/albums/new-releases'),
  getTopSellers: () => api.get('/albums/top-sellers'),
  getFeaturedAlbums: () => api.get('/albums/featured'),
  getAlbumsByGenre: (genre: string) => api.get(`/albums/genre/${genre}`),
};

// Auth services
export const authService = {
  register: (userData: any) => api.post('/users/register', userData),
  login: (credentials: any) => api.post('/users/login', credentials),
  getUserProfile: () => api.get('/users/profile'),
  updateUserProfile: (userData: any) => api.put('/users/profile', userData),
};

// Cart services
export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (albumId: string) => api.post('/cart/add', { albumId }),
  updateQuantity: (albumId: string, quantity: number) => 
    api.put('/cart/update-quantity', { albumId, quantity }),
  removeFromCart: (albumId: string) => api.delete(`/cart/remove/${albumId}`),
  clearCart: () => api.delete('/cart/clear'),
};

export default api;
