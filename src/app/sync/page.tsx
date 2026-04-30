import { Suspense } from 'react';
import { SyncPanel } from '@/components/SyncPanel';
import { Section } from '@/components/Section';

export default function SyncPage() {
  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          <span className="gradient-text">Sync &amp; Share</span>
        </h1>
        <p className="mt-2 text-text-dim">
          Send your saves to another device or your spouse. Three options: instant share via link/code (no setup),
          or cloud auto-sync (one-time setup).
        </p>
      </header>
      <Section title="Sync Options">
        <Suspense fallback={<div className="text-text-dim">Loading...</div>}>
          <SyncPanel />
        </Suspense>
      </Section>
    </div>
  );
}
