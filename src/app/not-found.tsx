import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-6xl font-extrabold gradient-text">404</h1>
      <p className="mb-6 text-text-dim">That vehicle or page doesn&apos;t exist.</p>
      <Link href="/" className="rounded-lg bg-gradient px-5 py-2 text-sm font-semibold text-white">
        Back to playbook
      </Link>
    </div>
  );
}
