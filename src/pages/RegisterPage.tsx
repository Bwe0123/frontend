import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      console.log(username, password)
      const response = await axiosInstance.post('/register', {
        username,
        password,
      });
      setSuccessMessage(response.data.message || 'Registration successful!');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-starsw bg-cover bg-center"></div>
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg shadow-lg border border-yellow-400">
        <h2 className="text-3xl font-starwars text-yellow-400 text-center mb-6">
          Join the Galaxy!
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-yellow-400">
              Choose your Jedi Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-yellow-300 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your Jedi name"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-yellow-400">
              Secret Code
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-yellow-300 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your secret code"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-md text-lg hover:bg-yellow-300 transition-all"
          >
            Register
          </button>
        </form>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-900 text-yellow-400 py-2 mt-4 rounded-md hover:bg-gray-800 transition-all"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
