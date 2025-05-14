import React, { useState, useEffect } from 'react';
import { getSalesByDay } from '../../services/salesService';
import { SalesByDay } from '../../types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesByDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSalesData();
  }, []);

  const loadSalesData = async () => {
    setLoading(true);
    try {
      const data = await getSalesByDay();
      data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setSalesData(data);
    } catch (err) {
      setError('Falha ao carregar dados de vendas');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd 'de' MMM", { locale: ptBR });
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Vendas Diárias</h3>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={salesData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis 
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              formatter={(value) => [`R$ ${value}`, 'Vendas']}
              labelFormatter={(label) => `Data: ${format(new Date(label), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`}
            />
            <Legend />
            <Bar 
              dataKey="total" 
              name="Vendas Diárias" 
              fill="#4F46E5" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;