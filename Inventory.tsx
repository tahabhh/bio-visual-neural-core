/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart, 
  ChevronRight, 
  ChevronLeft,
  RefreshCw,
  Plus
} from 'lucide-react';

const products = [
  { 
    id: 1, 
    name: 'مقرونة سباغيتي', 
    specs: '500غ - رفيعة', 
    category: 'معجنات', 
    quantity: 120, 
    barcode: 'PASTA-8822-TN', 
    status: 'متوفر',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 2, 
    name: 'سماعات سوني WH-1000XM5', 
    specs: 'أسود، مانع ضوضاء', 
    category: 'إلكترونيات', 
    quantity: 5, 
    barcode: 'SONY-9921-XM5', 
    status: 'خزون منخفض',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 3, 
    name: 'كرسي مكاتب هيرمان ميلر', 
    specs: 'Aeron Model B', 
    category: 'أثاث مكتبي', 
    quantity: 18, 
    barcode: 'HM-CH-4412-AE', 
    status: 'متوفر',
    image: 'https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 4, 
    name: 'لوحة مفاتيح لوجيتيك MX', 
    specs: 'Mechanical Linear', 
    category: 'إكسسوارات', 
    quantity: 156, 
    barcode: 'LOGI-9981-MXM', 
    status: 'متوفر',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&q=80&w=100'
  }
];

export function Inventory() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">إدارة المخزون</h2>
          <p className="text-slate-500 mt-1">عرض وتتبع كافة المنتجات والمستلزمات في المستودع الرئيسي</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="h-4 w-4" />
            تصفية
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard label="إجمالي الأصناف" value="1,284" trend="+12% هذا الشهر" icon={<BarChart className="h-4 w-4" />} color="#131b2e" />
        <SummaryCard label="قيمة المخزون" value="452,000" trend="نمو مستقر" icon={<ArrowUpRight className="h-4 w-4" />} color="#131b2e" subText="ر.س" />
        <SummaryCard label="نقص المخزون" value="12" trend="يحتاج لإعادة طلب" icon={<AlertTriangle className="h-4 w-4" />} color="#EF4444" isAlert />
        <SummaryCard label="الباركود النشط" value="100%" trend="تغطية شاملة" icon={<CheckCircle2 className="h-4 w-4" />} color="#10B981" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="البحث برقم الباركود أو الاسم..."
                className="w-full pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none shadow-sm"
              />
            </div>
            <div className="hidden lg:flex gap-2">
              <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-bold cursor-pointer">الكل</span>
              <span className="px-3 py-1 hover:bg-slate-100 rounded-full text-xs font-medium cursor-pointer transition-colors">إلكترونيات</span>
              <span className="px-3 py-1 hover:bg-slate-100 rounded-full text-xs font-medium cursor-pointer transition-colors">أثاث مكتبي</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 whitespace-nowrap">
            عرض 1-10 من أصل 1,284 منتج
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <th className="px-6 py-4">اسم المنتج</th>
                <th className="px-6 py-4">العائلة</th>
                <th className="px-6 py-4">الكمية</th>
                <th className="px-6 py-4">الباركود الفريد</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{product.name}</div>
                        <div className="text-[10px] text-slate-500">{product.specs}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-mono font-bold ${product.quantity < 10 ? 'text-red-500' : 'text-slate-700'}`}>
                      {product.quantity} وحدة
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="p-1 px-2 bg-slate-50 border border-slate-200 rounded w-fit">
                         <div 
                          className="h-6 w-24 bg-slate-900" 
                          style={{ 
                            backgroundImage: `repeating-linear-gradient(90deg, #000, #000 ${Math.random() * 2 + 1}px, transparent ${Math.random() * 2 + 1}px, transparent ${Math.random() * 4 + 2}px)`
                          }} 
                        />
                      </div>
                      <code className="text-[9px] text-slate-400 font-mono tracking-tighter uppercase">{product.barcode}</code>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      product.status === 'متوفر' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500">إظهار 10 نتائج في الصفحة</span>
          <div className="flex gap-1">
            <button className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors disabled:opacity-50">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50">2</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50">3</button>
            <button className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-between group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg group-hover:rotate-12 transition-transform">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">معاينة الباركود السريع</h3>
              <p className="text-xs text-slate-500">أدخل رمز المنتج لتوليد معاينة فورية للباركود</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="مثال: SKU-10293" 
              className="flex-1 px-4 py-2 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:opacity-90 transition-all text-sm">توليد</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <RefreshCw className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">آخر مزامنة</h4>
              <p className="text-xs text-slate-500">تم تحديث المخزون قبل 3 دقائق</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm">
            مزامنة الآن
          </button>
        </div>
      </div>

      <button className="fixed bottom-8 left-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-10 group">
        <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
      </button>
    </div>
  );
}

function SummaryCard({ label, value, trend, icon, color, subText, isAlert }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden h-32">
      {isAlert && <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rotate-45 translate-x-8 -translate-y-8" />}
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight" style={{ color }}>{value}</span>
        {subText && <span className="text-xs text-slate-400">{subText}</span>}
      </div>
      <div className="mt-auto flex items-center gap-1 font-bold text-[10px]" style={{ color: isAlert ? '#EF4444' : '#10B981' }}>
        {icon}
        <span>{trend}</span>
      </div>
    </div>
  );
}
