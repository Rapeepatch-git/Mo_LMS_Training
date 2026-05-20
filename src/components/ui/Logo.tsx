import Link from 'next/link';

interface LogoProps {
  size?: number;
  color?: string;
  href?: string;
}

export default function Logo({ size = 24, color = '#1a1f2e', href = '/' }: LogoProps) {
  const inner = (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="Pannya logo mark">
        <path d="M6 26V10l10-4 10 4v16" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16 6v20" stroke={color} strokeWidth="1.8" />
        <circle cx="16" cy="16" r="3.5" fill={color} />
      </svg>
      <span
        style={{
          fontFamily: "'IBM Plex Serif', Georgia, serif",
          fontSize: size * 0.85,
          fontWeight: 600,
          color,
          letterSpacing: '-0.01em',
        }}
      >
        Pannya<span style={{ color: '#d4623f' }}>.</span>
      </span>
    </div>
  );

  return href ? <Link href={href} className="inline-flex">{inner}</Link> : <div className="inline-flex">{inner}</div>;
}
