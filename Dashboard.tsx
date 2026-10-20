/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Calendar, Download, MoreHorizontal } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const chartData = [
  { name: 'جانفي', income: 12000, expense: 8000 },
  { name: 'فيفري', income: 15000, expense: 9000 },
  { name: 'مارس', income: 13000, expense: 11000 },
  { name: 'أفريل', income: 18000, expense: 10000 },
  { name: 'ماي', income: 22000, expense: 12000 },
  { name: 'جوان', income: 19000, expense: 14000 },
  { name: 'جويلية', income: 24000, expense: 13000 },
  { name: 'أوت', income: 21000, expense: 11000 },
  { name: 'سبتمبر', income: 25000, expense: 15000 },
  { name: 'أكتوبر', income: 28000, expense: 12000 },
];

const transactions = [
  { id: 1, date: '2023-10-25', name: 'شركة تونس للاتصالات', category: 'مرافق', amount: -150.0, status: 'مكتمل' },
  { id: 2, date: '2023-10-24', name: 'مبيعات متجر أريانة', category: 'مبيعات', amount: 2450.0, status: 'مكتمل' },
  { id: 3, date: '2023-10-24', name: 'خلاص معاليم ديوانية', category: 'ضرائب', amount: -890.0, status: 'قيد الانتظار' },
  { id: 4, date: '2023-10-23', name: 'عقد استشاري - مجمع النصر', category: 'خدمات', amount: 5000.0, status: 'مكتمل' },
  { id: 5, date: '2023-10-22', name: 'شراء معدات مكتبية', category: 'أصول', amount: -1200.0, status: 'فاشل' },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">لوحة التحكم المالية</h2>
          <p className="text-slate-500 mt-1">نظرة شاملة على الأداء المالي لشهر أكتوبر 2023</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Calendar className="h-4 w-4" />
            آخر 30 يوم
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="إجمالي المداخيل" 
          value="45,280.00" 
          change="+12.5%" 
          positive 
          color="#10B981"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard 
          title="إجمالي المصاريف" 
          value="12,450.00" 
          change="+4.2%" 
          positive={false} 
          color="#EF4444"
          icon={<TrendingDown className="h-5 w-5" />}
        />
        <MetricCard 
          title="صافي الربح" 
          value="32,830.00" 
          change="+18.3%" 
          positive 
          color="#131b2e"
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">توجهات التدفق النقدي</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#131b2e]" />
                <span className="text-xs text-slate-500 font-medium">المداخيل</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-xs text-slate-500 font-medium">المصاريف</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="income" fill="#131b2e" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="expense" fill="#10B981" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-8">توزيع المصاريف</h3>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <DistributionItem label="الرواتب" percentage={45} color="#131b2e" />
            <DistributionItem label="الإيجار والمرافق" percentage={25} color="#10B981" />
            <DistributionItem label="التسويق" percentage={20} color="#76777d" />
            <DistributionItem label="أخرى" percentage={10} color="#cbd5e1" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold">أحدث المعاملات</h3>
          <button className="text-[#131b2e] text-sm font-bold hover:underline">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">المعاملة</th>
                <th className="px-6 py-4">الفئة</th>
                <th className="px-6 py-4 text-left">المبلغ</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{tx.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.category}</td>
                  <td className={`px-6 py-4 text-sm font-mono font-bold text-left ${tx.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                    {tx.amount < 0 ? '-' : '+'} {Math.abs(tx.amount).toLocaleString()} د.ت
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      tx.status === 'مكتمل' ? 'bg-emerald-100 text-emerald-700' :
                      tx.status === 'قيد الانتظار' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, positive, color, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }}></div>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
        <span className="text-xs font-bold" style={{ color: positive ? '#10B981' : '#EF4444' }}>{change}</span>
      </div>
      <h3 className="text-sm text-slate-500 font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">د.ت</span>
      </div>
      <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full group-hover:animate-pulse" style={{ backgroundColor: color, width: '70%' }}></div>
      </div>
    </div>
  );
}

function DistributionItem({ label, percentage, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className="font-bold">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}
