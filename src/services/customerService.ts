import axios from 'axios';
import { Customer } from '../types';
import apiBrinquedos from '../api/apiBrinquedos';

export const getCustomers = async (
  filters?: { name?: string; email?: string }
): Promise<Customer[]> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado');
      return [];
    }

    const params: Record<string, string> = {};
    if (filters?.name) params.name = filters.name;
    if (filters?.email) params.email = filters.email;

    const response = await apiBrinquedos.get('/api/clientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    const customers: Customer[] = response?.data?.data || [];
    return customers;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro da API:', error.response?.data || error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return [];
  }
};

export const getCustomersRuido = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado');
      return [];
    }

    const response = await apiBrinquedos.get('/api/teste-clientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro da API:', error.response?.data || error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return [];
  }
};

export const getCustomer = async (id: string): Promise<Customer | null> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.get(`/api/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${id}:`, error);
    return null;
  }
};

export const addCustomer = async (
  customer: Omit<Customer, 'id' | 'createdAt'>
): Promise<Customer> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.post('/api/clientes', customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    throw new Error('Erro ao adicionar cliente');
  }
};

export const updateCustomer = async (
  id: string,
  data: Partial<Customer>
): Promise<Customer | null> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.put(`/api/clientes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw new Error('Erro ao atualizar cliente');
  }
};

export const deleteCustomer = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    await apiBrinquedos.delete(`/api/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;

  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    return false;
  }
};
