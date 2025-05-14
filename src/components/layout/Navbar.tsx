import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Users, BarChart, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">GestãoClientes</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="flex space-x-4 mr-4">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <BarChart className="w-5 h-5 mr-1" />
                    <span>Dashboard</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/customers')}
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Users className="w-5 h-5 mr-1" />
                    <span>Clientes</span>
                  </button>
                </div>
                
                <div className="border-l border-gray-200 h-6 mx-2"></div>
                
                <div className="flex items-center">
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-1 rounded-full">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="ml-4 flex items-center text-sm text-gray-600 hover:text-red-600 focus:outline-none"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="ml-1">Sair</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <div className="flex items-center">
                <div className="bg-gray-100 p-1 rounded-full">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 flex items-center text-sm text-gray-600 hover:text-red-600 focus:outline-none"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <nav className="md:hidden bg-gray-50 py-2">
        <div className="flex justify-around">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 flex flex-col items-center text-xs font-medium"
          >
            <BarChart className="w-5 h-5 mb-1" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigate('/customers')}
            className="text-gray-600 flex flex-col items-center text-xs font-medium"
          >
            <Users className="w-5 h-5 mb-1" />
            <span>Clientes</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;