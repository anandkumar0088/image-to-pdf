import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions governing the use of the ImageToPDF web tool.',
  alternates: { canonical: 'https://imagetopdf.app/terms' },
};

export default function TermsPage() {
  return (
    <div className={styles.pageWrap}>
      <div className="container-narrow">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Terms of Service</span>
        </nav>

        <header className={styles.header}>
          <div className="badge badge-accent mb-3">Legal Agreement</div>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Effective date: October 2026. Please review these terms governing your use of our client-side utility.
          </p>
        </header>

        <main className={styles.body}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using ImageToPDF (the &ldquo;Service&rdquo;), you acknowledge and agree to be bound
              by these Terms of Service. If you do not agree with any part of these terms, you may discontinue use of the tool.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. License &amp; Permitted Use</h2>
            <p>
              ImageToPDF grants you a personal, worldwide, royalty-free, non-exclusive license to use the client-side
              software provided on this website for converting digital files you have lawful rights to possess and format.
            </p>
            <p>
              You agree not to use the Service in any manner that attempts to reverse-engineer unauthorized systems,
              distribute malicious scripts, or violate applicable copyright and intellectual property laws.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Document Ownership &amp; Intellectual Property</h2>
            <p>
              You retain 100% full, exclusive ownership of any images, scans, and PDF documents you process using this tool.
              Because processing occurs locally within your web browser, ImageToPDF does not claim, acquire, or exercise
              any rights over your content.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind,
              either express or implied. While we strive to ensure optimal fidelity across standard PDF viewers, we do not warrant
              that the conversion will be uninterrupted, error-free, or meet every bespoke printing constraint.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall ImageToPDF, its developers, or contributors be liable for any indirect, incidental, special,
              or consequential damages resulting from browser crashes, corrupted file outputs, memory exhaustion, or loss of data.
              Always maintain original backup copies of your source images.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Modifications to the Service</h2>
            <p>
              We reserve the right to modify, enhance, or discontinue features of this utility at any time without prior notice.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
