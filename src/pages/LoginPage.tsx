import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { BarChart } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-3">
          <BarChart className="h-12 w-12 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">CustomerStats</h1>
        <p className="text-gray-600 mt-2">Manage customers and view sales statistics</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;