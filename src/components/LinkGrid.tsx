interface LinkItem {
  name: string;
  url: string;
  detail?: string;
}

export function LinkGrid({ items }: { items: LinkItem[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(item => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-lg border border-border bg-surface px-4 py-3 pr-9 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/10 active:bg-surface-2"
        >
          <div className="font-semibold sm:font-bold">{item.name}</div>
          {item.detail && <div className="mt-0.5 text-xs text-text-faint">{item.detail}</div>}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent-2">→</span>
        </a>
      ))}
    </div>
  );
}
