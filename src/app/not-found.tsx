import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      padding: 'var(--space-20) var(--space-4)',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--color-surface)',
        color: 'var(--color-text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'var(--space-6)',
      }}>
        <FileQuestion size={32} />
      </div>
      <h1 style={{
        fontSize: 'var(--font-size-3xl)',
        fontWeight: 700,
        marginBottom: 'var(--space-3)',
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontSize: 'var(--font-size-base)',
        color: 'var(--color-text-secondary)',
        maxWidth: '460px',
        marginBottom: 'var(--space-8)',
        lineHeight: 1.6,
      }}>
        The page or article you requested could not be located. It may have been moved or the URL might be mistyped.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary">
          <Home size={16} /> Return to Homepage
        </Link>
        <Link href="/image-to-pdf" className="btn btn-secondary">
          Open Converter
        </Link>
      </div>
    </div>
  );
}
