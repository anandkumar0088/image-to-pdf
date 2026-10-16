import React from 'react';
import Link from 'next/link';
import { FileImage, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

const tools = [
  { href: '/image-to-pdf', label: 'Image to PDF' },
];

const comingSoon = ['Merge PDF', 'Compress PDF'];

const articles = [
  { href: '/articles/how-to-convert-jpg-to-pdf', label: 'JPG to PDF Guide' },
  { href: '/articles/pdf-page-sizes-explained', label: 'PDF Page Sizes' },
  { href: '/articles/image-quality-in-pdf', label: 'Image Quality in PDF' },
  { href: '/articles/convert-png-to-pdf', label: 'PNG to PDF Tips' },
];

const legal = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
];

const company = [
  { href: '/about',   label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/articles', label: 'Articles' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}><FileImage size={16} /></div>
              <span className={styles.logoText}>ImageToPDF</span>
            </Link>
            <p className={styles.tagline}>
              Convert images to PDF directly in your browser. Free, private, and no watermarks.
            </p>
            <div className={styles.privacyBadge}>
              <ShieldCheck size={14} /> 100% Client-Side Processing
            </div>
          </div>

          {/* Tools */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Tools</h3>
            <ul className={styles.links}>
              {tools.map(l => (
                <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
              ))}
              {comingSoon.map(l => (
                <li key={l}><span className={styles.linkDisabled}>{l} <span className={styles.soon}>Soon</span></span></li>
              ))}
            </ul>
          </div>

          {/* Articles */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Articles</h3>
            <ul className={styles.links}>
              {articles.map(l => (
                <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Company</h3>
            <ul className={styles.links}>
              {company.map(l => (
                <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Legal</h3>
            <ul className={styles.links}>
              {legal.map(l => (
                <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; 2026 ImageToPDF. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            Processing is done locally in your browser. We do not upload or store your files.
          </p>
        </div>
      </div>
    </footer>
  );
}
