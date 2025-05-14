import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, LogIn } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-8">
        <div className="bg-indigo-600 p-3 rounded-full">
          <User className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Entre na sua conta
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 pl-10 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite seu email"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite sua senha"
            required
          />
        </div>
        
        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Entrando...' : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Entrar
              </>
            )}
          </button>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Credenciais de demonstração já preenchidas.</p>
          <p className="mt-1">Não é necessário criar uma conta para esta demo.</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;