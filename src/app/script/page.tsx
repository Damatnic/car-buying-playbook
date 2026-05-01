import Link from 'next/link';
import { DealerScript } from '@/components/DealerScript';

export default function ScriptPage() {
  return (
    <div>
      <header className="border-b border-border pb-5 sm:pb-6">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">Dealer Script</span>
        </h1>
        <p className="mt-2 text-sm text-text-dim sm:text-base">
          What to say when you walk in, what their lines actually mean, and the questions YOU should be asking. Pull this up on your phone before stepping on a lot.
        </p>
        <nav className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
          {[
            { href: '#answers', label: '🛡️ When They Ask You' },
            { href: '#opening', label: '🗣️ Opening Lines' },
            { href: '#decoder', label: '🎭 Decoder' },
            { href: '#ask', label: '❓ Your Questions' }
          ].map(l => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full border border-border bg-surface px-3 py-1.5 font-semibold text-text-dim hover:border-accent hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="mt-6 sm:mt-8">
        <DealerScript />
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface p-4 text-center text-sm text-text-dim">
        <p>
          Pair this with the{' '}
          <Link href="/shopping" className="font-semibold text-accent-2 hover:underline">
            Shopping Day Plan
          </Link>{' '}
          for tomorrow&apos;s itinerary, or the{' '}
          <Link href="/traps" className="font-semibold text-accent-2 hover:underline">
            Traps
          </Link>{' '}
          page for things to actively decline.
        </p>
      </div>
    </div>
  );
}
