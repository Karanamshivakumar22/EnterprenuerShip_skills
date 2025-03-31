import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              Skilling for Entrepreneurship
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="nav-link">Courses</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/profile" className="nav-link">
                  {user?.name || 'Profile'}
                </Link>
         
          

            {/* Auth Links */}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="nav-link">Logout</button>
            ) : (
              <Link to="/auth" className="nav-link">SignIn/SignUp</Link>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/courses" 
              className="mobile-nav-link" 
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>

                <Link 
                  to="/dashboard" 
                  className="mobile-nav-link" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="mobile-nav-link" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user?.name || 'Profile'}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="mobile-nav-link text-left w-full"
                >
                  Logout
                </button>
            
              <Link 
                to="/" 
                className="mobile-nav-link" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;