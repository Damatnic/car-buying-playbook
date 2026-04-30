import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  title: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('mt-12 scroll-mt-20 first:mt-6', className)}>
      <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold tracking-tight">
        <span className="h-6 w-1 rounded bg-gradient" />
        {title}
      </h2>
      {intro && <p className="mb-4 max-w-3xl text-text-dim">{intro}</p>}
      {children}
    </section>
  );
}

export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-accent/25 bg-gradient-to-br from-accent/8 to-accent-2/5 p-5">
      <div className="mb-1 flex items-center gap-2 font-bold text-accent-2">{title}</div>
      <div className="text-text-dim">{children}</div>
    </div>
  );
}
