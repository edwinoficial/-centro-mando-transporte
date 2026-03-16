import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import UserManagement from '../pages/UserManagement';
import Monitoring from '../pages/Monitoring';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/usuarios" element={<UserManagement />} />
      <Route path="/monitoreo" element={<Monitoring />} />
    </Routes>
  );
}

export default AppRoutes;
