/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Zap, 
  Crown, 
  Key, 
  Copy, 
  Verified, 
  Info,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  const [activationCode, setActivationCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState(false);

  const LIFETIME_CODE = '261009052307040328030412';

  const handleActivate = () => {
    if (activationCode === LIFETIME_CODE) {
      setIsActivated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">الإعدادات والاشتراك</h1>
        <p className="text-slate-500 mt-2">إدارة حساب المؤسسة وخطط الدفع وتفعيل المزايا المتقدمة.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Subscription Plans */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-bold mb-1">خطط الاشتراك المتاحة</h2>
              <p className="text-sm text-slate-400 font-medium">اختر الخطة التي تناسب حجم أعمالك.</p>
            </div>
            {isActivated ? (
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <Crown className="h-3 w-3" />
                نشط مدى الحياة
              </span>
            ) : (
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold">نشط الآن: تجريبي</span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PricingCard 
              label="شهري" 
              price="250" 
              period="شهرياً" 
              features={[
                'إدارة مخزون غير محدودة',
                'تقارير مالية دورية',
                'دعم فني متميز'
              ]}
              icon={<Zap className="h-5 w-5" />}
              isTrial={!isActivated}
            />
            <PricingCard 
              label="سنوي" 
              price="1800" 
              period="سنوياً" 
              popular
              features={[
                'وفر 40% من التكلفة',
                'وصول كامل للتحليلات المتقدمة',
                'أولوية في التحديثات القادمة'
              ]}
              icon={<Crown className="h-5 w-5" />}
              isTrial={!isActivated}
            />
          </div>
        </div>

        {/* Activation Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-center relative overflow-hidden group">
            <div className="mb-6 relative z-10">
              <h2 className="text-xl font-bold mb-1">تفعيل مدى الحياة</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">أدخل كود التفعيل الخاص بمؤسستك للحصول على وصول دائم.</p>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">كود التفعيل</label>
                <div className={cn(
                  "flex items-center border rounded-xl bg-slate-50 p-3 gap-3 transition-all",
                  error ? "border-red-500 ring-2 ring-red-100" : "border-slate-200 focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/5"
                )}>
                  <Key className="h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    placeholder="أدخل كود التفعيل هنا"
                    disabled={isActivated}
                    className="bg-transparent border-none focus:ring-0 w-full font-mono text-sm tracking-widest text-[#131b2e] placeholder:text-slate-300"
                  />
                  {!isActivated && (
                    <button 
                      onClick={() => setActivationCode(LIFETIME_CODE)}
                      className="text-slate-300 hover:text-slate-600 transition-colors"
                      title="لصق الكود (للاختبار)"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {error && <p className="text-[10px] text-red-500 mt-2 font-bold animate-shake">الكود غير صحيح، يرجى المحاولة مرة أخرى.</p>}
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center gap-4 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                  <div className="h-8 w-24 bg-white/20 border border-white/10 rounded flex items-center justify-center">
                    <div className="h-6 w-20 bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_3px)] opacity-50" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">المعاينة التقنية</p>
                  <p className="text-[9px] font-medium leading-tight opacity-80">الكود مرتبط برخصة الخادم الرئيسية لـ EnterpriseOS.</p>
                </div>
              </div>

              <button 
                onClick={handleActivate}
                disabled={isActivated}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all",
                  isActivated 
                    ? "bg-emerald-500 text-white cursor-default" 
                    : "bg-[#10B981] text-white hover:opacity-90 active:scale-95"
                )}
              >
                {isActivated ? (
                  <>
                    <Verified className="h-5 w-5" />
                    تم التفعيل بنجاح
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    تحقق وتفعيل الآن
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">استهلاك الموارد</h3>
              <Info className="h-4 w-4 text-slate-300" />
            </div>
            <div className="space-y-6">
              <UsageProgress label="سعة التخزين السحابي" percentage={75} />
              <UsageProgress label="عدد المستخدمين النشطين" percentage={80} text="12 / 15" variant="emerald" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden h-48 relative group shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
          alt="Analytics" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#131b2e] to-transparent z-10 p-8 flex flex-col justify-end text-white">
          <h4 className="text-2xl font-bold mb-1">ترقية ذكية</h4>
          <p className="text-sm opacity-80 max-w-sm">احصل على استشارات مالية مؤتمتة عند الاشتراك في الخطة السنوية.</p>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ label, price, period, features, icon, popular, isTrial }: any) {
  return (
    <div className={cn(
      "border p-6 rounded-2xl relative transition-all group cursor-pointer",
      popular 
        ? "border-[#131b2e] border-2 bg-white shadow-xl scale-105 z-10" 
        : "border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md"
    )}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#131b2e] text-white text-[9px] px-4 py-1 rounded-full font-bold uppercase tracking-widest">
          الأكثر توفيراً
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <div className={cn("p-2 rounded-lg", popular ? "bg-[#131b2e] text-white" : "bg-slate-200 text-slate-500")}>
          {icon}
        </div>
      </div>
      <div className="mb-6">
        <span className="text-3xl font-bold text-slate-900">{price} د</span>
        <span className="text-xs text-slate-400 mr-1">/ {period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
            {f}
          </li>
        ))}
      </ul>
      <button className={cn(
        "w-full py-3 rounded-xl font-bold text-xs transition-all",
        popular 
          ? "bg-[#131b2e] text-white hover:opacity-90" 
          : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400"
      )}>
        {isTrial ? 'اختيار الخطة' : 'خطة مفعّلة'}
      </button>
    </div>
  );
}

function UsageProgress({ label, percentage, text, variant }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-slate-700">{label}</span>
        <span className="text-xs font-mono font-bold text-slate-400">{text || `${percentage}%`}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            variant === 'emerald' ? "bg-[#10B981]" : "bg-[#131b2e]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
