import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import OrdersPage from './pages/OrdersPage';
import GloboplayUsers from './pages/GloboplayUsers';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/globoplay-users" element={<GloboplayUsers />} />
      </Routes>
    </BrowserRouter>
  );
};
