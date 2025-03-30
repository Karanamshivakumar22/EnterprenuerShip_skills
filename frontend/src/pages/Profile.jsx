import { User, Pencil, Lock, LogOut } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/100"
          alt="User Profile"
          className="w-24 h-24 rounded-full border-4 border-indigo-500"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            User Name
          </h2>
          <p className="text-gray-500 dark:text-gray-300">Entrepreneur & Learner</p>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Learning Progress</h3>
        <div className="mt-2 space-y-2">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-3 flex justify-between items-center">
            <span className="text-gray-700 dark:text-white">Business Planning</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">80% Completed</span>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-3 flex justify-between items-center">
            <span className="text-gray-700 dark:text-white">Financial Management</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              60% Completed
            </span>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Settings</h3>
        <div className="mt-3 space-y-3">
          <button className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg w-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Pencil size={20} />
            Edit Profile
          </button>
          <button className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg w-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Lock size={20} />
            Change Password
          </button>
          <button className="flex items-center gap-3 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
