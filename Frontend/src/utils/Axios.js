import axios from 'axios'

// Create an axios instance
export const Axios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})