import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'employee',
        location: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7000/api/auth/signup', formData);
            console.log(response.data);
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl mb-4 font-semibold">Signup</h2>
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="text-sm font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-3 py-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="text-sm font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-3 py-2"
                        />
                    </div>
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
                        <label htmlFor="location" className="text-sm font-medium">
                            location
                        </label>
                        <input
                            type="loca"
                            id="location"
                            placeholder="Enter your location"
                            name="location"
                            value={formData.location}
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
                    <div className="flex flex-col">
                        <label htmlFor="role" className="text-sm font-medium">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-3 py-2"
                        >
                            <option value="employee">employee</option>
                            <option value="manager">manager</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600">
                        Signup
                    </button>
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                        <span>If you already have an account, click on the</span>
                        <Link to={"/login"} className="text-blue-500 hover:underline">
                            login
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SignupForm;
