import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/',
  timeout: 5000, // For Android emulator
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


