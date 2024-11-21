import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axiosInstance.post(`/login`, {
        username,
        password,
      });

      // Сохраняем данные пользователя в localStorage
      localStorage.setItem('user', JSON.stringify({
        username: username,
        token: response.data.token, // предполагается, что сервер отправляет токен
      }));

      setSuccessMessage(response.data.message || 'Welcome to the galaxy!');
      navigate('/home'); // Переход на главную страницу после успешного входа
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-stars bg-cover bg-center"></div>
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg shadow-lg border border-yellow-400">
        <h2 className="text-3xl font-starwars text-yellow-400 text-center mb-6">
          Welcome, Jedi!
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-yellow-400">
              Username
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
              Password
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
            Login
          </button>
        </form>
        <button
          onClick={() => navigate('/register')}
          className="w-full bg-gray-900 text-yellow-400 py-2 mt-4 rounded-md hover:bg-gray-800 transition-all"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
