import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'SUV Buying Playbook',
  description: 'Subprime credit strategy for compact SUVs. Payment calculator, feature comparison, and saved options.'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0e1a'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <Nav />
        <main className="safe-px mx-auto w-full max-w-6xl px-4 py-5 sm:px-5 sm:py-8">{children}</main>
        <footer className="safe-pb safe-px mt-12 border-t border-border px-4 py-6 text-center text-xs text-text-faint sm:mt-16 sm:py-8 sm:text-sm">
          <p>SUV buying strategy · Wisconsin focused · Subprime-friendly</p>
          <p className="mt-1">Tax estimate 5.5% · APR estimates based on 580-640 credit range</p>
        </footer>
      </body>
    </html>
  );
}
