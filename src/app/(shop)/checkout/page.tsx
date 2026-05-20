import type { Metadata } from 'next';
import Logo from '@/components/ui/Logo';
import CheckoutClient from '@/components/features/shop/CheckoutClient';

export const metadata: Metadata = { title: 'ชำระเงิน — Pannya' };

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="h-14 border-b border-line flex items-center px-12">
        <Logo size={22} />
        <span className="ml-4 text-sm text-ink-3">ชำระเงิน</span>
      </header>
      <CheckoutClient />
    </div>
  );
}
