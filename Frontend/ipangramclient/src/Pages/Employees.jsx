import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [nameOrder, setNameOrder] = useState('');

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/employees/filter/location`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/departments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleAssignDepartment = async (id, departmentId) => {
        try {
            await axios.put(`http://localhost:7000/api/employees/${id}`, {
                department: departmentId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error assigning department to employee:', error);
            toast.error(error.response.data.message || 'Error Assign department');

        }
    };


    const handleSortByName = async (order) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/employees/filter/name/${order}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEmployees(response.data);
            setNameOrder(order);
        } catch (error) {
            console.error('Error sorting employees by name:', error);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/api/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">All Employees</h2>
            <div className="mb-4">
                <button onClick={() => handleSortByName('ascending')} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Sort by Name (Ascending)</button>
                <button onClick={() => handleSortByName('descending')} className="bg-blue-500 text-white py-2 px-4 rounded-md">Sort by Name (Descending)</button>
            </div>
            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">First Name</th>
                        <th className="border border-gray-400 px-4 py-2">Last Name</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Location</th>
                        <th className="border border-gray-400 px-4 py-2">Role</th>
                        <th className="border border-gray-400 px-4 py-2">Department</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td className="border border-gray-400 px-4 py-2">{employee.firstName}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.lastName}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.email}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.location}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.role}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <select
                                    value={employee.department}
                                    onChange={(e) => handleAssignDepartment(employee._id, e.target.value)}
                                    className="block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(department => (
                                        <option key={department._id} value={department._id}>{department.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={() => handleDeleteEmployee(employee._id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employees;
