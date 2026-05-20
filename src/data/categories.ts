import type { Category, CareerPath } from '@/types';

export const CATEGORIES: Category[] = [
  { icon: 'briefcase', label: 'ธุรกิจ',           slug: 'business',   count: 284 },
  { icon: 'chart',     label: 'การลงทุน',          slug: 'investing',  count: 142 },
  { icon: 'code',      label: 'เทคโนโลยี & AI',    slug: 'technology', count: 316 },
  { icon: 'palette',   label: 'ดีไซน์ & ครีเอทีฟ', slug: 'design',     count: 198 },
  { icon: 'globe',     label: 'ภาษา',              slug: 'language',   count: 96  },
  { icon: 'mic',       label: 'การพูด & นำเสนอ',   slug: 'speaking',   count: 74  },
  { icon: 'flame',     label: 'สุขภาพ & ไลฟ์สไตล์', slug: 'health',    count: 128 },
  { icon: 'sparkle',   label: 'พัฒนาตนเอง',         slug: 'self-dev',  count: 172 },
];

export const CAREER_PATHS: CareerPath[] = [
  { id: 'p-001', title: 'นักวิเคราะห์การเงิน', hours: '48 ชม.', courses: '8 คอร์ส', level: 'พื้นฐาน → ขั้นสูง', tint: 'navy',  color: '#1a1f2e' },
  { id: 'p-002', title: 'Data Analyst ตัวจริง', hours: '62 ชม.', courses: '11 คอร์ส', level: 'ตั้งแต่ศูนย์',        tint: 'coral', color: '#d4623f' },
  { id: 'p-003', title: 'Product Designer',     hours: '54 ชม.', courses: '9 คอร์ส',  level: 'มีพื้นฐาน',          tint: 'sage',  color: '#6a8f6a' },
  { id: 'p-004', title: 'ผู้ประกอบการ SME',     hours: '38 ชม.', courses: '7 คอร์ส',  level: 'พื้นฐาน',            tint: 'gold',  color: '#c9a14a' },
];

export const NAV_FILTERS = [
  { id: 'all',        label: 'ทั้งหมด'   },
  { id: 'business',   label: 'ธุรกิจ'    },
  { id: 'investing',  label: 'การลงทุน'  },
  { id: 'technology', label: 'เทคโนโลยี' },
  { id: 'design',     label: 'ดีไซน์'    },
  { id: 'language',   label: 'ภาษา'      },
  { id: 'health',     label: 'สุขภาพ'    },
];
