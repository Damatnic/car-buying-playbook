import Link from 'next/link';
import Image from 'next/image';
import type { Vehicle } from '@/types';
import { fmtCurrencyRange } from '@/lib/utils';
import { SaveButton } from './SaveButton';

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
    >
      {vehicle.topPick && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
          Top pick
        </div>
      )}
      <div className="absolute right-3 top-3 z-10">
        <SaveButton vehicleId={vehicle.id} size="sm" />
      </div>

      {vehicle.images.exterior ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
          <Image
            src={vehicle.images.exterior}
            alt={`${vehicle.name} exterior`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-surface-2 text-4xl">🚙</div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <div className="text-lg font-bold leading-tight">{vehicle.name}</div>
            <div className="text-xs text-text-faint">{vehicle.trim}</div>
          </div>
          <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-text-dim">
            {vehicle.segment}
          </span>
        </div>

        <div className="mb-3 text-xl font-extrabold tabular-nums text-accent-2">
          {fmtCurrencyRange(vehicle.priceLow, vehicle.priceHigh)}
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2 text-[11px]">
          <Stat label="Cargo max" value={`${vehicle.cargoMax}`} unit="cu ft" />
          <Stat label="Behind seats" value={`${vehicle.cargoBehind}`} unit="cu ft" />
          <Stat label="AWD" value={vehicle.awd === 'standard' ? 'Std' : vehicle.awd === 'available' ? 'Opt' : 'No'} />
        </div>

        <div className="mb-3">
          <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wide text-text-faint">
            <span>Cargo</span>
            <span>{((vehicle.cargoMax / 80) * 100).toFixed(0)}% of best in class</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient transition-all"
              style={{ width: `${Math.min(100, (vehicle.cargoMax / 80) * 100)}%` }}
            />
          </div>
        </div>

        <p className="mt-auto text-xs leading-snug text-text-dim">{vehicle.note}</p>
      </div>
    </Link>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-md bg-surface-2 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-wide text-text-faint">{label}</div>
      <div className="font-semibold text-text">
        {value}
        {unit && <span className="ml-0.5 text-[9px] font-normal text-text-faint">{unit}</span>}
      </div>
    </div>
  );
}
