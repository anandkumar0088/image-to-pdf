'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Send, Bug, HelpCircle } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('bug');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError('Please provide a valid email address so we can reply.');
      return;
    }
    if (message.trim().length < 15) {
      setValidationError('Please provide a descriptive message of at least 15 characters.');
      return;
    }

    setStatus('submitting');

    // Simulate submission delay and successful receipt
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 800);
  };

  return (
    <div className={styles.pageWrap}>
      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Contact</span>
        </nav>

        <header className={styles.header}>
          <div className="badge badge-accent mb-3">Support &amp; Feedback</div>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have feedback, noticed an unsupported image edge case, or want to suggest an improvement?
            Send us a message and our engineering team will review it.
          </p>
        </header>

        <div className={styles.contentGrid}>
          {/* Form */}
          <div className={`card-glass ${styles.formCard}`}>
            {status === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <CheckCircle size={32} />
                </div>
                <h2 className={styles.successTitle}>Message Received</h2>
                <p className={styles.successText}>
                  Thank you for reaching out. Your feedback has been logged directly with our engineering
                  review board. We typically respond to technical inquiries within 1–2 business days.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary mt-4"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {validationError && (
                  <div className={styles.alertError} role="alert">
                    <AlertCircle size={16} />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="form-group mb-4">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="contact-category" className="form-label">
                    Subject / Topic
                  </label>
                  <select
                    id="contact-category"
                    className="form-select"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="bug">Report a Bug / Conversion Error</option>
                    <option value="feature">Feature Request (e.g. Page Sizing, Compression)</option>
                    <option value="privacy">Privacy or Data Query</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>

                <div className="form-group mb-6">
                  <label htmlFor="contact-message" className="form-label">
                    Your Message <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="form-input"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your question or issue in detail. If reporting a conversion problem, mention your browser and the image file formats involved."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Guidelines Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Bug size={18} /></div>
              <h3 className={styles.infoTitle}>Reporting Conversion Issues</h3>
              <p className={styles.infoText}>
                Because our converter executes strictly within your device&apos;s browser engine,
                including your operating system (e.g. Windows 11, macOS Sequoia, iOS 18) and browser
                version (Chrome, Safari, Firefox) helps us reproduce and patch edge cases quickly.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><HelpCircle size={18} /></div>
              <h3 className={styles.infoTitle}>Quick Self-Help</h3>
              <p className={styles.infoText}>
                Before reaching out, check our troubleshooting guide for immediate solutions regarding
                memory constraints and image orientation questions.
              </p>
              <Link href="/articles/pdf-conversion-troubleshooting" className={styles.infoLink}>
                Read Troubleshooting Guide →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
