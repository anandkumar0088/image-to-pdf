import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Cpu, Lock, AlertTriangle, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us — Accurate Client-Side Architecture',
  description:
    'Learn about ImageToPDF, our privacy-first client-side architecture, technology stack, and real engineering limitations.',
  alternates: {
    canonical: 'https://imagetopdf.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className={styles.pageWrap}>
      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>About Us</span>
        </nav>

        <header className={styles.header}>
          <div className="badge badge-accent mb-3">Transparency &amp; Architecture</div>
          <h1 className={styles.title}>About ImageToPDF</h1>
          <p className={styles.subtitle}>
            A dedicated utility designed to turn images into clean, structured PDF files
            without transferring your private documents to third-party web servers.
          </p>
        </header>

        <main className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.heading}>Why We Built This</h2>
            <p className={styles.paragraph}>
              Converting images to PDF is one of the most common digital administrative tasks—needed for
              passport renewals, visa filings, tax filings, legal agreements, receipts, and school assignments.
              Yet, the majority of web tools on the internet operate on a legacy architecture: you upload your
              files to an external server, wait in a queue, and download the compiled file from an opaque cloud storage bucket.
            </p>
            <p className={styles.paragraph}>
              This workflow creates serious privacy liabilities for confidential documents. We built ImageToPDF to prove
              that modern web standards—specifically HTML5 Canvas, WebAssembly, and JavaScript binary streams—allow full
              document composition to occur directly inside the user&apos;s browser.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>How the Architecture Works</h2>
            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}><Lock size={20} /></div>
                <h3 className={styles.pillarTitle}>Zero Network Transmission</h3>
                <p className={styles.pillarText}>
                  Your image pixels never touch an HTTP payload. When you drag and drop a file,
                  it is read into browser memory via <code>URL.createObjectURL</code> or <code>FileReader</code>.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}><Cpu size={20} /></div>
                <h3 className={styles.pillarTitle}>Client-Side Assembly</h3>
                <p className={styles.pillarText}>
                  We utilize standard PDF binary compilation (using <code>pdf-lib</code>) inside the client JavaScript runtime.
                  The PDF byte array is constructed locally and saved via standard browser download triggers.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}><Shield size={20} /></div>
                <h3 className={styles.pillarTitle}>No Accounts &amp; No Tracking</h3>
                <p className={styles.pillarText}>
                  We do not require signups, credit cards, or marketing profiles. We do not sell user data or inject
                  intrusive tracking cookies.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>Real Technical Limitations</h2>
            <p className={styles.paragraph}>
              Being completely truthful about our capabilities and constraints is core to our product philosophy.
              Because processing occurs on your physical machine:
            </p>
            <div className={styles.limitationBox}>
              <div className={styles.limitationHeader}>
                <AlertTriangle size={18} className={styles.warningIcon} />
                <span>Known Constraints to Keep in Mind:</span>
              </div>
              <ul className={styles.limitationList}>
                <li>
                  <strong>Device Memory Caps:</strong> If you load 50 ultra-high-resolution images (e.g., 50+ megapixels each),
                  your browser tab may consume several gigabytes of RAM while rendering canvases. We recommend batches of 10–30 photos on mobile devices.
                </li>
                <li>
                  <strong>No Proprietary Apple HEIC/HEIF:</strong> Browsers do not natively decode iOS HEIC containers via standard Canvas without bulky polyfills. Please select JPEG/PNG or convert HEIC photos beforehand.
                </li>
                <li>
                  <strong>Static Rasterization Only:</strong> This tool converts bitmap photos into PDF image pages. It does not perform Optical Character Recognition (OCR) to convert scanned handwriting into selectable searchable text.
                </li>
              </ul>
            </div>
          </section>

          <section className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Experience Local PDF Generation</h2>
            <p className={styles.ctaText}>No software installations or accounts needed.</p>
            <Link href="/image-to-pdf" className="btn btn-primary">
              Launch Converter <ArrowRight size={14} />
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
