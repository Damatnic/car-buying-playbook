'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Playbook' },
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/carmax', label: '🎯 CarMax 4PM' },
  { href: '/shopping', label: 'Shopping Day' },
  { href: '/script', label: 'Dealer Script' },
  { href: '/compare', label: 'Compare' },
  { href: '/checklist', label: 'Checklist' },
  { href: '/traps', label: 'Traps' },
  { href: '/resources', label: 'Resources' },
  { href: '/sync', label: 'Sync' }
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="safe-px sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <span className="text-xl">🚙</span>
          <span className="hidden text-base font-bold sm:inline">
            <span className="gradient-text">SUV Playbook</span>
          </span>
          <span className="text-sm font-bold sm:hidden">
            <span className="gradient-text">Playbook</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(l => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active ? 'bg-surface-2 text-text' : 'text-text-dim hover:bg-surface hover:text-text'
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-dim transition-colors hover:text-text active:bg-surface-2 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={cn(
              'absolute left-0 right-0 h-0.5 rounded bg-current transition-all',
              open ? 'top-1.5 rotate-45' : 'top-0'
            )} />
            <span className={cn(
              'absolute left-0 right-0 top-1.5 h-0.5 rounded bg-current transition-opacity',
              open && 'opacity-0'
            )} />
            <span className={cn(
              'absolute left-0 right-0 h-0.5 rounded bg-current transition-all',
              open ? 'top-1.5 -rotate-45' : 'top-3'
            )} />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden border-t border-border transition-[max-height,opacity] duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="safe-px flex flex-col gap-1 p-3">
          {links.map(l => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors',
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-dim hover:bg-surface hover:text-text active:bg-surface-2'
                )}
              >
                <span>{l.label}</span>
                {active && <span className="text-xs">●</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
