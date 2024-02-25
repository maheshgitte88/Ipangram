import React, { useState } from 'react';
import { loginUser } from '../Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            console.log(response);
            if (response) {
                toast.success("Login successful");
                window.location.href = '/user/dashboard/Departments';
            } else {
                console.error("Login failed:", response.message);
                toast.error("Login failed");
            }
        } catch (error) {
            console.error('Login error:', error.message);
            toast.error("Error logging in");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl mb-4 font-semibold">Login</h2>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-3 py-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-3 py-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600">
                        Login
                    </button>
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                        <span>Don't have an account? Click on the</span>
                        <Link to={"/signup"} className="text-blue-500 hover:underline">
                            signup
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
