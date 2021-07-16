import axios from "axios";
import { ApiError } from './ApiError';


const createAxiosInstance = (token) => {
    const apiInstance = axios.create({
        //baseURL: 'https://aces-election.herokuapp.com/',
        baseURL: `${window.location.origin}/`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    apiInstance.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {
        const { response } = error;
        if (!response) return Promise.reject(error);

        let message = 'An unexpected error occurred';

        if (response.status === 401) {
            message = 'Unauthorized';
        }

        if (response?.data) {
            message = response.data;
        }

        return Promise.reject(new ApiError(response.status, message));
    });

    return apiInstance;
};

export { createAxiosInstance };