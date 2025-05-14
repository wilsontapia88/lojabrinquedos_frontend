import { Customer, Sale, SalesByDay, CustomerStat } from '../types';
import apiBrinquedos from '../api/apiBrinquedos';
import { format } from 'date-fns';

export const getSalesByDay = async (): Promise<SalesByDay[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.get('/api/estatisticas/vendas-por-dia', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const sales: SalesByDay[] = response.data;

    return sales.sort((a, b) => a.date.localeCompare(b.date));

  } catch (error) {
    console.error('Erro ao buscar vendas por dia:', error);
    throw new Error('Erro ao buscar vendas por dia');
  }
};

export const addSale = async (sale: Omit<Sale, 'id'>): Promise<Sale> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.post(`api/clientes/${sale.customerId}/vendas`, sale, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    console.error('Erro ao adicionar venda:', error);
    throw new Error('Erro ao adicionar venda');
  }
};

export const getCustomerWithHighestSales = async (): Promise<CustomerStat> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.get('/api/estatisticas/top-clientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.maior_volume_vendas;

    return {
      id: data.cliente.id,
      name: data.cliente.name,
      value: data.amount,
      label: 'Maior Volume de Vendas',
    };

  } catch (error) {
    console.error('Erro ao buscar cliente com maior volume de vendas:', error);
    throw new Error('Erro ao buscar cliente com maior volume de vendas');
  }
};

export const getCustomerWithHighestAvgSale = async (): Promise<CustomerStat> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.get('/api/estatisticas/top-clientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.maior_media_por_venda;

    return {
      id: data.cliente.id,
      name: data.cliente.name,
      value: Math.round(data.media * 100) / 100,
      label: 'Maior Média por Venda',
    };

  } catch (error) {
    console.error('Erro ao buscar cliente com maior média por venda:', error);
    throw new Error('Erro ao buscar cliente com maior média por venda');
  }
};

export const getCustomerWithHighestFrequency = async (): Promise<CustomerStat> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiBrinquedos.get('/api/estatisticas/top-clientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.maior_frequencia_compras;

    return {
      id: data.cliente.id,
      name: data.cliente.name,
      value: data.dias,
      label: 'Cliente Mais Frequente',
    };

  } catch (error) {
    console.error('Erro ao buscar cliente mais frequente:', error);
    throw new Error('Erro ao buscar cliente mais frequente');
  }
};
