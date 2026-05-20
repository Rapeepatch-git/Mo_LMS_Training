import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';

export const metadata: Metadata = { title: 'ใบประกาศนียบัตร' };

const MOCK_CERT = {
  id: 'cert-001',
  courseTitle: 'การลงทุนแบบ Value Investing ฉบับเข้าใจง่าย เริ่มต้นจากศูนย์',
  instructorName: 'ดร.นิเวศน์ เหมวชิรวรากร',
  studentName: 'ภณวัฒน์ อนันตศิริ',
  issuedAt: '15 พฤษภาคม พ.ศ. 2569',
  credentialId: 'PNY-2025-001284',
};

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <div className="px-12 py-12 max-w-[960px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-mono text-[11px] text-coral uppercase tracking-widest mb-2">ใบประกาศนียบัตร</div>
            <h1 className="serif text-2xl font-medium text-ink tracking-tight">ยินดีด้วย คุณจบหลักสูตรแล้ว</h1>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 h-10 px-4 border border-line rounded-control text-sm hover:bg-cream transition-colors">
              <Icon name="share" size={15} /> แชร์
            </button>
            <button className="inline-flex items-center gap-2 h-10 px-4 bg-ink text-paper rounded-control text-sm hover:bg-ink-2 transition-colors">
              <Icon name="download" size={15} color="#fff" /> ดาวน์โหลด PDF
            </button>
          </div>
        </div>

        {/* Certificate document */}
        <div
          className="bg-paper border-2 border-gold/40 rounded-hero p-16 relative overflow-hidden"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,.1), 0 0 0 1px rgba(201,161,74,.15) inset' }}
        >
          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
          <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />

          <div className="text-center relative z-10">
            <Logo color="#1a1f2e" size={32} href="" />

            <div className="font-mono text-[11px] text-gold uppercase tracking-[.25em] mt-8 mb-2">
              Certificate of Completion
            </div>
            <div className="font-mono text-[11px] text-ink-4 uppercase tracking-[.25em] mb-10">
              ใบประกาศนียบัตรสำเร็จการศึกษา
            </div>

            <div className="text-sm text-ink-3 mb-3">มอบให้แก่</div>
            <div className="serif text-5xl font-medium text-ink tracking-tight mb-3">{MOCK_CERT.studentName}</div>
            <div className="w-32 h-px bg-gold/40 mx-auto mb-8" />

            <div className="text-sm text-ink-3 mb-4">ได้สำเร็จการศึกษาหลักสูตร</div>
            <div className="serif text-2xl font-medium text-ink max-w-lg mx-auto leading-snug mb-3 italic">
              {MOCK_CERT.courseTitle}
            </div>
            <div className="text-sm text-ink-3 mb-12">
              สอนโดย <strong className="text-ink">{MOCK_CERT.instructorName}</strong>
            </div>

            <div className="flex items-end justify-between max-w-md mx-auto">
              <div className="text-center">
                <div className="w-32 h-px bg-ink mb-2" />
                <div className="text-xs text-ink-4">ผู้สอน</div>
                <div className="text-sm font-medium text-ink mt-1">{MOCK_CERT.instructorName}</div>
              </div>
              <div className="text-center">
                <Icon name="award" size={40} color="#c9a14a" />
              </div>
              <div className="text-center">
                <div className="w-32 h-px bg-ink mb-2" />
                <div className="text-xs text-ink-4">วันที่ออก</div>
                <div className="text-sm font-medium text-ink mt-1">{MOCK_CERT.issuedAt}</div>
              </div>
            </div>

            <div className="mt-12 font-mono text-[10px] text-ink-4">
              Credential ID: {MOCK_CERT.credentialId}
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-sm text-ink-3 hover:text-coral transition-colors inline-flex items-center gap-2">
            ← กลับไปหน้าแดชบอร์ด
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
