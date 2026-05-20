import Link from 'next/link';
import type { Metadata } from 'next';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';

export const metadata: Metadata = { title: 'ชำระเงินสำเร็จ — Pannya' };

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex justify-center mb-8">
          <Logo size={26} />
        </div>

        <div className="w-20 h-20 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-6">
          <Icon name="check" size={36} color="#6a8f6a" strokeWidth={2} />
        </div>

        <h1 className="serif text-3xl font-medium text-ink mb-3">ชำระเงินสำเร็จ!</h1>
        <p className="text-ink-3 text-sm mb-2">
          ขอบคุณที่เลือกเรียนกับ Pannya
        </p>
        <p className="text-ink-3 text-sm mb-8">
          คอร์สของคุณพร้อมเรียนได้เลย — เข้าดูได้ที่แดชบอร์ด
        </p>

        <div className="bg-white border border-line rounded-card p-6 mb-6 text-left">
          <div className="flex items-center gap-2 text-sm text-ink-3 mb-3">
            <Icon name="award" size={15} color="#c9a14a" />
            <span>สิ่งที่คุณได้รับ</span>
          </div>
          <ul className="space-y-2 text-sm text-ink">
            {['เข้าถึงคอร์สได้ตลอดชีพ', 'ใบประกาศนียบัตรเมื่อจบหลักสูตร', 'อัปเดตเนื้อหาฟรีตลอด'].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Icon name="check" size={13} color="#6a8f6a" strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 h-12 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors"
          >
            ไปที่แดชบอร์ด <Icon name="arrow-right" size={16} color="#fff" />
          </Link>
          <Link href="/courses" className="text-sm text-ink-4 hover:text-coral transition-colors">
            ดูหลักสูตรอื่น ๆ
          </Link>
        </div>
      </div>
    </div>
  );
}
