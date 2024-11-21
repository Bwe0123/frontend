import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://test-task-solva-production.up.railway.app",
    headers: {
        'Content-Type': 'application/json',
    },
});