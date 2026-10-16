import type { Metadata } from 'next';
import Link from 'next/link';
import { EyeOff, ServerOff } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — No Server Uploads',
  description:
    'Our privacy policy reflects our client-side architecture. We never upload, store, or inspect your images or generated PDF documents.',
  alternates: {
    canonical: 'https://imagetopdf.app/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.pageWrap}>
      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Privacy Policy</span>
        </nav>

        <header className={styles.header}>
          <div className="badge badge-accent mb-3">Privacy First</div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Last updated: October 2026. This policy explains how ImageToPDF handles data
            and why your documents remain strictly on your device.
          </p>
        </header>

        <div className={styles.summaryBox}>
          <div className={styles.summaryItem}>
            <ServerOff size={20} className={styles.summaryIcon} />
            <div>
              <strong>No Server Uploads</strong>
              <p>Your photos and files are never transferred to our servers or stored anywhere in the cloud.</p>
            </div>
          </div>
          <div className={styles.summaryItem}>
            <EyeOff size={20} className={styles.summaryIcon} />
            <div>
              <strong>No Document Inspection</strong>
              <p>Because processing is local, no human or AI algorithm can view or analyze your files.</p>
            </div>
          </div>
        </div>

        <main className={styles.body}>
          <section className={styles.section}>
            <h2>1. Document Processing Architecture</h2>
            <p>
              ImageToPDF was engineered around client-side execution. When you select or drag and drop images into the tool,
              the binary data is held temporarily in your browser&apos;s volatile memory (RAM).
            </p>
            <p>
              The compilation of images into PDF pages is executed by a JavaScript PDF library running within your browser tab.
              At no point during the conversion pipeline are your images uploaded to any remote server, third-party cloud bucket,
              or backend processing queue.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Information We Do Not Collect</h2>
            <p>Because of our privacy-first design:</p>
            <ul>
              <li>We do not collect or store the filenames, EXIF metadata, or visual contents of your photos.</li>
              <li>We do not require user account registration, passwords, or personal credentials.</li>
              <li>We do not record your IP address alongside any file conversions.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Local Storage</h2>
            <p>
              We utilize your browser&apos;s standard <code>localStorage</code> API solely to remember your preferred interface
              theme (Light or Dark mode). No identifiable tracking identifiers or document histories are stored in <code>localStorage</code>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Third-Party Hosting &amp; Network Requests</h2>
            <p>
              Our website code is served over secure HTTPS via content delivery networks (CDNs). When you load our website,
              your browser makes standard web requests to fetch the HTML, CSS, JavaScript, and font assets (such as Google Fonts Inter).
              These requests are governed by standard internet routing and do not include any image or document contents.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Contact Us Regarding Privacy</h2>
            <p>
              If you have any questions or concerns regarding our privacy architecture, please submit an inquiry via our{' '}
              <Link href="/contact" className={styles.inlineLink}>Contact Page</Link>.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
