import React, { useState, useEffect, useCallback } from 'react';
import { getClientesTratados } from '../../adapters/customerAdapter';
import { getCustomers, deleteCustomer } from '../../services/customerService';
import { Customer, CustomerFilters } from '../../types';
import { findFirstMissingLetter } from '../../utils/stringUtils';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { User, Mail, Calendar, Settings as AlphabetLatin, Search, Trash2, Edit, Plus } from 'lucide-react';
import CustomerEditModal from './CustomerEditModal';
import RegisterSaleModal from './RegisterSaleModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useDebounce } from '../../hooks/useDebounce';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<CustomerFilters>({ name: '', email: '' });
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [registeringSale, setRegisteringSale] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  const debouncedFilters = useDebounce(filters, 300);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCustomers(debouncedFilters);
      const data2 = await getClientesTratados();

      console.log('Clientes tratados:', data2);

      const allCustomers = [...data, ...data2];

      console.log('allcutomers:', allCustomers);

      setCustomers(allCustomers);
    } catch (err) {
      setError('Falha ao carregar clientes');
    } finally {
      setLoading(false);
    }
  }, [debouncedFilters]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleDelete = async (customer: Customer) => {
    setDeletingCustomer(customer);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCustomer) return;

    try {
      await deleteCustomer(deletingCustomer.id);
      await loadCustomers();
    } catch (err) {
      setError('Falha ao excluir cliente');
    } finally {
      setDeletingCustomer(null);
    }
  };

  const handleEditSuccess = () => {
    setEditingCustomer(null);
    loadCustomers();
  };

  const handleSaleSuccess = () => {
    setRegisteringSale(null);
    loadCustomers();
  };

  const handleFilterChange = (field: keyof CustomerFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Lista de Clientes</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Detalhes e informações sobre seus clientes.
        </p>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nameFilter" className="block text-sm font-medium text-gray-700">
              Filtrar por Nome
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="nameFilter"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Digite um nome..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="emailFilter" className="block text-sm font-medium text-gray-700">
              Filtrar por Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="emailFilter"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Digite um email..."
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Nascimento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Letra Faltante
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : (
                    'Nenhum cliente encontrado.'
                  )}
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">
                          Cliente desde {format(parseISO(customer.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {format(new Date(customer.birthDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-indigo-50 rounded-full p-2 mr-2">
                        <AlphabetLatin className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium">
                        {findFirstMissingLetter(customer.name)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setRegisteringSale(customer)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        <span>Venda</span>
                      </button>
                      <button
                        onClick={() => setEditingCustomer(customer)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(customer)}
                        className="text-red-600 hover:text-red-900 flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingCustomer && (
        <CustomerEditModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {registeringSale && (
        <RegisterSaleModal
          customer={registeringSale}
          onClose={() => setRegisteringSale(null)}
          onSuccess={handleSaleSuccess}
        />
      )}

      {deletingCustomer && (
        <DeleteConfirmationModal
          customerName={deletingCustomer.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingCustomer(null)}
        />
      )}
    </div>
  );
};

export default CustomerList;