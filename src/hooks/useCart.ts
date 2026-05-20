'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  courseId: string;
  slug: string;
  title: string;
  instructor: string;
  price: number;
  oldPrice?: number;
  tint: string;
  thumb?: string;
}

const KEY = 'pannya-cart';

function load(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}

function save(items: CartItem[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => { setItems(load()); }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.courseId === item.courseId)) return prev;
      const next = [...prev, item];
      save(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((courseId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.courseId !== courseId);
      save(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    save([]);
  }, []);

  const isInCart = useCallback((courseId: string) => items.some((i) => i.courseId === courseId), [items]);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return { items, addItem, removeItem, clearCart, isInCart, total, count: items.length };
}
