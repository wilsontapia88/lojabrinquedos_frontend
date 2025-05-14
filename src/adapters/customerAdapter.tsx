import { getCustomersRuido} from '../services/customerService';
import { normalizeClientesComRuido } from '../utils/normalizeClientesComRuido';
import { Customer } from '../types';

export const getClientesTratados = async (): Promise<Customer[]> => {
  try {
    const [dadosComRuido] = await Promise.all([
      //getCustomers(),       // Já vem limpo:
      getCustomersRuido()   // Vem com ruído
    ]);

    const clientesTratados = normalizeClientesComRuido(dadosComRuido);

    return clientesTratados;

  } catch (error) {
    console.error('Erro ao obter e tratar clientes:', error);
    return [];
  }
};