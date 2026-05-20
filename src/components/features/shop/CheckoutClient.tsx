'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

type PayMethod = 'card' | 'promptpay' | 'truemoney';

export default function CheckoutClient() {
  const { items, total, count, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [method, setMethod] = useState<PayMethod>('card');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', card: '', expiry: '', cvv: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  function set(f: string, v: string) { setForm((p) => ({ ...p, [f]: v })); }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'กรุณาระบุชื่อ';
    if (method === 'card') {
      if (form.card.replace(/\s/g, '').length < 16) e.card = 'หมายเลขบัตรไม่ถูกต้อง';
      if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'รูปแบบ MM/YY';
      if (form.cvv.length < 3) e.cvv = 'CVV ไม่ถูกต้อง';
    }
    if (method === 'truemoney' && form.phone.length < 10) e.phone = 'กรุณาระบุเบอร์โทร';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    router.push('/checkout/success');
  }

  if (!mounted) return <div className="px-12 py-10 text-ink-4 text-sm">กำลังโหลด...</div>;

  if (count === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-ink-3 mb-4">ตะกร้าว่างเปล่า</p>
          <Link href="/courses" className="text-coral hover:underline">ดูหลักสูตร</Link>
        </div>
      </div>
    );
  }

  const inputCls = 'w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper';
  const labelCls = 'block text-sm font-medium text-ink mb-1.5';

  return (
    <div className="px-12 py-10 grid gap-10" style={{ gridTemplateColumns: '1fr 340px' }}>
      {/* Left — payment form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-line rounded-card p-6">
          <h2 className="font-medium text-ink mb-4">วิธีการชำระเงิน</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {([
              { id: 'card',      label: 'บัตรเครดิต/เดบิต', icon: 'award'  },
              { id: 'promptpay', label: 'PromptPay',         icon: 'users'  },
              { id: 'truemoney', label: 'TrueMoney',         icon: 'star'   },
            ] as const).map((m) => (
              <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                className={`flex flex-col items-center gap-2 p-4 border rounded-card text-xs font-medium transition-all ${
                  method === m.id ? 'border-coral bg-coral/5 text-coral' : 'border-line text-ink-3 hover:border-ink-3'
                }`}
              >
                <Icon name={m.icon} size={20} color={method === m.id ? '#d4623f' : '#8a92a6'} />
                {m.label}
              </button>
            ))}
          </div>

          <div>
            <label className={labelCls}>ชื่อผู้ชำระเงิน</label>
            <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="ชื่อ-นามสกุล" />
            {errors.name && <p className="text-coral text-xs mt-1">{errors.name}</p>}
          </div>

          {method === 'card' && (
            <div className="space-y-4 mt-4">
              <div>
                <label className={labelCls}>หมายเลขบัตร</label>
                <input className={inputCls} placeholder="1234 5678 9012 3456" value={form.card}
                  onChange={(e) => { const v = e.target.value.replace(/\D/g,'').slice(0,16); set('card', v.replace(/(.{4})/g,'$1 ').trim()); }} />
                {errors.card && <p className="text-coral text-xs mt-1">{errors.card}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>วันหมดอายุ</label>
                  <input className={inputCls} placeholder="MM/YY" maxLength={5} value={form.expiry}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g,'').slice(0,4); set('expiry', v.length>2?`${v.slice(0,2)}/${v.slice(2)}`:v); }} />
                  {errors.expiry && <p className="text-coral text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className={labelCls}>CVV</label>
                  <input className={inputCls} placeholder="123" maxLength={4} value={form.cvv} onChange={(e) => set('cvv', e.target.value.replace(/\D/g,''))} />
                  {errors.cvv && <p className="text-coral text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {method === 'promptpay' && (
            <div className="mt-4 text-center py-8 border border-dashed border-line rounded-card">
              <div className="w-32 h-32 bg-cream-2 rounded mx-auto mb-3 flex items-center justify-center text-xs text-ink-4">QR Code</div>
              <p className="text-sm text-ink-3">สแกน QR เพื่อชำระเงิน</p>
              <p className="font-mono text-xs text-ink-4 mt-1">PromptPay: 0-9999-99999-9</p>
            </div>
          )}

          {method === 'truemoney' && (
            <div className="mt-4">
              <label className={labelCls}>หมายเลขโทรศัพท์</label>
              <input className={inputCls} placeholder="0812345678" maxLength={10} value={form.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g,''))} />
              {errors.phone && <p className="text-coral text-xs mt-1">{errors.phone}</p>}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}
          className="w-full h-12 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors disabled:opacity-60 text-base"
        >
          {loading ? 'กำลังดำเนินการ...' : `ชำระเงิน ${formatPrice(total)}`}
        </button>
        <p className="text-center text-xs text-ink-4 flex items-center justify-center gap-1.5">
          <Icon name="check" size={12} color="#8a92a6" /> การชำระเงินปลอดภัย — ข้อมูลถูกเข้ารหัส SSL
        </p>
      </form>

      {/* Right — order summary */}
      <div className="sticky top-8 self-start space-y-4">
        <div className="bg-white border border-line rounded-card p-6">
          <h2 className="font-medium text-ink mb-4">สรุปคำสั่งซื้อ</h2>
          <div className="space-y-3 mb-5">
            {items.map((item) => (
              <div key={item.courseId} className="flex gap-3">
                <div className={`ph ${item.tint} rounded-[6px] shrink-0`} style={{ width: 56, height: 40, fontSize: 8 }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-ink line-clamp-2">{item.title}</div>
                  <div className="text-xs text-ink-4">{formatPrice(item.price)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-4 flex justify-between font-semibold text-ink">
            <span>ยอดรวม</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
        <Link href="/cart" className="block text-center text-sm text-ink-4 hover:text-coral transition-colors">
          ← แก้ไขตะกร้า
        </Link>
      </div>
    </div>
  );
}
