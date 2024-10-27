import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ShootingStars } from '@/components/ui/shooting-stars.aceternity';
import { StarsBackground } from '@/components/ui/stars-background.aceternity';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CodeGen | AI-Powered Code Generator',
  description:
    'CodeGen is an intuitive, AI-driven tool that helps you generate custom software and applications by answering a few simple questions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} no-scrollbar flex min-h-dvh w-screen items-center justify-center bg-black antialiased`}
      >
        {children}
        <ShootingStars />
        <StarsBackground />
      </body>
    </html>
  );
}
