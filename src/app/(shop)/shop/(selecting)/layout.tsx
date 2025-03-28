import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../../globals.css';
import FloatingBasket from '@/components/FloatingBasket';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'One Tree Farm',
  description:
    'One Tree Farm is a community-owned regenerative farm in the South West of England. The mission is to build independence from the mainstream.',
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
      <FloatingBasket />
    </div>
  );
}
