import React from 'react';
import { Product } from '../types';

interface StatisticsProps {
  products: Product[];
}

export const Statistics: React.FC<StatisticsProps> = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const lowStockCount = products.filter(p => p.quantity <= p.minQuantity).length;
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);

  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: totalProducts,
      icon: '📦',
      color: 'bg-blue-500',
    },
    {
      title: 'إجمالي القيمة',
      value: `${totalValue.toFixed(2)} ر.س`,
      icon: '💰',
      color: 'bg-green-500',
    },
    {
      title: 'منتجات منخفضة المخزون',
      value: lowStockCount,
      icon: '⚠️',
      color: 'bg-red-500',
    },
    {
      title: 'إجمالي الوحدات',
      value: totalItems,
      icon: '📊',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
