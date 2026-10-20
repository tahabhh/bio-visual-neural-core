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
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Receipt,
  ShoppingCart,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

const detailedTransactions = [
  { id: 'TX-9021', date: '2023-10-24', time: '14:20 PM', type: 'بيع', description: 'فاتورة مبيعات - شركة النور للتجارة', amount: 1250.00, status: 'مكتمل', icon: ShoppingCart, color: 'emerald' },
  { id: 'TX-9022', date: '2023-10-24', time: '11:05 AM', type: 'شراء', description: 'تجديد مخزون - مواد أولية (حديد)', amount: -2400.00, status: 'معلق', icon: Receipt, color: 'blue' },
  { id: 'TX-9023', date: '2023-10-23', time: '09:45 AM', type: 'خسارة', description: 'تلف بضائع في المستودع ب', amount: -450.00, status: 'مؤكد', icon: ShieldAlert, color: 'slate' },
  { id: 'TX-9024', date: '2023-10-23', time: '16:30 PM', type: 'بيع', description: 'بيع نقدي - متجر التجزئة الرئيسي', amount: 850.25, status: 'مكتمل', icon: ShoppingCart, color: 'emerald' },
];

export function Finance() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">سجل المعاملات اليومية</h2>
          <p className="text-slate-500 mt-1">تتبع التدفقات المالية والمبيعات في الوقت الفعلي</p>
        </div>
        <div className="flex gap-4">
          <StatSummary label="إجمالي المبيعات" value="12,450.50" change="+12%" icon={<TrendingUp className="h-4 w-4" />} color="emerald" />
          <StatSummary label="إجمالي المصاريف" value="3,210.00" change="+5%" icon={<TrendingDown className="h-4 w-4" />} color="red" />
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-3 space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">النطاق الزمني</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none">
              <option>اليوم</option>
              <option>آخر 7 أيام</option>
              <option>هذا الشهر</option>
              <option>تاريخ مخصص...</option>
            </select>
          </div>
          <div className="md:col-span-3 space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">نوع المعاملة</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none">
              <option>الكل</option>
              <option>بيع</option>
              <option>شراء</option>
              <option>خسارة/تلف</option>
            </select>
          </div>
          <div className="md:col-span-3 space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">الحالة</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none">
              <option>الكل</option>
              <option>مكتمل</option>
              <option>معلق</option>
              <option>ملغى</option>
            </select>
          </div>
          <div className="md:col-span-3 flex gap-2">
            <button className="flex-1 bg-slate-900 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm shadow-md">
              <Filter className="h-4 w-4" />
              تصفية متقدمة
            </button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr className="text-[10px] text-slate-400 tracking-widest font-bold uppercase">
                <th className="px-6 py-5">رقم المعاملة</th>
                <th className="px-6 py-5">التاريخ والوقت</th>
                <th className="px-6 py-5">نوع الحركة</th>
                <th className="px-6 py-5">الوصف / العميل</th>
                <th className="px-6 py-5 text-left">القيمة (د.ت)</th>
                <th className="px-6 py-5">الحالة</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {detailedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-5 text-xs font-mono text-slate-500">{tx.id}</td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-slate-800">{tx.date}</div>
                    <div className="text-[10px] text-slate-400">{tx.time}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${
                      tx.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      tx.color === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-slate-50 text-slate-700 border border-slate-100'
                    }`}>
                      <tx.icon className="h-3 w-3" />
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">{tx.description}</td>
                  <td className={`px-6 py-5 font-mono text-sm font-bold text-left ${tx.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                    {tx.amount < 0 ? '-' : '+'} {Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tx.status === 'مكتمل' ? 'bg-emerald-100 text-emerald-700' :
                      tx.status === 'معلق' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-left">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-400">عرض 1-4 من أصل 150 معاملة</p>
          <div className="flex gap-1">
            <button className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors">2</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors">3</button>
            <button className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
          <div className="relative z-10 flex justify-between items-start">
             <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">تسوية الحسابات</h3>
              <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                قم بمراجعة جميع العمليات المعلقة وضمان تطابق السجلات البنكية مع النظام المحاسبي لـ EnterpriseOS.
              </p>
            </div>
            <div className="h-14 w-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
              <ArrowUpRight className="h-8 w-8" />
            </div>
          </div>
          <button className="relative z-10 mt-10 w-full md:w-fit px-12 py-3 bg-slate-900 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-3">
            بدء التسوية الآن
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          {/* Decorative shapes */}
          <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-slate-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 right-10 h-32 w-32 border-2 border-slate-100 rounded-full"></div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col group overflow-hidden relative">
          <div className="relative z-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="font-bold">تحليل التدفق الأسبوعي</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-end gap-2 h-24">
                {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-white/10 hover:bg-emerald-400/50 transition-all rounded-sm" 
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1">
                <span>س</span><span>ح</span><span>إ</span><span>ث</span><span>ر</span><span>خ</span><span>ج</span>
              </div>
            </div>
          </div>
          <button className="relative z-10 mt-auto text-emerald-400 text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
             عرض التقرير الكامل
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatSummary({ label, value, change, icon, color }: any) {
  return (
    <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl flex items-center gap-4 transition-all hover:shadow-sm">
      <div className={`p-2.5 rounded-xl ${color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-slate-900">{value} د.ت</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}
