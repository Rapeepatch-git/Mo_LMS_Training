'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อได้ กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-6">
            <Logo size={28} />
          </div>
          <h1 className="serif text-2xl font-medium text-ink tracking-tight">เข้าสู่ระบบ</h1>
          <p className="text-ink-3 text-sm mt-1">เรียนต่อจากที่ค้างไว้</p>
        </div>

        <div className="bg-white border border-line rounded-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-coral text-sm bg-coral/5 border border-coral/20 rounded-control px-3 py-2">
                <Icon name="x-circle" size={14} color="#d4623f" />
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-ink-3 hover:text-coral transition-colors">
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors disabled:opacity-60"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line" />
            </div>
            <div className="relative flex justify-center text-xs text-ink-4 bg-white px-3">หรือ</div>
          </div>

          <button className="w-full h-10 border border-line rounded-control text-sm flex items-center justify-center gap-2 hover:bg-cream transition-colors">
            <Icon name="globe" size={16} color="#5a6275" /> เข้าสู่ระบบด้วย Google
          </button>
        </div>

        <p className="text-center text-sm text-ink-3 mt-5">
          ยังไม่มีบัญชี?{' '}
          <Link href="/register" className="text-coral font-medium hover:underline">
            สมัครสมาชิกฟรี
          </Link>
        </p>
      </div>
    </div>
  );
}
