import React from 'react';
import Layout from '../components/layout/Layout';
import SalesChart from '../components/dashboard/SalesChart';
import CustomerHighlights from '../components/dashboard/CustomerHighlights';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do desempenho de vendas e principais clientes</p>
        </header>
        
        <div className="mb-8">
          <CustomerHighlights />
        </div>
        
        <div className="mb-8">
          <SalesChart />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;