import { useState, useEffect, useMemo } from 'react';
import { Product } from './types';
import { ProductCard } from './components/ProductCard';
import { ProductForm } from './components/ProductForm';
import { Statistics } from './components/Statistics';
import { SearchBar } from './components/SearchBar';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('inventory_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Add sample data
      const sampleProducts: Product[] = [
        {
          id: '1',
          name: 'لابتوب ديل',
          category: 'إلكترونيات',
          quantity: 15,
          minQuantity: 5,
          price: 3500,
          supplier: 'شركة التقنية المتقدمة',
          addedDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'ماوس لاسلكي',
          category: 'إلكترونيات',
          quantity: 3,
          minQuantity: 10,
          price: 85,
          supplier: 'شركة الأجهزة الذكية',
          addedDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'طابعة HP',
          category: 'إلكترونيات',
          quantity: 8,
          minQuantity: 3,
          price: 1200,
          supplier: 'مؤسسة المكاتب الحديثة',
          addedDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'دفتر ملاحظات',
          category: 'قرطاسية',
          quantity: 50,
          minQuantity: 20,
          price: 15,
          supplier: 'مكتبة النور',
          addedDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        },
      ];
      setProducts(sampleProducts);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('inventory_products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (productData: Omit<Product, 'id' | 'addedDate' | 'lastModified'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      addedDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    setShowForm(false);
  };

  const handleEditProduct = (productData: Omit<Product, 'id' | 'addedDate' | 'lastModified'>) => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...productData, lastModified: new Date().toISOString() }
          : p
      ));
      setEditingProduct(undefined);
      setShowForm(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📦 نظام إدارة المخزون
          </h1>
          <p className="text-gray-600">إدارة احترافية وفعالة للمخزون والمنتجات</p>
        </div>

        {/* Statistics */}
        <Statistics products={products} />

        {/* Add Product Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
          >
            <span className="text-xl">➕</span>
            إضافة منتج جديد
          </button>
        </div>

        {/* Search and Filter */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-600">
              {searchTerm || categoryFilter
                ? 'لم يتم العثور على منتجات تطابق البحث'
                : 'ابدأ بإضافة منتجات إلى المخزون'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditClick}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}

        {/* Product Form Modal */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={handleCancelForm}
          />
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2024 نظام إدارة المخزون - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}

export default App;
