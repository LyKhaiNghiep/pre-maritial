import axios from 'axios';

const API_URL = 'http://localhost:8080';

const apiService = {

    getAuthHeader() {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    },


    getJsonAuthHeader() {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    },


    async get(endpoint, useAuth = true) {
        try {
            const config = useAuth ? this.getAuthHeader() : {};
            const response = await axios.get(`${API_URL}${endpoint}`, config);
            return response.data;
        } catch (error) {
            console.error(`Error performing GET request to ${endpoint}:`, error);
            throw error;
        }
    },


    async post(endpoint, data, useAuth = true) {
        try {
            const config = useAuth ? this.getJsonAuthHeader() : {
                headers: { 'Content-Type': 'application/json' }
            };
            const response = await axios.post(`${API_URL}${endpoint}`, data, config);
            return response.data;
        } catch (error) {
            console.error(`Error performing POST request to ${endpoint}:`, error);
            throw error;
        }
    },


    async put(endpoint, data, useAuth = true) {
        try {
            const config = useAuth ? this.getJsonAuthHeader() : {
                headers: { 'Content-Type': 'application/json' }
            };
            const response = await axios.put(`${API_URL}${endpoint}`, data, config);
            return response.data;
        } catch (error) {
            console.error(`Error performing PUT request to ${endpoint}:`, error);
            throw error;
        }
    },


    async delete(endpoint, useAuth = true) {
        try {
            const config = useAuth ? this.getAuthHeader() : {};
            const response = await axios.delete(`${API_URL}${endpoint}`, config);
            return response.data;
        } catch (error) {
            console.error(`Error performing DELETE request to ${endpoint}:`, error);
            throw error;
        }
    },


    async uploadFile(endpoint, formData, useAuth = true) {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(useAuth ? { Authorization: `Bearer ${token}` } : {})
                }
            };
            const response = await axios.post(`${API_URL}${endpoint}`, formData, config);
            return response.data;
        } catch (error) {
            console.error(`Error uploading file to ${endpoint}:`, error);
            throw error;
        }
    }
};

export default apiService;