import React, { useState, useEffect } from 'react';
import {
  getCustomerWithHighestSales,
  getCustomerWithHighestAvgSale,
  getCustomerWithHighestFrequency
} from '../../services/salesService';
import { CustomerStat } from '../../types';
import { TrendingUp, DollarSign, Star } from 'lucide-react';

const CustomerHighlights: React.FC = () => {
  const [stats, setStats] = useState<CustomerStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [highestSales, highestAvg, highestFreq] = await Promise.all([
        getCustomerWithHighestSales(),
        getCustomerWithHighestAvgSale(),
        getCustomerWithHighestFrequency()
      ]);
      
      setStats([highestSales, highestAvg, highestFreq]);
    } catch (err) {
      setError('Falha ao carregar estatísticas dos clientes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm h-40 flex justify-center items-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
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

  const getIconForStat = (index: number) => {
    switch (index) {
      case 0: // Highest sales
        return <DollarSign className="h-6 w-6 text-green-500" />;
      case 1: // Highest average
        return <TrendingUp className="h-6 w-6 text-indigo-500" />;
      case 2: // Most frequent
        return <Star className="h-6 w-6 text-amber-500" />;
      default:
        return <Star className="h-6 w-6 text-gray-500" />;
    }
  };

  const getColorClassForStat = (index: number) => {
    switch (index) {
      case 0: // Highest sales
        return "from-green-50 to-green-100 border-green-200";
      case 1: // Highest average
        return "from-indigo-50 to-indigo-100 border-indigo-200";
      case 2: // Most frequent
        return "from-amber-50 to-amber-100 border-amber-200";
      default:
        return "from-gray-50 to-gray-100 border-gray-200";
    }
  };

  const formatValue = (stat: CustomerStat, index: number) => {
    switch (index) {
      case 0: // Highest sales
        return `R$ ${stat.value.toLocaleString('pt-BR')}`;
      case 1: // Highest average
        return `R$ ${stat.value.toLocaleString('pt-BR')}`;
      case 2: // Most frequent
        return `${stat.value} compras`;
      default:
        return stat.value;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`bg-gradient-to-br p-6 rounded-lg shadow-sm border ${getColorClassForStat(index)} transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex items-center mb-4">
            <div className="bg-white p-2 rounded-full shadow-sm mr-3">
              {getIconForStat(index)}
            </div>
            <h3 className="text-md font-medium text-gray-800">{stat.label}</h3>
          </div>
          
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900">
              {stat.name}
            </div>
            <div className="text-lg font-semibold mt-1">
              {formatValue(stat, index)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerHighlights;