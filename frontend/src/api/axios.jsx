// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://harishcart.onrender.com', // Change to your backend API prefix
  withCredentials: true // If you need cookies/JWT
  
  //'https://harishcart.onrender.com'
  // 'http://localhost:8000'
});

export default api;
