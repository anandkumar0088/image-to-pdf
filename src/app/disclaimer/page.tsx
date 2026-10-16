import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Disclaimer — Capabilities & Browser Limits',
  description:
    'Important technical and operational disclaimers regarding client-side image to PDF conversion, memory limits, and file integrity.',
  alternates: { canonical: 'https://imagetopdf.app/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <div className={styles.pageWrap}>
      <div className="container-narrow">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Disclaimer</span>
        </nav>

        <header className={styles.header}>
          <div className="badge badge-accent mb-3">Notice &amp; Disclosures</div>
          <h1 className={styles.title}>Disclaimer</h1>
          <p className={styles.subtitle}>
            Please read this disclosure regarding the technical scope, hardware limits, and usage expectations of ImageToPDF.
          </p>
        </header>

        <main className={styles.body}>
          <section className={styles.section}>
            <h2>1. Technical Accuracy &amp; Fidelity</h2>
            <p>
              ImageToPDF provides an automated client-side canvas rasterization engine. While our software endeavors
              to preserve the exact visual geometry, colors, and aspect ratios of your input files, minor variations may
              arise due to browser canvas color space management (e.g., sRGB vs Display P3) and device-specific rendering hardware.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Hardware &amp; Memory Limitations</h2>
            <p>
              Because conversion runs within your browser&apos;s allocated memory sandbox, processing large batches of ultra-high-resolution
              images (such as 48 MP or 100 MP camera captures) may strain your system resources or trigger browser tab crashes.
              ImageToPDF cannot be held liable for temporary system slowdowns or unsaved tab sessions resulting from hardware resource limits.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Official &amp; Legal Document Submissions</h2>
            <p>
              Certain government portals, courts, and academic institutions mandate strict PDF specification criteria (such as PDF/A archiving
              standards, embedded font sets, or specific DPI metadata). While ImageToPDF produces standard PDF 1.7 compliant files,
              it remains your responsibility to verify that the generated document complies with your destination portal&apos;s requirements.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Backup Your Original Files</h2>
            <p>
              You should never delete your original source photos or scans until you have opened and inspected the generated PDF
              in a standard desktop or mobile reader to ensure that all pages, margins, and text lines are completely legible.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
