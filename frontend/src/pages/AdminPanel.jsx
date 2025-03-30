import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Book, Edit, Trash2, Search, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const AdminPanel = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/auth");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Users size={28} className="text-indigo-600 dark:text-indigo-400" />
          Admin Panel - Manage Users & Courses
        </h2>
        <div className="flex items-center gap-4">
          <p className="text-gray-700 dark:text-gray-300">Welcome, {user?.name}</p>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <LogOut size={20} className="mr-1" /> Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
        <Search size={20} className="text-gray-600 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search users or courses..."
          className="bg-transparent outline-none px-2 w-full text-gray-800 dark:text-white"
        />
      </div>

      {/* Users Management Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-white">👥 Manage Users</h3>
        <table className="w-full mt-3 border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample User Row */}
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="p-2 text-gray-800 dark:text-white">Jane Doe</td>
              <td className="p-2 text-gray-600 dark:text-gray-300">jane@example.com</td>
              <td className="p-2 text-gray-600 dark:text-gray-300">Trainer</td>
              <td className="p-2 flex gap-3">
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800">
                  <Edit size={18} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Courses Management Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-white">📚 Manage Courses</h3>
        <table className="w-full mt-3 border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white">
              <th className="p-2 text-left">Course Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Course Row */}
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="p-2 text-gray-800 dark:text-white">Business Planning</td>
              <td className="p-2 text-gray-600 dark:text-gray-300">Entrepreneurship</td>
              <td className="p-2 flex gap-3">
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800">
                  <Edit size={18} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
