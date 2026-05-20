'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { useCart } from '@/hooks/useCart';
import { formatPrice, discountPercent } from '@/lib/utils';

export default function CartClient() {
  const { items, removeItem, total, count } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const savings = items.reduce((sum, i) => sum + (i.oldPrice ? i.oldPrice - i.price : 0), 0);

  if (!mounted) return <div className="px-12 py-10 text-ink-4 text-sm">กำลังโหลด...</div>;

  return (
    <div className="px-12 py-10">
      <h1 className="serif text-3xl font-medium text-ink mb-8">
        ตะกร้าสินค้า
        {count > 0 && <span className="text-ink-3 text-lg ml-3">({count} คอร์ส)</span>}
      </h1>

      {count === 0 ? (
        <div className="text-center py-24">
          <Icon name="cart" size={48} color="#e6e2d8" className="mx-auto mb-5" />
          <h2 className="serif text-xl font-medium text-ink mb-2">ตะกร้าว่างเปล่า</h2>
          <p className="text-ink-3 text-sm mb-6">สำรวจหลักสูตรและเพิ่มลงตะกร้า</p>
          <Link href="/courses" className="inline-flex items-center gap-2 h-10 px-6 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors">
            ดูหลักสูตรทั้งหมด <Icon name="arrow-right" size={15} color="#fff" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 320px' }}>
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.courseId} className="bg-white border border-line rounded-card p-5 flex gap-4">
                <div className={`ph ${item.tint} rounded-[8px] shrink-0`} style={{ width: 120, height: 80, fontSize: 10 }}>
                  {item.thumb}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-ink mb-1 line-clamp-2">{item.title}</div>
                  <div className="text-xs text-ink-4 mb-3">{item.instructor}</div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-ink">{formatPrice(item.price)}</span>
                    {item.oldPrice && (
                      <>
                        <span className="text-sm text-ink-4 line-through">{formatPrice(item.oldPrice)}</span>
                        <span className="text-xs text-coral font-medium">−{discountPercent(item.price, item.oldPrice)}%</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.courseId)}
                  className="text-ink-4 hover:text-coral transition-colors shrink-0 self-start mt-1"
                  aria-label="ลบออก"
                >
                  <Icon name="x-circle" size={18} color="currentColor" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="sticky top-8 self-start">
            <div className="bg-white border border-line rounded-card p-6">
              <h2 className="font-medium text-ink mb-5">สรุปคำสั่งซื้อ</h2>
              <div className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between text-ink-3">
                  <span>ราคาคอร์ส ({count} รายการ)</span>
                  <span>{formatPrice(items.reduce((s, i) => s + (i.oldPrice ?? i.price), 0))}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sage">
                    <span>ส่วนลด</span>
                    <span>−{formatPrice(savings)}</span>
                  </div>
                )}
                <div className="border-t border-line pt-3 flex justify-between font-semibold text-ink">
                  <span>ยอดรวม</span>
                  <span className="text-lg">{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full h-12 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors"
              >
                ชำระเงิน <Icon name="arrow-right" size={16} color="#fff" />
              </Link>
              <Link href="/courses" className="mt-3 block text-center text-sm text-ink-4 hover:text-coral transition-colors">
                เลือกคอร์สเพิ่ม
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
