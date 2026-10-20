/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Plus, Bell, Settings, User } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-6 flex-1">
        <span className="text-lg font-bold text-slate-900 md:hidden">EnterpriseOS</span>
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="بحث (Command+K)"
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#131b2e]/10 focus:border-[#131b2e] outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#131b2e] text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm">
          <Plus className="h-3.5 w-3.5" />
          إضافة منتج
        </button>
        
        <div className="flex items-center gap-1 border-r border-slate-200 pr-4 mr-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-500 group-hover:border-slate-300 transition-all">
            <User className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-slate-700 hidden lg:block group-hover:text-slate-900">الملف الشخصي</span>
        </div>
      </div>
    </header>
  );
}
