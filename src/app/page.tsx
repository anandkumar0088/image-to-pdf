import type { Metadata } from 'next';
import Link from 'next/link';
import { FileImage, Zap, Shield, Download, ChevronRight, HelpCircle } from 'lucide-react';
import Converter from '@/components/Converter';
import styles from './page.module.css';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'ImageToPDF — Free Online Image to PDF Converter',
  description:
    'Convert JPG, PNG and WEBP images to PDF instantly in your browser. No uploads to servers, no watermarks, completely free.',
  alternates: { canonical: 'https://imagetopdf.app' },
};

const benefits = [
  {
    icon: Shield,
    title: 'Processed Locally',
    desc: 'Your images never leave your device. All conversion happens directly in your browser.',
  },
  {
    icon: Zap,
    title: 'No Watermarks',
    desc: 'Generated PDFs are clean and professional — no branding added to your files.',
  },
  {
    icon: Download,
    title: 'Completely Free',
    desc: 'No account required, no usage limits. Convert as many images as you need.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Add your images',
    desc: 'Drag and drop JPG, PNG or WEBP files onto the workspace, or click to browse.',
  },
  {
    n: '02',
    title: 'Choose your settings',
    desc: 'Select page size, orientation, image fit and quality to match your needs.',
  },
  {
    n: '03',
    title: 'Download your PDF',
    desc: 'Click Convert and your PDF downloads instantly — no waiting, no email.',
  },
];

const faqs = [
  {
    q: 'Are my images uploaded to any server?',
    a: 'No. All processing is done entirely inside your browser using JavaScript. Your images are never sent to any server.',
  },
  {
    q: 'Which image formats are supported?',
    a: 'Currently JPG, JPEG, PNG and WEBP. GIF and other animated formats are not supported.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'Each image can be up to 20 MB. You can add up to 50 images per conversion.',
  },
  {
    q: 'Can I reorder images before converting?',
    a: 'Yes — drag and drop thumbnails to reorder them. The PDF pages will follow the order shown.',
  },
  {
    q: 'What page sizes are available?',
    a: 'A4, US Letter, or you can use the original image dimensions as the page size.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes. The converter works on modern mobile browsers including Chrome and Safari on iOS and Android.',
  },
];

export default function HomePage() {
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`badge badge-accent ${styles.heroBadge}`}>
              <FileImage size={12} /> Free · No Signup · Local Processing
            </div>
            <h1 className={styles.heroTitle}>
              Convert Images to PDF,<br />
              <span className={styles.heroAccent}>Simply.</span>
            </h1>
            <p className={styles.heroDesc}>
              Drag, drop, convert. JPG, PNG and WEBP → PDF in seconds.
              Everything runs in your browser — your files stay private.
            </p>
          </div>

          {/* Converter workspace */}
          <div className={`card-glass ${styles.converterCard}`}>
            <Converter compact />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-sm">
        <div className="container">
          <div className="grid-3">
            {benefits.map(b => (
              <div key={b.title} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <b.icon size={20} />
                </div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How it works</span>
            <h2 className="section-title">Three steps to your PDF</h2>
            <p className="section-desc">
              No accounts, no software to install — just a fast, straightforward tool.
            </p>
          </div>
          <div className="grid-3">
            {steps.map(s => (
              <div key={s.n} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.n}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Articles */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionTopRow}>
            <div>
              <span className="section-label">Articles</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Guides &amp; tips</h2>
            </div>
            <Link href="/articles" className="btn btn-secondary btn-sm">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid-3" style={{ marginTop: 'var(--space-8)' }}>
            {latestArticles.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className={styles.articleCard}>
                <div className={styles.articleMeta}>
                  <span className={styles.articleCat}>{a.category}</span>
                  <span className={styles.articleDate}>{a.date}</span>
                </div>
                <h3 className={styles.articleTitle}>{a.title}</h3>
                <p className={styles.articleExcerpt}>{a.excerpt}</p>
                <span className={styles.articleRead}>Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently asked questions</h2>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map(f => (
              <div key={f.q} className={styles.faqItem}>
                <div className={styles.faqQ}>
                  <HelpCircle size={16} className={styles.faqIcon} />
                  <h3 className={styles.faqQuestion}>{f.q}</h3>
                </div>
                <p className={styles.faqAnswer}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Ready to convert?</h2>
            <p className={styles.ctaDesc}>Start with your first image — no signup required.</p>
            <Link href="/image-to-pdf" className="btn btn-primary btn-lg">
              <FileImage size={20} /> Open Converter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
