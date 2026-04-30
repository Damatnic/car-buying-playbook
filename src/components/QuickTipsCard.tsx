import { QUICK_TIPS } from '@/lib/data';
import { cn } from '@/lib/utils';

const COLOR_CLASSES = {
  success: {
    border: 'border-success/40',
    bg: 'bg-success/8',
    accent: 'bg-success',
    text: 'text-success',
    iconBg: 'bg-success/15'
  },
  danger: {
    border: 'border-danger/40',
    bg: 'bg-danger/8',
    accent: 'bg-danger',
    text: 'text-danger',
    iconBg: 'bg-danger/15'
  },
  warning: {
    border: 'border-warning/40',
    bg: 'bg-warning/8',
    accent: 'bg-warning',
    text: 'text-warning',
    iconBg: 'bg-warning/15'
  },
  accent: {
    border: 'border-accent/40',
    bg: 'bg-accent/8',
    accent: 'bg-accent',
    text: 'text-accent',
    iconBg: 'bg-accent/15'
  }
} as const;

const SECTION_ICONS = {
  say: '✅',
  dontSay: '🚫',
  askFor: '📋',
  walkIf: '🚪',
  tricks: '🎭'
} as const;

const ORDER: Array<keyof typeof QUICK_TIPS> = ['say', 'dontSay', 'askFor', 'walkIf', 'tricks'];

export function QuickTipsCard() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-2/5 p-4 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-accent-2">📱 Quick Reference</div>
        <h2 className="mt-1 text-lg font-extrabold sm:text-xl">Pull this up at the dealership</h2>
        <p className="mt-1 text-xs text-text-dim sm:text-sm">
          Screenshot it · Bookmark this page · Glance before signing anything
        </p>
      </div>

      {ORDER.map(key => {
        const section = QUICK_TIPS[key];
        const colors = COLOR_CLASSES[section.color as keyof typeof COLOR_CLASSES];
        const icon = SECTION_ICONS[key];
        return (
          <section
            key={key}
            className={cn('overflow-hidden rounded-xl border bg-surface', colors.border)}
          >
            <header className={cn('flex items-center gap-2 border-b border-border px-4 py-3', colors.bg)}>
              <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg text-base', colors.iconBg)}>
                {icon}
              </div>
              <h3 className={cn('text-sm font-extrabold uppercase tracking-wider sm:text-base', colors.text)}>
                {section.label}
              </h3>
            </header>
            <ul className="divide-y divide-border/40">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-2.5 px-4 py-2.5 text-sm">
                  <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', colors.accent)} />
                  <span className="text-text">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <div className="rounded-xl border border-border bg-surface-2 p-4 text-center text-xs text-text-dim">
        <p className="font-semibold text-text">Single most important rule:</p>
        <p className="mt-1">Never sign anything you don&apos;t fully understand. The deal will still be there tomorrow.</p>
      </div>
    </div>
  );
}
