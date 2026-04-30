'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  buildSnapshot, applySnapshot, snapshotToUrl, snapshotToCode, snapshotToJson,
  tryDecodeCode, tryDecodeJson, summarize, type SyncSnapshot
} from '@/lib/sync';
import { cn } from '@/lib/utils';

type Tab = 'share' | 'import' | 'cloud';

export function SyncPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('share');
  const [shareUrl, setShareUrl] = useState('');
  const [shareCode, setShareCode] = useState('');
  const [shareJson, setShareJson] = useState('');
  const [importInput, setImportInput] = useState('');
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [importPreview, setImportPreview] = useState<SyncSnapshot | null>(null);
  const [importError, setImportError] = useState('');
  const [flash, setFlash] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null);
  const [snapInfo, setSnapInfo] = useState('');
  const [cloudCode, setCloudCode] = useState('');
  const [cloudStatus, setCloudStatus] = useState('');

  const flashMessage = useCallback((kind: 'ok' | 'err', msg: string) => {
    setFlash({ kind, msg });
    setTimeout(() => setFlash(null), 2200);
  }, []);

  const refreshShare = useCallback(() => {
    setShareUrl(snapshotToUrl());
    setShareCode(snapshotToCode());
    setShareJson(snapshotToJson());
    const snap = buildSnapshot();
    setSnapInfo(summarize(snap));
  }, []);

  useEffect(() => {
    refreshShare();
    const importParam = searchParams.get('import');
    if (importParam) {
      const decoded = tryDecodeCode(importParam);
      if (decoded) {
        setImportInput(importParam);
        setImportPreview(decoded);
        setTab('import');
      } else {
        setImportError('Could not read the import link. It may be corrupted.');
      }
      router.replace('/sync');
    }
    const handler = () => refreshShare();
    window.addEventListener('cbp:storage', handler);
    return () => window.removeEventListener('cbp:storage', handler);
  }, [refreshShare, searchParams, router]);

  const tryParseImport = (raw: string) => {
    setImportInput(raw);
    setImportError('');
    setImportPreview(null);
    if (!raw.trim()) return;
    const trimmed = raw.trim();
    let urlMatch: RegExpMatchArray | null = null;
    if (trimmed.includes('?import=')) urlMatch = trimmed.match(/\?import=([\w-]+)/);
    const codeCandidate = urlMatch ? urlMatch[1] : trimmed;
    const fromCode = tryDecodeCode(codeCandidate);
    if (fromCode) { setImportPreview(fromCode); return; }
    const fromJson = tryDecodeJson(trimmed);
    if (fromJson) { setImportPreview(fromJson); return; }
    setImportError("Couldn't read that. Paste a share link, code, or exported JSON.");
  };

  const doImport = () => {
    if (!importPreview) return;
    const ok = applySnapshot(importPreview, importMode);
    if (ok) {
      flashMessage('ok', `Imported! ${importMode === 'merge' ? 'Merged with' : 'Replaced'} your local data.`);
      setImportInput('');
      setImportPreview(null);
      refreshShare();
    } else {
      flashMessage('err', 'Import failed.');
    }
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flashMessage('ok', `${label} copied to clipboard.`);
    } catch {
      flashMessage('err', 'Copy failed. Select and copy manually.');
    }
  };

  const cloudSave = async () => {
    if (!cloudCode.trim()) return;
    const code = cloudCode.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
    setCloudStatus('Saving...');
    try {
      const res = await fetch(`/api/sync/${encodeURIComponent(code)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildSnapshot())
      });
      if (!res.ok) {
        const txt = await res.text();
        if (res.status === 501) setCloudStatus('Cloud sync not configured yet. See README to enable.');
        else setCloudStatus(`Failed: ${txt || res.statusText}`);
        return;
      }
      setCloudStatus(`Saved under code ${code}. Your wife can use the same code on her device to load it.`);
    } catch (e) {
      setCloudStatus('Network error. Try again.');
    }
  };

  const cloudLoad = async () => {
    if (!cloudCode.trim()) return;
    const code = cloudCode.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
    setCloudStatus('Loading...');
    try {
      const res = await fetch(`/api/sync/${encodeURIComponent(code)}`);
      if (res.status === 404) {
        setCloudStatus(`No data found under code ${code}. Has your spouse saved with this code yet?`);
        return;
      }
      if (res.status === 501) {
        setCloudStatus('Cloud sync not configured yet. See README to enable.');
        return;
      }
      if (!res.ok) {
        setCloudStatus(`Failed: ${res.statusText}`);
        return;
      }
      const snap = (await res.json()) as SyncSnapshot;
      const ok = applySnapshot(snap, 'merge');
      if (ok) {
        setCloudStatus(`Loaded! Merged with your local data. ${summarize(snap)}`);
        refreshShare();
      } else {
        setCloudStatus('Loaded but data was malformed.');
      }
    } catch {
      setCloudStatus('Network error. Try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="text-sm text-text-dim">Your current data:</div>
        <div className="mt-1 font-semibold">{snapInfo || 'Nothing saved yet'}</div>
      </div>

      {flash && (
        <div className={cn(
          'rounded-lg border px-4 py-3 text-sm font-semibold',
          flash.kind === 'ok'
            ? 'border-success/30 bg-success/10 text-success'
            : 'border-danger/30 bg-danger/10 text-danger'
        )}>
          {flash.msg}
        </div>
      )}

      <div className="flex flex-wrap gap-1 border-b border-border">
        {([
          { id: 'share', label: '📤 Share My Data' },
          { id: 'import', label: '📥 Import / Receive' },
          { id: 'cloud', label: '☁️ Auto-Sync (Cloud)' }
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'border-b-2 px-3 py-2 text-sm font-semibold transition-colors',
              tab === t.id ? 'border-accent text-text' : 'border-transparent text-text-dim hover:text-text'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'share' && (
        <div className="space-y-5">
          <p className="text-text-dim">
            Pick one. Send it to your wife. She opens the link or pastes the code on her device, and her app imports your saves.
          </p>

          <Field label="🔗 Share Link" hint="Send this URL by text or email. Opening it auto-imports.">
            <textarea readOnly value={shareUrl} className="textarea" rows={3} onClick={e => e.currentTarget.select()} />
            <div className="mt-2 flex gap-2">
              <button onClick={() => copy(shareUrl, 'Link')} className="btn-primary">Copy Link</button>
            </div>
          </Field>

          <Field label="🔢 Short Code" hint="If the link is too long for a text message, paste this code in the Import tab on her device.">
            <textarea readOnly value={shareCode} className="textarea" rows={4} onClick={e => e.currentTarget.select()} />
            <div className="mt-2 flex gap-2">
              <button onClick={() => copy(shareCode, 'Code')} className="btn-primary">Copy Code</button>
            </div>
          </Field>

          <Field label="📄 Raw JSON" hint="For backups. Save it somewhere — you can restore later.">
            <textarea readOnly value={shareJson} className="textarea font-mono text-[11px]" rows={6} onClick={e => e.currentTarget.select()} />
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={() => copy(shareJson, 'JSON')} className="btn-primary">Copy JSON</button>
              <button
                onClick={() => {
                  const blob = new Blob([shareJson], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `car-playbook-backup-${new Date().toISOString().slice(0,10)}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="btn-secondary"
              >
                Download File
              </button>
            </div>
          </Field>
        </div>
      )}

      {tab === 'import' && (
        <div className="space-y-5">
          <p className="text-text-dim">
            Paste a share link, short code, or exported JSON below. You&apos;ll see a preview before anything is imported.
          </p>

          <Field label="Paste here" hint="Link, code, or JSON — all work.">
            <textarea
              value={importInput}
              onChange={e => tryParseImport(e.target.value)}
              placeholder="https://...?import=...  OR  paste a code  OR  paste JSON"
              className="textarea"
              rows={5}
            />
            {importError && <div className="mt-2 text-sm text-danger">{importError}</div>}
          </Field>

          {importPreview && (
            <Field label="Preview" hint="This is what will be imported.">
              <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-sm">
                <div className="font-semibold text-success">✓ Valid data found</div>
                <div className="mt-1 text-text-dim">{summarize(importPreview)}</div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="mode" checked={importMode === 'merge'} onChange={() => setImportMode('merge')} />
                  <span><strong>Merge</strong> — keep both your data and theirs (recommended)</span>
                </label>
              </div>
              <div className="mt-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="mode" checked={importMode === 'replace'} onChange={() => setImportMode('replace')} />
                  <span><strong>Replace</strong> — wipe local, take only the imported data</span>
                </label>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={doImport} className="btn-primary">Import Now</button>
                <button onClick={() => { setImportInput(''); setImportPreview(null); }} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </Field>
          )}
        </div>
      )}

      {tab === 'cloud' && (
        <div className="space-y-5">
          <div className="rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm">
            <div className="font-bold text-warning">⚠️ Requires one-time setup</div>
            <p className="mt-1 text-text-dim">
              Cloud auto-sync needs a free Vercel KV database. After deploying, run <code className="rounded bg-bg/50 px-1">vercel kv create</code> in the project,
              then redeploy. Until then, this tab will return a 501 error and you can still use the link/code share above.
            </p>
            <p className="mt-2 text-text-dim">
              Setup guide is in the project <strong>README.md</strong> under &quot;Cloud sync.&quot;
            </p>
          </div>

          <p className="text-text-dim">
            Pick a household code you&apos;ll both remember (e.g. <code className="rounded bg-surface-2 px-1">DAMATO-CAR</code>). Save with this code on your device, your wife enters the same code on hers and clicks Load.
          </p>

          <Field label="Household Code" hint="Letters, numbers, and dashes only. Will be uppercased.">
            <input
              type="text"
              value={cloudCode}
              onChange={e => setCloudCode(e.target.value)}
              placeholder="DAMATO-CAR"
              className="input"
            />
          </Field>

          <div className="flex flex-wrap gap-2">
            <button onClick={cloudSave} disabled={!cloudCode.trim()} className="btn-primary">
              Save my data to cloud
            </button>
            <button onClick={cloudLoad} disabled={!cloudCode.trim()} className="btn-secondary">
              Load from cloud
            </button>
          </div>

          {cloudStatus && (
            <div className="rounded-lg border border-border bg-surface p-3 text-sm text-text-dim">
              {cloudStatus}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .textarea, .input {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          color: var(--text);
          font-family: inherit;
          font-size: 13px;
          resize: vertical;
        }
        .input { font-family: inherit; }
        .textarea:focus, .input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .btn-primary:hover { transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-secondary {
          background: var(--surface);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }
        .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
        .btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 font-semibold">{label}</div>
      {hint && <div className="mb-2 text-xs text-text-faint">{hint}</div>}
      {children}
    </div>
  );
}
