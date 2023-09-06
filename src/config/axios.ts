import axios from 'axios';
import * as userService from '../services/userservice';
import * as constants from '../constants/apis';

const axiosInstance = axios.create({
    baseURL: constants.API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
    config.headers = {
        'Authorization': "Bearer "+ userService.getAccessToken(),
        'Content-Type':'application/json',
    }
    return config
}, error => {
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error)
})

export default axiosInstance;