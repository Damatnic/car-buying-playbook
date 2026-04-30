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
    <section id={id} className={cn('mt-8 scroll-mt-20 first:mt-5 sm:mt-12 sm:first:mt-6', className)}>
      <h2 className="mb-3 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
        <span className="h-5 w-1 rounded bg-gradient sm:h-6" />
        {title}
      </h2>
      {intro && <p className="mb-4 max-w-3xl text-sm text-text-dim sm:text-base">{intro}</p>}
      {children}
    </section>
  );
}

export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-accent/25 bg-gradient-to-br from-accent/8 to-accent-2/5 p-4 sm:my-5 sm:p-5">
      <div className="mb-1 flex items-center gap-2 font-bold text-accent-2">{title}</div>
      <div className="text-sm text-text-dim sm:text-base">{children}</div>
    </div>
  );
}
