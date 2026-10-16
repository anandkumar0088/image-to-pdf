import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Cookie Policy — Zero Tracking Cookies',
  description:
    'Our transparent cookie policy: ImageToPDF does not use advertising or tracking cookies. Learn about our minimal local storage usage.',
  alternates: { canonical: 'https://imagetopdf.app/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <div className={styles.pageWrap}>
      <div className="container-narrow">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Cookie Policy</span>
        </nav>

        <header className={styles.header}>
          <div className="badge badge-accent mb-3">Minimal &amp; Respectful</div>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.subtitle}>
            Last updated: October 2026. Understanding how ImageToPDF handles cookies and browser storage.
          </p>
        </header>

        <div className={styles.banner}>
          <ShieldCheck size={24} className={styles.bannerIcon} />
          <div>
            <h2 className={styles.bannerHeading}>No Third-Party Advertising Cookies</h2>
            <p className={styles.bannerText}>
              We do not embed third-party tracking scripts, ad networks, behavioral profiling tags,
              or cross-site data aggregators.
            </p>
          </div>
        </div>

        <main className={styles.body}>
          <section className={styles.section}>
            <h2>1. What are Cookies and Local Storage?</h2>
            <p>
              Cookies are small text fragments sent to your browser by websites you visit. Similar technologies include{' '}
              <code>localStorage</code> and <code>sessionStorage</code>, which allow web applications to store basic key-value
              preferences locally on your computer.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. What We Store: Theme Preference Only</h2>
            <p>
              Our application uses <code>localStorage</code> exclusively for one single functional purpose:
            </p>
            <div className={styles.storageTableWrapper}>
              <table className={styles.storageTable}>
                <thead>
                  <tr>
                    <th>Storage Key</th>
                    <th>Type</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>theme</code></td>
                    <td>Local Storage</td>
                    <td>Remembers your preference for Dark Mode or Light Mode</td>
                    <td>Persistent until cleared</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              This storage item contains only the string <code>&quot;dark&quot;</code> or <code>&quot;light&quot;</code>. It contains no personally
              identifiable information (PII), device fingerprints, or usage statistics.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Managing and Clearing Browser Data</h2>
            <p>
              You can inspect or delete this key at any time through your browser developer tools or settings menu:
            </p>
            <ul>
              <li><strong>Chrome / Edge:</strong> Settings &gt; Privacy and security &gt; Third-party cookies &gt; See all site data and permissions.</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data.</li>
              <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data &gt; Clear Data.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Questions</h2>
            <p>
              If you have any questions regarding our storage practices, feel free to reach out via our{' '}
              <Link href="/contact" className={styles.inlineLink}>Contact Page</Link>.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
