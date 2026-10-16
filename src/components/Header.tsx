'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X, ChevronDown, FileImage, Files, Archive } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import styles from './Header.module.css';

const tools = [
  { href: '/image-to-pdf', label: 'Image to PDF', icon: FileImage, desc: 'Convert JPG, PNG & WEBP to PDF' },
];

const coming = [
  { label: 'Merge PDF',    icon: Files, desc: 'Combine multiple PDFs into one' },
  { label: 'Compress PDF', icon: Archive,   desc: 'Reduce PDF file size' },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setToolsOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="ImageToPDF home">
          <div className={styles.logoIcon}>
            <FileImage size={18} />
          </div>
          <span className={styles.logoText}>ImageToPDF</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {/* Tools dropdown */}
          <div className={styles.dropdown} ref={dropRef}>
            <button
              className={`${styles.navLink} ${styles.dropTrigger} ${toolsOpen ? styles.active : ''}`}
              onClick={() => setToolsOpen(v => !v)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Tools <ChevronDown size={14} className={`${styles.chevron} ${toolsOpen ? styles.chevronUp : ''}`} />
            </button>
            {toolsOpen && (
              <div className={styles.dropMenu} role="menu">
                <div className={styles.dropSection}>
                  <span className={styles.dropLabel}>Available</span>
                  {tools.map(t => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className={`${styles.dropItem} ${isActive(t.href) ? styles.dropItemActive : ''}`}
                      role="menuitem"
                    >
                      <span className={styles.dropItemIcon}><t.icon size={16} /></span>
                      <span>
                        <span className={styles.dropItemLabel}>{t.label}</span>
                        <span className={styles.dropItemDesc}>{t.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className={styles.dropDivider} />
                <div className={styles.dropSection}>
                  <span className={styles.dropLabel}>Coming Soon</span>
                  {coming.map(t => (
                    <div key={t.label} className={`${styles.dropItem} ${styles.dropItemDisabled}`}>
                      <span className={styles.dropItemIcon}><t.icon size={16} /></span>
                      <span>
                        <span className={styles.dropItemLabel}>{t.label}</span>
                        <span className={styles.dropItemDesc}>{t.desc}</span>
                      </span>
                      <span className={styles.soon}>Soon</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/articles"
            className={`${styles.navLink} ${isActive('/articles') ? styles.navLinkActive : ''}`}
          >
            Articles
          </Link>
          <Link
            href="/about"
            className={`${styles.navLink} ${isActive('/about') ? styles.navLinkActive : ''}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${styles.navLink} ${isActive('/contact') ? styles.navLinkActive : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            onClick={toggle}
            className={styles.themeBtn}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/image-to-pdf" className="btn btn-primary btn-sm">
            Try Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Mobile navigation">
          <div className={styles.mobileMenuInner}>
            {tools.map(t => (
              <Link key={t.href} href={t.href} className={styles.mobileLink}>
                <t.icon size={16} /> {t.label}
              </Link>
            ))}
            <Link href="/articles" className={styles.mobileLink}>Articles</Link>
            <Link href="/about"    className={styles.mobileLink}>About</Link>
            <Link href="/contact"  className={styles.mobileLink}>Contact</Link>
            <div className={styles.mobileDivider} />
            <button onClick={toggle} className={styles.mobileLink} style={{ width: '100%', textAlign: 'left' }}>
              {theme === 'dark' ? <><Sun size={16} /> Light mode</> : <><Moon size={16} /> Dark mode</>}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
