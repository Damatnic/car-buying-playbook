import { TrapsList } from '@/components/TrapsList';
import { Section, Callout } from '@/components/Section';

export default function TrapsPage() {
  return (
    <div>
      <header className="border-b border-border pb-5 sm:pb-6">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text-warn">⚠️ Subprime Traps</span>
        </h1>
        <p className="mt-2 text-text-dim">
          Dealers make most of their money on F&I (finance & insurance) add-ons. Decline all of them.
        </p>
      </header>

      <Section title="Things to Actively Avoid">
        <TrapsList />
        <Callout title="💡 Money levers — what each variable saves">
          On a $24k loan over 72 months: <br />
          <strong className="text-text">+$1k down</strong> = -$22/mo · <strong className="text-text">-1% APR</strong> = -$13/mo ·{' '}
          <strong className="text-text">-$2k sticker</strong> = -$45/mo · <strong className="text-text">72→84 months</strong> = -$45/mo (but pays much more interest total)
        </Callout>
      </Section>
    </div>
  );
}
