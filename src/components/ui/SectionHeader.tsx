import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | ReactNode;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({ eyebrow, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-6 mb-6">
      <div>
        {eyebrow && (
          <div className="font-mono text-[11px] text-coral uppercase tracking-[.12em] mb-2">
            {eyebrow}
          </div>
        )}
        <h2 className="serif m-0 text-3xl font-medium text-ink leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-ink-3 max-w-[560px] leading-relaxed">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
