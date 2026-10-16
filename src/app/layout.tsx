import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'ImageToPDF — Free Online Image to PDF Converter',
    template: '%s | ImageToPDF',
  },
  description:
    'Convert JPG, PNG and WEBP images to PDF instantly in your browser. No upload to servers, no watermarks, completely free.',
  keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'convert image to pdf', 'free pdf converter'],
  authors: [{ name: 'ImageToPDF' }],
  creator: 'ImageToPDF',
  metadataBase: new URL('https://imagetopdf.app'),
  openGraph: {
    type: 'website',
    siteName: 'ImageToPDF',
    title: 'ImageToPDF — Free Online Image to PDF Converter',
    description:
      'Convert JPG, PNG and WEBP images to PDF instantly in your browser. No upload to servers, no watermarks.',
    url: 'https://imagetopdf.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageToPDF — Free Online Image to PDF Converter',
    description: 'Convert images to PDF instantly, directly in your browser.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
