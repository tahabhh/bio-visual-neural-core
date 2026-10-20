import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const isLowStock = product.quantity <= product.minQuantity;
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        {isLowStock && (
          <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
            ⚠️ مخزون منخفض
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">الكمية:</span>
          <span className={`font-bold ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
            {product.quantity} وحدة
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">الحد الأدنى:</span>
          <span className="font-medium text-gray-700">{product.minQuantity} وحدة</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">السعر:</span>
          <span className="font-bold text-green-600">{product.price.toFixed(2)} ر.س</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">المورد:</span>
          <span className="font-medium text-gray-700">{product.supplier}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">آخر تحديث:</span>
          <span className="text-gray-600">{new Date(product.lastModified).toLocaleDateString('ar-SA')}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          تعديل
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          حذف
        </button>
      </div>
    </div>
  );
};
