/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  CreditCard, 
  BarChart3, 
  Settings as SettingsIcon, 
  LogOut,
  HeadphonesIcon,
  Activity
} from 'lucide-react';
import { View } from '../App';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as View, label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'inventory' as View, label: 'المخزون', icon: Package },
    { id: 'finance' as View, label: 'المالية', icon: CreditCard },
    { id: 'reports' as View, label: 'التقارير', icon: BarChart3 },
    { id: 'settings' as View, label: 'الإعدادات', icon: SettingsIcon },
  ];

  return (
    <aside className="fixed top-0 right-0 h-screen w-64 bg-white border-l border-slate-200 z-50 flex flex-col transition-all">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-[#131b2e] text-white flex items-center justify-center rounded-lg shadow-lg">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">EnterpriseOS</h1>
            <p className="text-[10px] text-slate-500 font-medium">إدارة العمليات</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                  isActive 
                    ? "bg-slate-900 text-white font-bold shadow-md transform translate-x-1" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
                <span>{item.label}</span>
                {isActive && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/50">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors mb-4">
          <HeadphonesIcon className="h-4 w-4" />
          دعم فني
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
          <LogOut className="h-5 w-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
