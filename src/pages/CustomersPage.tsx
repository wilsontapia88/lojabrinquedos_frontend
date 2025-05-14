import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import CustomerForm from '../components/customers/CustomerForm';
import CustomerList from '../components/customers/CustomerList';

const CustomersPage: React.FC = () => {
  const [refresh, setRefresh] = useState(0);

  const handleCustomerAdded = () => {
    // Increment to trigger customer list refresh
    setRefresh(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie as informações dos seus clientes</p>
        </header>
        
        <div className="mb-6">
          <CustomerForm onSuccess={handleCustomerAdded} />
        </div>
        
        <div>
          <CustomerList key={refresh} />
        </div>
      </div>
    </Layout>
  );
};

export default CustomersPage;