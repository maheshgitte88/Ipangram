import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [updatedDepartmentName, setUpdatedDepartmentName] = useState('');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserRole(decodedToken.userRoal);
        }
        fetchDepartments();
    }, []);

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

    const handleDeleteDepartment = async (departmentId) => {
        try {
            await axios.delete(`http://localhost:7000/api/departments/${departmentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchDepartments();
        } catch (error) {
            toast.error(error.response.data.message || 'Error Delete department');

        }
    };

    const handleCreateDepartment = async () => {
        try {
            await axios.post('http://localhost:7000/api/departments', {
                name: newDepartmentName
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchDepartments();
            setNewDepartmentName('');
            setIsFormVisible(false);
        } catch (error) {
            toast.error(error.response.data.message || 'Error Create department');

        }
    };

    const handleUpdateDepartment = async () => {
        try {
            await axios.put(`http://localhost:7000/api/departments/${selectedDepartmentId}`, {
                name: updatedDepartmentName
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchDepartments();
            setSelectedDepartmentId('');
            setUpdatedDepartmentName('');
        } catch (error) {
            toast.error(error.response.data.message || 'Error updating department');
        }
    };

    const renderDepartmentManagement = () => {
        return (
            <div>
                <button
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
                >
                    +
                </button>
                {isFormVisible && (
                    <div className='py-3'>
                        <h2 className="text-xl font-semibold mb-2">Create New Department</h2>
                        <input
                            type="text"
                            placeholder="Department Name"
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                            className="block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 mb-4"
                        />
                        <button
                            onClick={handleCreateDepartment}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Create Department
                        </button>
                    </div>
                )}
                <h5 className='w-full py-2'>All Department</h5>
                <table className="border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Manager</th>
                            <th className="border border-gray-400 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department._id}>
                                <td className="border border-gray-400 px-4 py-2">
                                    {selectedDepartmentId === department._id ? (
                                        <input
                                            type="text"
                                            value={updatedDepartmentName}
                                            onChange={(e) => setUpdatedDepartmentName(e.target.value)}
                                            className="block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                                        />
                                    ) : (
                                        department.name
                                    )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">{department.manager.firstName} {department.manager.lastName}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {selectedDepartmentId === department._id ? (
                                        <>
                                            <button
                                                onClick={handleUpdateDepartment}
                                                className="bg-green-500 text-white py-1 px-2 rounded-md mr-2"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setSelectedDepartmentId('')}
                                                className="bg-gray-500 text-white py-1 px-2 rounded-md"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setSelectedDepartmentId(department._id);
                                                setUpdatedDepartmentName(department.name);
                                            }}
                                            className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                                        >
                                            Update
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteDepartment(department._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        );
    };

    return (
        <div>
            {renderDepartmentManagement()}
        </div>
    );
}

export default Departments;
