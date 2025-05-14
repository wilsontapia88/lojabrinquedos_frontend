import { Customer } from '../types/index';

export const normalizeClientesComRuido = (data: any): Customer[] => {
  const clientes: any[] = data?.data?.clientes || [];

  return clientes.map((cliente: any, index: number): Customer => {
    const name = cliente?.info?.nomeCompleto || cliente?.duplicado?.nomeCompleto || '';
    const email = cliente?.info?.detalhes?.email || '';
    const birthDate = cliente?.info?.detalhes?.nascimento || '';
    const vendas = cliente?.estatisticas?.vendas || [];
    const created_at = cliente?.created_at || new Date().toISOString();
    const id = `ruido-${index}`; // Gera ID único baseado no índice

    return { id, name, email, birthDate, created_at, vendas};
  });
};
