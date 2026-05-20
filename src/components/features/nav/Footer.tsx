import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';

const FOOTER_COLS = [
  { h: 'เรียนรู้',  items: ['หลักสูตรทั้งหมด', 'เส้นทางอาชีพ', 'คอร์สใหม่', 'คอร์สยอดนิยม', 'เรียนฟรี'] },
  { h: 'องค์กร',   items: ['Pannya for Business', 'Pannya CPD', 'ปริญญาออนไลน์', 'ร่วมเป็นผู้สอน', 'Affiliate'] },
  { h: 'ช่วยเหลือ', items: ['ศูนย์ช่วยเหลือ', 'คำถามที่พบบ่อย', 'ติดต่อทีมงาน', 'รายงานปัญหา', 'สถานะระบบ'] },
  { h: 'บริษัท',   items: ['เกี่ยวกับ Pannya', 'บล็อก', 'ร่วมงานกับเรา', 'สื่อมวลชน', 'ข่าวสาร'] },
];

const SOCIAL_ICONS = ['globe', 'message', 'share', 'briefcase'] as const;

export default function Footer() {
  return (
    <footer className="bg-ink text-ink-4 px-12 pt-14 pb-8 text-[13px] leading-relaxed">
      <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr' }}>
        <div>
          <Logo color="#fbf9f3" />
          <p className="mt-4 max-w-[280px] text-[rgba(251,249,243,.6)] text-sm leading-relaxed">
            แพลตฟอร์มเรียนรู้ทักษะใหม่ ๆ จากผู้เชี่ยวชาญตัวจริง — เรียนเมื่อพร้อม จบเมื่อใจถึง
          </p>
          <div className="flex gap-3 mt-6">
            {SOCIAL_ICONS.map((n) => (
              <button
                key={n}
                className="w-9 h-9 border border-white/15 rounded-control flex items-center justify-center hover:border-white/30 transition-colors"
                aria-label={n}
              >
                <Icon name={n} size={15} color="#9aa0b3" />
              </button>
            ))}
          </div>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.h}>
            <div className="text-paper font-medium mb-3.5 text-sm">{col.h}</div>
            {col.items.map((item) => (
              <div key={item} className="mb-1.5 hover:text-paper/70 cursor-pointer transition-colors">{item}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-white/8 text-xs text-paper/40">
        <div>© 2025 Pannya Learning Co., Ltd. — เลขที่ผู้เสียภาษี 0-1055-XXXXX-XX-X</div>
        <div className="flex gap-6">
          {['เงื่อนไขการใช้งาน', 'นโยบายความเป็นส่วนตัว', 'คุกกี้', 'ไทย ↓'].map((t) => (
            <span key={t} className="cursor-pointer hover:text-paper/60 transition-colors">{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
