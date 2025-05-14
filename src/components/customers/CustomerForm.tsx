import React, { useState } from 'react';
import { addCustomer } from '../../services/customerService';
import { UserPlus } from 'lucide-react';

interface CustomerFormProps {
  onSuccess: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await addCustomer({
        name,
        email,
        birthDate,
      });
      
      
      setName('');
      setEmail('');
      setBirthDate('');
      setIsFormVisible(false);
          
      onSuccess();
    } catch (error) {
      setError('Falha ao adicionar cliente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <UserPlus className="h-5 w-5 mr-2 text-indigo-600" />
          Adicionar Novo Cliente
        </h3>
        <button className="text-gray-400 hover:text-indigo-600">
          <svg 
            className={`h-5 w-5 transition-transform ${isFormVisible ? 'transform rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {isFormVisible && (
        <div className="px-4 pb-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Endereço de Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Adicionando...' : 'Adicionar Cliente'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;