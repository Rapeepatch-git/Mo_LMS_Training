import Link from 'next/link';
import { cookies } from 'next/headers';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import UserMenu from '@/components/features/nav/UserMenu';

interface TopNavProps {
  active?: string;
  dark?: boolean;
}

const NAV_ITEMS = [
  { id: 'browse',   label: 'หลักสูตรทั้งหมด', href: '/courses'  },
  { id: 'paths',    label: 'เส้นทางอาชีพ',     href: '/paths'    },
  { id: 'business', label: 'องค์กร',           href: '/business' },
  { id: 'mba',      label: 'ปริญญาออนไลน์',   href: '/mba'      },
];

export default async function TopNav({ active = 'home', dark = false }: TopNavProps) {
  const store = await cookies();
  const isLoggedIn = !!store.get('pannya-auth-token')?.value;
  const userRole     = store.get('pannya-user-role')?.value ?? 'user';
  const userName     = store.get('pannya-user-name')?.value ?? '';
  const userInitials = store.get('pannya-user-initials')?.value ?? '?';
  const bg  = dark ? '#1a1f2e' : '#fbf9f3';
  const fg  = dark ? '#fbf9f3' : '#1a1f2e';
  const bdr = dark ? 'rgba(255,255,255,.1)' : '#e6e2d8';

  return (
    <header
      style={{ background: bg, borderBottom: `1px solid ${bdr}`, color: fg }}
      className="flex items-center gap-8 px-12 py-[18px] relative"
    >
      <Logo color={fg} />

      <nav className="flex items-center gap-7 text-sm">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="relative py-1 transition-opacity"
            style={{
              color: fg,
              opacity: active === item.id ? 1 : 0.7,
              fontWeight: active === item.id ? 500 : 400,
            }}
          >
            {item.label}
            {active === item.id && (
              <span className="absolute left-0 right-0 -bottom-[22px] h-0.5 bg-coral" />
            )}
          </Link>
        ))}
      </nav>

      {/* Search */}
      <div className="flex-1 max-w-sm ml-auto relative">
        <div
          className="flex items-center gap-2.5 h-10 px-3.5 rounded-control text-sm"
          style={{
            background: dark ? 'rgba(255,255,255,.06)' : '#fff',
            border: `1px solid ${bdr}`,
            color: dark ? 'rgba(255,255,255,.6)' : '#8a92a6',
          }}
        >
          <Icon name="search" size={16} color="currentColor" />
          <span className="flex-1 truncate">ค้นหาคอร์ส, ทักษะ, อาจารย์...</span>
          <span
            className="font-mono text-[11px] opacity-70 border rounded px-1.5 py-0.5"
            style={{ borderColor: dark ? 'rgba(255,255,255,.15)' : '#e6e2d8' }}
          >
            ⌘K
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" aria-label="Notifications" style={{ color: fg }} className="opacity-70 hover:opacity-100 transition-opacity">
              <Icon name="bell" size={18} color={fg} />
            </Link>
            <Link href="/cart" aria-label="Cart" style={{ color: fg }} className="opacity-70 hover:opacity-100 transition-opacity">
              <Icon name="cart" size={18} color={fg} />
            </Link>
            <UserMenu dark={dark} fg={fg} bdr={bdr} role={userRole} name={userName} initials={userInitials} />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="h-9 px-4 rounded-control text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: fg, border: `1px solid ${bdr}`, background: 'transparent' }}
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/register"
              className="h-9 px-4 rounded-control text-sm font-medium bg-coral text-white hover:bg-coral-dark transition-colors"
            >
              สมัครฟรี
            </Link>
          </>
        )}

      </div>
    </header>
  );
}
