import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react';
import { articles } from '@/lib/articles';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Articles & Guides — Image to PDF Tips and Best Practices',
  description:
    'Comprehensive articles covering image to PDF conversion, DPI optimization, paper size standards (A4 vs Letter), mobile workflows, and troubleshooting.',
  alternates: {
    canonical: 'https://imagetopdf.app/articles',
  },
  openGraph: {
    title: 'Articles & Guides — ImageToPDF',
    description: 'Expert guides on digital document workflows, image quality, and PDF optimization.',
    url: 'https://imagetopdf.app/articles',
  },
};

export default function ArticlesPage() {
  return (
    <div className={styles.pageWrap}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Articles</span>
        </nav>

        {/* Header */}
        <div className={styles.header}>
          <div className="badge badge-accent mb-3">
            <BookOpen size={13} /> Knowledge Base
          </div>
          <h1 className={styles.title}>Articles &amp; Practical Guides</h1>
          <p className={styles.subtitle}>
            In-depth tutorials, technical comparisons, and actionable guides on working with
            digital images, PDF standards, and client-side document processing.
          </p>
        </div>

        {/* Featured / Articles Grid */}
        <div className={styles.articleGrid}>
          {articles.map((article) => (
            <article key={article.slug} className={styles.card}>
              <div className={styles.metaRow}>
                <span className={styles.categoryBadge}>
                  <Tag size={11} /> {article.category}
                </span>
                <span className={styles.metaItem}>
                  <Clock size={12} /> {article.readTime}
                </span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.dateText}>{article.date}</span>
              </div>

              <h2 className={styles.cardTitle}>
                <Link href={`/articles/${article.slug}`} className={styles.titleLink}>
                  {article.title}
                </Link>
              </h2>

              <p className={styles.cardExcerpt}>{article.excerpt}</p>

              <div className={styles.cardFooter}>
                <Link href={`/articles/${article.slug}`} className={styles.readMore}>
                  Read Full Article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
