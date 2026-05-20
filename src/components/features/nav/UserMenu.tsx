'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';

interface UserMenuProps {
  dark?: boolean;
  fg: string;
  bdr: string;
  role: string;
  name: string;
  initials: string;
}

export default function UserMenu({ dark, fg, bdr, role, name, initials }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isAdmin = role === 'admin';

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  async function handleLogout() {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 pl-1 pr-3 rounded-full transition-opacity hover:opacity-80"
        style={{ border: `1px solid ${bdr}`, background: dark ? 'rgba(255,255,255,.04)' : '#fff' }}
      >
        <div className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-xs font-semibold ${isAdmin ? 'bg-plum' : 'bg-coral'}`}>
          {initials}
        </div>
        <span className="text-sm font-medium" style={{ color: fg }}>{name}</span>
        {isAdmin && (
          <span className="text-[10px] font-mono bg-plum/10 text-plum border border-plum/20 rounded px-1.5 py-0.5 leading-none">
            ADMIN
          </span>
        )}
        <Icon
          name="chevron-down"
          size={13}
          color={fg}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-line rounded-card shadow-lg py-1 z-50">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-line">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold shrink-0 ${isAdmin ? 'bg-plum' : 'bg-coral'}`}>
                {initials}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-ink truncate">{name}</div>
                <div className="text-xs text-ink-4">{isAdmin ? 'ผู้ดูแลระบบ' : 'นักเรียน'}</div>
              </div>
            </div>
          </div>

          {/* Admin panel link */}
          {isAdmin && (
            <>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-plum hover:bg-plum/5 transition-colors font-medium"
              >
                <Icon name="settings" size={15} color="#6b3d52" />
                Admin Panel
              </Link>
              <div className="border-t border-line my-1" />
            </>
          )}

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-cream transition-colors"
          >
            <Icon name="book" size={15} color="#5a6275" />
            แดชบอร์ดการเรียน
          </Link>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-cream transition-colors"
          >
            <Icon name="settings" size={15} color="#5a6275" />
            ตั้งค่าบัญชี
          </Link>
          <div className="border-t border-line my-1" />
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-coral hover:bg-coral/5 transition-colors disabled:opacity-50"
          >
            <Icon name="arrow-right" size={15} color="#d4623f" className="rotate-180" />
            {loading ? 'กำลังออก...' : 'ออกจากระบบ'}
          </button>
        </div>
      )}
    </div>
  );
}
