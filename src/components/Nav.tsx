'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Playbook' },
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/compare', label: 'Compare' },
  { href: '/checklist', label: 'Checklist' },
  { href: '/traps', label: 'Traps' },
  { href: '/resources', label: 'Resources' },
  { href: '/sync', label: 'Sync' }
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🚙</span>
          <span className="hidden font-bold sm:inline">
            <span className="gradient-text">SUV Playbook</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 overflow-x-auto scrollbar-thin">
          {links.map(l => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-surface-2 text-text'
                    : 'text-text-dim hover:bg-surface hover:text-text'
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
