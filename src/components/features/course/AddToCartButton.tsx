'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import { useCart, type CartItem } from '@/hooks/useCart';

interface Props {
  item: CartItem;
  className?: string;
}

export default function AddToCartButton({ item, className = '' }: Props) {
  const { addItem, isInCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const inCart = mounted && isInCart(item.courseId);

  function handleClick() {
    if (inCart) { router.push('/cart'); return; }
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 transition-colors ${
        inCart
          ? 'bg-sage text-white hover:bg-sage/80'
          : added
          ? 'bg-sage text-white'
          : 'border border-line text-ink hover:bg-cream'
      } ${className}`}
    >
      <Icon
        name={inCart || added ? 'check' : 'cart'}
        size={15}
        color="currentColor"
        strokeWidth={inCart || added ? 2.5 : 1.5}
      />
      {inCart ? 'ดูในตะกร้า' : added ? 'เพิ่มแล้ว!' : 'เพิ่มในตะกร้า'}
    </button>
  );
}
