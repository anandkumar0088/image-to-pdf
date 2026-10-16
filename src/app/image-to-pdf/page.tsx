import type { Metadata } from 'next';
import Link from 'next/link';
import { FileImage, ShieldCheck, Zap, Sliders, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Converter from '@/components/Converter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Image to PDF Converter — Free, Fast & Private',
  description:
    'Convert JPG, JPEG, PNG, and WEBP images into high-quality PDF files directly in your web browser. Custom page sizes, drag-and-drop reordering, zero server uploads.',
  alternates: {
    canonical: 'https://imagetopdf.app/image-to-pdf',
  },
  openGraph: {
    title: 'Image to PDF Converter — Free, Fast & Private',
    description: 'Convert JPG, PNG, and WEBP to PDF locally in your browser. No file size limits or watermarks.',
    url: 'https://imagetopdf.app/image-to-pdf',
  },
};

export default function ImageToPdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ImageToPDF Converter',
    url: 'https://imagetopdf.app/image-to-pdf',
    description: 'Client-side tool to convert JPG, PNG, and WEBP images into PDF documents.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All modern web browsers',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className={styles.pageWrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Image to PDF</span>
        </nav>

        {/* Header */}
        <div className={styles.header}>
          <div className="badge badge-accent mb-3">
            <FileImage size={13} /> Dedicated Tool
          </div>
          <h1 className={styles.title}>Convert Images to PDF Document</h1>
          <p className={styles.subtitle}>
            Upload JPG, JPEG, PNG, or WEBP files. Reorder your pages, configure page dimensions,
            and export clean, professional PDFs without server uploads or watermarks.
          </p>
        </div>

        {/* Main Workspace */}
        <div className={`card-glass ${styles.workspaceCard}`}>
          <Converter compact={false} />
        </div>

        {/* Feature Specs */}
        <div className={styles.specsSection}>
          <div className="section-header">
            <span className="section-label">Technical Specs</span>
            <h2 className="section-title">Engineered for Precision &amp; Privacy</h2>
            <p className="section-desc">
              Every step happens securely within your browser sandbox.
            </p>
          </div>

          <div className="grid-3">
            <div className={styles.specCard}>
              <div className={styles.specIcon}><ShieldCheck size={20} /></div>
              <h3 className={styles.specTitle}>100% Client-Side</h3>
              <p className={styles.specText}>
                No image data is sent across the internet. Memory is isolated to your local browser
                session, ensuring your personal IDs and documents remain private.
              </p>
            </div>

            <div className={styles.specCard}>
              <div className={styles.specIcon}><Sliders size={20} /></div>
              <h3 className={styles.specTitle}>Precise Geometry Controls</h3>
              <p className={styles.specText}>
                Switch between standard A4, North American US Letter, or match your original photo
                dimensions. Fine-tune page margins and aspect-ratio scaling.
              </p>
            </div>

            <div className={styles.specCard}>
              <div className={styles.specIcon}><Zap size={20} /></div>
              <h3 className={styles.specTitle}>Instant Processing</h3>
              <p className={styles.specText}>
                Powered by standard PDF binary synthesis libraries. No queue times, no email verification
                gates, and no bandwidth delays.
              </p>
            </div>
          </div>
        </div>

        {/* Format Comparison Table */}
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Supported Input Formats</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.specTable}>
              <thead>
                <tr>
                  <th scope="col">Format</th>
                  <th scope="col">Extension</th>
                  <th scope="col">Best For</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>JPEG</strong></td>
                  <td><code>.jpg, .jpeg</code></td>
                  <td>Camera photos, scanned papers, color documents</td>
                  <td><span className={styles.supportedTag}><CheckCircle2 size={13} /> Fully Supported</span></td>
                </tr>
                <tr>
                  <td><strong>PNG</strong></td>
                  <td><code>.png</code></td>
                  <td>Screenshots, diagrams, transparent logos, typography</td>
                  <td><span className={styles.supportedTag}><CheckCircle2 size={13} /> Fully Supported</span></td>
                </tr>
                <tr>
                  <td><strong>WEBP</strong></td>
                  <td><code>.webp</code></td>
                  <td>Modern web graphics, compressed mobile captures</td>
                  <td><span className={styles.supportedTag}><CheckCircle2 size={13} /> Fully Supported</span></td>
                </tr>
                <tr>
                  <td><strong>GIF / HEIC</strong></td>
                  <td><code>.gif, .heic</code></td>
                  <td>Animated images or Apple proprietary containers</td>
                  <td><span className={styles.unsupportedTag}>Convert to JPG first</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Link */}
        <div className={styles.backRow}>
          <Link href="/" className="btn btn-secondary">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
