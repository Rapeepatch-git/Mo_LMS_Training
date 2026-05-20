import type { Metadata } from 'next';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import CartClient from '@/components/features/shop/CartClient';

export const metadata: Metadata = { title: 'ตะกร้าสินค้า — Pannya' };

export default function CartPage() {
  return (
    <div className="min-h-screen bg-paper">
      <TopNav />
      <CartClient />
      <Footer />
    </div>
  );
}
