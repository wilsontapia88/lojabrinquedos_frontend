import React, { useState } from 'react';
import { Customer } from '../../types';
import { addSale } from '../../services/salesService';
import { X, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface RegisterSaleModalProps {
  customer: Customer;
  onClose: () => void;
  onSuccess: () => void;
}

const RegisterSaleModal: React.FC<RegisterSaleModalProps> = ({ customer, onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await addSale({
        customerId: customer.id,
        amount: parseFloat(amount),
        date,
      });
      onSuccess();
    } catch (err) {
      setError('Falha ao registrar venda. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Registrar Venda</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">{customer.name}</h4>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Valor da Venda (R$)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full pl-10 pr-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0,00"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Data da Venda
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              {loading ? 'Registrando...' : 'Registrar Venda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterSaleModal;