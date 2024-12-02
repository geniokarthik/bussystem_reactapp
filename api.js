import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 1000, // For Android emulator
  // For physical device, use 'http://<your_local_ip>:8000/api'
});

api.interceptors.response.use(
  response => response,
  error => {
    console.log('Axios Network Error:', error.toJSON());
    return Promise.reject(error);
  }
);


export default api;


