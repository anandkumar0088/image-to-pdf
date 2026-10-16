import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft, CheckCircle2, FileImage, ArrowRight } from 'lucide-react';
import { articles, getArticleBySlug } from '@/lib/articles';
import styles from './page.module.css';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | ImageToPDF Guides`,
    description: article.metaDescription,
    alternates: {
      canonical: `https://imagetopdf.app/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      url: `https://imagetopdf.app/articles/${article.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = articles.filter(a => a.slug !== article.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ImageToPDF',
      url: 'https://imagetopdf.app',
    },
    datePublished: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://imagetopdf.app/articles/${article.slug}`,
    },
  };

  return (
    <div className={styles.pageWrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-narrow">
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/articles" className={styles.breadcrumbLink}>Articles</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{article.title}</span>
        </nav>

        {/* Back Link */}
        <Link href="/articles" className={styles.backLink}>
          <ArrowLeft size={14} /> Back to all articles
        </Link>

        {/* Header */}
        <header className={styles.articleHeader}>
          <div className={styles.metaRow}>
            <span className={styles.categoryBadge}>{article.category}</span>
            <span className={styles.metaItem}><Clock size={12} /> {article.readTime}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}><Calendar size={12} /> {article.date}</span>
          </div>

          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className={styles.articleExcerpt}>{article.excerpt}</p>
        </header>

        {/* Key Takeaways */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <aside className={styles.takeawaysCard}>
            <h2 className={styles.takeawaysTitle}>Key Takeaways</h2>
            <ul className={styles.takeawaysList}>
              {article.keyTakeaways.map((point, index) => (
                <li key={index} className={styles.takeawaysItem}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Body content */}
        <main className={styles.articleBody}>
          {article.content.map((sec, idx) => (
            <section key={idx} className={styles.contentSection}>
              <h2 className={styles.sectionHeading}>{sec.heading}</h2>
              {sec.body.map((para, pIdx) => (
                <p key={pIdx} className={styles.paragraph}>{para}</p>
              ))}
            </section>
          ))}
        </main>

        {/* Converter CTA inside article */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaIcon}><FileImage size={24} /></div>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaHeading}>Ready to convert your photos?</h3>
            <p className={styles.ctaSub}>Fast, client-side, and completely free in your browser.</p>
          </div>
          <Link href="/image-to-pdf" className="btn btn-primary">
            Open Converter <ArrowRight size={14} />
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedHeading}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {related.map(rel => (
                <Link key={rel.slug} href={`/articles/${rel.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedCategory}>{rel.category}</span>
                  <h3 className={styles.relatedTitle}>{rel.title}</h3>
                  <span className={styles.relatedRead}>Read guide →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
