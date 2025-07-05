import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

// Pages principales (on va les créer)
import Dashboard from '../pages/Dashboard';
import Challenges from '../pages/Challenges';
import Badges from '../pages/Badges';
import Statistics from '../pages/Statistics';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

// Layout principal avec navigation
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Page d'accueil - Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Pages principales */}
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Redirections */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter; 