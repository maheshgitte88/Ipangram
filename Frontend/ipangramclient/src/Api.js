import axios from "axios";
import LoginForm from "./Comp/LoginForm";

const BASE_URL = 'http://localhost:7000'; 


export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
        if (!response.data.token) {
            throw new Error('Login failed');
          }
          const token = response.data.token;
        //   LoginForm(token);
          localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};