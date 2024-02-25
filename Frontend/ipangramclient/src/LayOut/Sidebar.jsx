import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <aside
            className={`bg-gray-800 text-white ${isOpen ? "w-48" : "w-12"
                } h-screen transition-width duration-300 ease-in-out`}
        >
            <div className="flex justify-between border-b items-center py-3 px-3">
                <button onClick={toggleSidebar} className="text-white text-xl">
                    {isOpen ? (
                        <i className="bi bi-arrow-left-square"></i>
                    ) : (
                        <i className="bi bi-arrow-right-square"></i>
                    )}
                </button>
            </div>

            {isOpen ? (
                <>
                    <nav className="h-full">
                        <Link
                            to="/user/dashboard/Departments"
                            className="block py-2 px-3 text-base hover:bg-orange-700 hover:text-white-700 hover:text-lg"
                        >
                            <i className="bi bi-building"></i> Departments
                        </Link>
                        <Link
                            to="/user/dashboard/employees"
                            className="block py-2 px-3 text-base hover:bg-orange-700 hover:text-white-700 hover:text-lg"
                        >
                            <i className="bi bi-people"></i> employees
                        </Link>

                    </nav>
                </>
            ) : (
                <>
                    <nav className="h-full">
                        <Link
                            to="/user/dashboard/Departments"
                            className="block py-2 px-3 text-xl hover:bg-orange-700 hover:text-white-700 hover:text-2xl"
                        >
                            <i className="bi bi-building"></i>
                        </Link>
                        <Link
                            to="/user/dashboard/employees"
                            className="block py-2 px-3 text-xl hover:bg-orange-700 hover:text-white-700 hover:text-2xl"
                        >
                            <i className="bi bi-people"></i>
                        </Link>

                    </nav>
                </>
            )}
        </aside>
    );
};

export default Sidebar;