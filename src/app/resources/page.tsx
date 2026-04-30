import { LinkGrid } from '@/components/LinkGrid';
import { Section } from '@/components/Section';
import { PREQUAL_SITES, WI_CREDIT_UNIONS, SHOP_SITES, WI_DEALERS, VEHICLES } from '@/lib/data';

export default function ResourcesPage() {
  const configurators = VEHICLES.map(v => ({
    name: `${v.name}`,
    url: v.manufacturerUrl,
    detail: `Build & Price on ${v.searchUrlSlug.make.charAt(0).toUpperCase() + v.searchUrlSlug.make.slice(1)}.com`
  }));

  return (
    <div>
      <header className="border-b border-border pb-5 sm:pb-6">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">Resources</span>
        </h1>
        <p className="mt-2 text-text-dim">
          Configurators, pre-qualification sites, dealer groups, and shopping engines. All open in new tabs.
        </p>
      </header>

      <Section title="🛠️ Build & Configure" intro="Use these to figure out your spec, then go shopping for that exact build on dealer lots.">
        <LinkGrid items={configurators} />
      </Section>

      <Section title="🔍 Pre-Qualify (Soft Pulls)" intro="These don't hurt your credit. Do all three before walking into any dealer.">
        <LinkGrid items={PREQUAL_SITES} />
      </Section>

      <Section title="🏦 Wisconsin Credit Unions" intro="Often beat dealer rate by 2-4%. Pre-approve here FIRST, then use Capital One/CarMax as backup.">
        <LinkGrid items={WI_CREDIT_UNIONS} />
      </Section>

      <Section title="🛒 Shopping Engines" intro="CarGurus has the best deal-rating algorithm. Use it to flag overpriced cars instantly.">
        <LinkGrid items={SHOP_SITES} />
      </Section>

      <Section title="🏢 Wisconsin Dealer Groups">
        <LinkGrid items={WI_DEALERS} />
      </Section>
    </div>
  );
}
