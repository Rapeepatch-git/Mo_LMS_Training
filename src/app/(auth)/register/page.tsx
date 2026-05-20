'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';

export default function RegisterPage() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate(fd: FormData) {
    const e: Record<string, string> = {};
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const pw = String(fd.get('password') ?? '');
    if (!name) e.name = 'กรุณาระบุชื่อ';
    if (!email || !email.includes('@')) e.email = 'อีเมลไม่ถูกต้อง';
    if (pw.length < 8) e.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // mock network
    setLoading(false);
    setStep('success');
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-5">
            <Icon name="check" size={28} color="#6a8f6a" strokeWidth={2} />
          </div>
          <h1 className="serif text-2xl font-medium text-ink mb-2">สมัครสมาชิกเรียบร้อย</h1>
          <p className="text-ink-3 text-sm mb-6">ยินดีต้อนรับสู่ Pannya — ตรวจสอบอีเมลเพื่อยืนยันบัญชีของคุณ</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 h-10 px-5 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-6">
            <Logo size={28} />
          </div>
          <h1 className="serif text-2xl font-medium text-ink tracking-tight">สมัครสมาชิกฟรี</h1>
          <p className="text-ink-3 text-sm mt-1">เริ่มต้นการเรียนรู้กับผู้เชี่ยวชาญตัวจริง</p>
        </div>

        <div className="bg-white border border-line rounded-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">ชื่อ-นามสกุล</label>
              <input
                name="name"
                type="text"
                placeholder="ภณวัฒน์ อนันตศิริ"
                className="w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper"
              />
              {errors.name && <p className="text-coral text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">อีเมล</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper"
              />
              {errors.email && <p className="text-coral text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">รหัสผ่าน</label>
              <input
                name="password"
                type="password"
                placeholder="อย่างน้อย 8 ตัวอักษร"
                className="w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper"
              />
              {errors.password && <p className="text-coral text-xs mt-1">{errors.password}</p>}
            </div>

            <p className="text-xs text-ink-4 leading-relaxed">
              การสมัครสมาชิก แสดงว่าคุณยอมรับ{' '}
              <span className="text-coral underline cursor-pointer">เงื่อนไขการใช้งาน</span>{' '}
              และ{' '}
              <span className="text-coral underline cursor-pointer">นโยบายความเป็นส่วนตัว</span>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors disabled:opacity-60"
            >
              {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line" />
            </div>
            <div className="relative flex justify-center text-xs text-ink-4 bg-white px-3">หรือ</div>
          </div>

          <button className="w-full h-10 border border-line rounded-control text-sm flex items-center justify-center gap-2 hover:bg-cream transition-colors">
            <Icon name="globe" size={16} color="#5a6275" /> สมัครด้วย Google
          </button>
        </div>

        <p className="text-center text-sm text-ink-3 mt-5">
          มีบัญชีแล้ว?{' '}
          <Link href="/login" className="text-coral font-medium hover:underline">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}
