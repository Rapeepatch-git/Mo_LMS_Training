import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <Logo size={28} />
        <div className="serif text-[72px] font-medium text-ink/10 leading-none mt-6 mb-2">404</div>
        <h1 className="serif text-2xl font-medium text-ink tracking-tight mb-2">ไม่พบหน้านี้</h1>
        <p className="text-ink-3 text-sm mb-8">หน้าที่คุณกำลังมองหาอาจถูกย้ายหรือลบไปแล้ว</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-10 px-5 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors"
        >
          ← กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
