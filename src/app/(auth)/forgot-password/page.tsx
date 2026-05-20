'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'form' | 'sent'>('form');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep('sent');
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-6">
            <Logo size={28} />
          </div>
          <h1 className="serif text-2xl font-medium text-ink tracking-tight">ลืมรหัสผ่าน?</h1>
          <p className="text-ink-3 text-sm mt-1">ไม่เป็นไร — เราจะส่งลิงก์ reset ให้ทางอีเมล</p>
        </div>

        <div className="bg-white border border-line rounded-card p-6 shadow-sm">
          {step === 'sent' ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-4">
                <Icon name="check" size={22} color="#6a8f6a" strokeWidth={2} />
              </div>
              <p className="text-sm font-medium text-ink mb-1">ส่งลิงก์แล้ว</p>
              <p className="text-xs text-ink-3 mb-5">
                ตรวจสอบกล่องข้อความที่ <strong>{email}</strong>
                <br />ลิงก์จะหมดอายุใน 15 นาที
              </p>
              <button
                onClick={() => setStep('form')}
                className="text-xs text-ink-3 hover:text-coral underline transition-colors"
              >
                ส่งใหม่
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">อีเมล</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors disabled:opacity-60"
              >
                {loading ? 'กำลังส่ง...' : 'ส่งลิงก์ Reset รหัสผ่าน'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-ink-3 mt-5">
          <Link href="/login" className="inline-flex items-center gap-1 hover:text-coral transition-colors">
            ← กลับหน้าเข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
