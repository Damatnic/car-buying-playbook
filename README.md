# 🚙 SUV Buying Playbook

Subprime credit strategy for compact SUVs — Wisconsin focused. Production-ready Next.js 14 app with payment calculator, feature comparison, persistent saved options, and a 4-week buying checklist.

## What it does

- **Payment Calculator** — Live amortization with Wisconsin sales tax built in. Slide price/down/APR/term, see monthly + total interest. Highlights when you go over your $500/mo cap.
- **Vehicle Lineup** — 8 compact SUVs (CPO + new). Photos (exterior/interior/rear), full specs, safety/tech/comfort feature breakdowns.
- **Feature Comparison** — Side-by-side matrix of saved vehicles. Clear ✓/◯/✗ indicators for each feature. Knows which suite each manufacturer uses (Toyota Safety Sense, Honda Sensing, EyeSight, etc).
- **Saved Builds** — Save calculator configurations to localStorage. Persists across visits.
- **Save Vehicles** — Star vehicles to add them to your comparison set.
- **Persistent Checklist** — 4-week buying strategy with checkboxes that persist. Tracks your progress.
- **Live Search Links** — Pre-built CarGurus / Cars.com / Autotrader / TrueCar / CarMax search URLs scoped to ZIP 53186, 100mi, max $28k, 2022+.
- **Subprime Traps** — Reference list of 10 dealer F&I tricks to decline.
- **Resources** — Configurators, pre-qualification sites, Wisconsin credit unions, dealer groups.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- localStorage for persistence (no backend, no auth, no DB)
- Wikipedia Commons for vehicle imagery

## Getting started

```bash
npm install
npm run dev
```

Opens on [http://localhost:3447](http://localhost:3447).

## Build & deploy

```bash
npm run build
npm run start
```

### Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in Vercel
3. Vercel auto-detects Next.js — no config needed
4. Done. No environment variables required.

```bash
# CLI alternative
npm install -g vercel
vercel
```

## Storage model

All user data lives in `localStorage` under the `cbp:` prefix:

- `cbp:savedBuilds` — Calculator configurations saved per vehicle
- `cbp:savedVehicles` — Vehicle IDs starred for comparison
- `cbp:checklist` — Per-step completion state for the 4-week checklist
- `cbp:profile` — User profile (ZIP, monthly budget, optional credit/APR)

Use `storage.exportAll()` (in `src/lib/storage.ts`) to dump everything as JSON if you want to migrate or back up.

## Project structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout + Nav
│   ├── page.tsx             # Home / playbook overview
│   ├── globals.css          # Theme tokens
│   ├── not-found.tsx
│   ├── vehicles/
│   │   ├── page.tsx         # Vehicle lineup grid
│   │   └── [id]/page.tsx    # Per-vehicle detail (photos, features, calc)
│   ├── compare/page.tsx     # Saved vehicles side-by-side
│   ├── checklist/page.tsx   # Persistent 4-week strategy
│   ├── traps/page.tsx       # Subprime traps reference
│   └── resources/page.tsx   # Configurators, pre-qual, dealers
├── components/
│   ├── Nav.tsx
│   ├── PaymentCalculator.tsx
│   ├── VehicleCard.tsx
│   ├── VehicleGallery.tsx
│   ├── FeatureList.tsx
│   ├── FeatureMatrix.tsx
│   ├── CompareView.tsx
│   ├── SavedBuildsList.tsx
│   ├── SaveButton.tsx
│   ├── StrategyTimeline.tsx
│   ├── RealityTable.tsx
│   ├── TrapsList.tsx
│   ├── LinkGrid.tsx
│   └── Section.tsx
├── lib/
│   ├── data.ts              # Vehicle/configurator/trap/checklist data
│   ├── storage.ts           # localStorage helpers
│   ├── calc.ts              # Payment math + search URL builders
│   └── utils.ts             # cn() + currency formatters
└── types/
    └── index.ts             # Vehicle, SavedBuild, ChecklistState, UserProfile
```

## Constraints baked in

- Budget: $25-30k
- Monthly cap: $500
- Down payment: $3k default
- Credit: subprime (default 17% APR, slider goes 4-24%)
- Tax rate: Wisconsin 5.5%
- ZIP for search links: 53186 (Waukesha)

Edit defaults in `src/lib/calc.ts` and `src/lib/storage.ts`.

## Adding a vehicle

Append to the `VEHICLES` array in `src/lib/data.ts`. Required fields are typed in `src/types/index.ts`.

For images, prefer Wikipedia Commons URLs (already allowed in `next.config.mjs` `remotePatterns`). To add another image source, add its hostname to that list.
