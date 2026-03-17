import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://scoutnusantara.web.id/api',
});

export default api;
