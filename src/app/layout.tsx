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
        <main className="mx-auto max-w-6xl px-5 py-6 sm:py-8">{children}</main>
        <footer className="mt-16 border-t border-border py-8 text-center text-sm text-text-faint">
          <p>SUV buying strategy · Wisconsin focused · Subprime-friendly</p>
          <p className="mt-1">Tax estimate 5.5% (varies 5.0-5.6% by WI county) · APR estimates based on 580-640 credit range</p>
        </footer>
      </body>
    </html>
  );
}
