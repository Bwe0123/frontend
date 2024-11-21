// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; 

import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Provider store={store}>  
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />  

           
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
