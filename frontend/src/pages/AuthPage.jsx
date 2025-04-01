import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on new submission

    try {
      let response;

      if (isLogin) {
        response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
        });
      } else {
        response = await axios.post('http://localhost:5000/api/register', {
          name, // Changed from username to name
          email,
          password,
        });
      }

      localStorage.setItem('token', response.data.access);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          setError('Invalid email or password.');
        } else if (status === 409) {
          setError('Email already in use.');
        } else {
          setError(data.message || 'Authentication failed. Please try again.');
        }
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <Briefcase className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold">
            {isLogin ? 'Sign in to Skilling for Entrepreneurship' : 'Join Skilling for Entrepreneurship'}
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-500" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
