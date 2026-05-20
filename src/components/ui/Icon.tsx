import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const PATHS: Record<string, string | string[]> = {
  search:       'M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-5.2-5.2',
  bell:         ['M15 17H9m3 4a2 2 0 01-2-2h4a2 2 0 01-2 2zm0-18v1M5.5 8.5A6.5 6.5 0 0112 2a6.5 6.5 0 016.5 6.5c0 3.5 1.5 4.5 2 5.5H3.5c.5-1 2-2 2-5.5z'],
  cart:         ['M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z', 'M3 6h18', 'M16 10a4 4 0 01-8 0'],
  bookmark:     'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
  star:         'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z',
  clock:        ['M12 22a10 10 0 100-20 10 10 0 000 20z', 'M12 6v6l4 2'],
  book:         ['M4 19.5A2.5 2.5 0 016.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z'],
  play:         'M5 3l14 9-14 9V3z',
  'arrow-right':'M5 12h14m-7-7l7 7-7 7',
  chart:        ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
  code:         ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  palette:      ['M12 2a10 10 0 100 20', 'M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0'],
  globe:        ['M12 22a10 10 0 100-20 10 10 0 000 20z', 'M2 12h20', 'M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'],
  mic:          ['M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z', 'M19 10v2a7 7 0 01-14 0v-2', 'M12 19v4', 'M8 23h8'],
  flame:        'M12 2c0 6-6 8-6 14a6 6 0 0012 0c0-6-6-8-6-14zm0 18a3 3 0 01-3-3c0-3 3-5 3-8 0 3 3 5 3 8a3 3 0 01-3 3z',
  sparkle:      ['M12 2l1.5 4.5H18L14 9l1.5 4.5L12 11l-3.5 2.5L10 9 6 6.5h4.5z', 'M5 20l1-3', 'M19 4l-1 3'],
  briefcase:    ['M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z', 'M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2'],
  message:      ['M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z'],
  share:        ['M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8', 'M16 6l-4-4-4 4', 'M12 2v13'],
  cert:         ['M12 15a7 7 0 100-14 7 7 0 000 14z', 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12'],
  check:        'M20 6L9 17l-5-5',
  'check-circle':['M22 11.08V12a10 10 0 11-5.93-9.14', 'M22 4L12 14.01l-3-3'],
  'x-circle':   ['M15 9l-6 6', 'M9 9l6 6', 'M12 22a10 10 0 100-20 10 10 0 000 20z'],
  lock:         ['M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z', 'M17 11V7a5 5 0 00-10 0v4'],
  download:     ['M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  filter:       'M22 3H2l8 9.46V19l4 2v-8.54z',
  'chevron-down':'M6 9l6 6 6-6',
  'chevron-right':'M9 18l6-6-6-6',
  menu:         ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  users:        ['M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2', 'M9 11a4 4 0 100-8 4 4 0 000 8z', 'M23 21v-2a4 4 0 00-3-3.87', 'M16 3.13a4 4 0 010 7.75'],
  award:        ['M12 15a7 7 0 100-14 7 7 0 000 14z', 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12'],
  'pause':      ['M10 4H6v16h4V4z', 'M18 4h-4v16h4V4z'],
  volume:       ['M11 5L6 9H2v6h4l5 4V5z', 'M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07'],
  maximize:     ['M8 3H5a2 2 0 00-2 2v3', 'M21 8V5a2 2 0 00-2-2h-3', 'M3 16v3a2 2 0 002 2h3', 'M16 21h3a2 2 0 002-2v-3'],
  plus:         'M12 5v14M5 12h14',
  settings:     ['M12 15a3 3 0 100-6 3 3 0 000 6z', 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z'],
};

export default function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.6, className }: IconProps) {
  const d = PATHS[name];
  if (!d) return null;
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}
