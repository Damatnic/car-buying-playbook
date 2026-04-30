'use client';
import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface SaveButtonProps {
  vehicleId: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function SaveButton({ vehicleId, size = 'md', className }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  const refresh = useCallback(() => {
    setSaved(storage.isVehicleSaved(vehicleId));
  }, [vehicleId]);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('cbp:storage', handler);
    return () => window.removeEventListener('cbp:storage', handler);
  }, [refresh]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    storage.toggleVehicle(vehicleId);
    refresh();
  };

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
      className={cn(
        'flex items-center gap-1.5 rounded-lg border font-semibold transition-all',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        saved
          ? 'border-accent bg-accent/15 text-accent'
          : 'border-border bg-surface text-text-dim hover:border-accent hover:text-accent',
        className
      )}
    >
      <span>{saved ? '★' : '☆'}</span>
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  );
}
