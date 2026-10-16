'use client';
import React, { useState, useCallback, useRef, useId } from 'react';
import {
  Upload, X, GripVertical, ChevronDown, ChevronUp,
  Download, FileImage, AlertCircle, CheckCircle, Loader2
} from 'lucide-react';
import styles from './Converter.module.css';

// ─── Types ──────────────────────────────────────────────────────────────
interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  error?: string;
}

type PageSize = 'a4' | 'letter' | 'original';
type Orientation = 'portrait' | 'landscape' | 'auto';
type FitMode = 'fit' | 'fill' | 'actual';
type Quality = 'high' | 'medium' | 'low';

interface Settings {
  pageSize: PageSize;
  orientation: Orientation;
  fitMode: FitMode;
  quality: Quality;
  marginPct: number;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ACCEPTED_EXT   = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_FILE_SIZE  = 20 * 1024 * 1024; // 20 MB
const MAX_FILES      = 50;

const PAGE_SIZES: Record<PageSize, [number, number]> = {
  a4:       [595.28, 841.89],
  letter:   [612,    792   ],
  original: [0,      0     ],
};

const QUALITY_MAP: Record<Quality, number> = {
  high:   0.95,
  medium: 0.80,
  low:    0.60,
};

// ─── Helpers ─────────────────────────────────────────────────────────────
function formatBytes(b: number): string {
  if (b < 1024)        return `${b} B`;
  if (b < 1048576)     return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(1)} MB`;
}

function getImageDimensions(src: string): Promise<{ w: number; h: number }> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 0, h: 0 });
    img.src = src;
  });
}

// ─── Component ────────────────────────────────────────────────────────────
export default function Converter({ compact = false }: { compact?: boolean }) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<Settings>({
    pageSize: 'a4',
    orientation: 'auto',
    fitMode: 'fit',
    quality: 'high',
    marginPct: 5,
  });
  const [isDragging, setIsDragging]   = useState(false);
  const [converting, setConverting]   = useState(false);
  const [progress, setProgress]       = useState(0);
  const [errorMsg, setErrorMsg]       = useState<string | null>(null);
  const [successMsg, setSuccessMsg]   = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(!compact);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter  = useRef(0);
  const dragItemId   = useRef<string | null>(null);
  const dragOverId   = useRef<string | null>(null);
  const inputId      = useId();

  // ─ File handling ─────────────────────────────────────────────────────
  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" is not a supported format. Use JPG, PNG or WEBP.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `"${file.name}" exceeds the 20 MB limit (${formatBytes(file.size)}).`;
    }
    return null;
  };

  const addFiles = useCallback((files: File[]) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const remaining = MAX_FILES - images.length;
    if (remaining <= 0) {
      setErrorMsg(`You can add up to ${MAX_FILES} images.`);
      return;
    }

    const toAdd = files.slice(0, remaining);
    const errors: string[] = [];

    const processed: ImageFile[] = toAdd
      .map(file => {
        const err = validateFile(file);
        if (err) { errors.push(err); return null; }
        return {
          id:      crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
          name:    file.name,
          size:    file.size,
        } as ImageFile;
      })
      .filter(Boolean) as ImageFile[];

    if (errors.length) setErrorMsg(errors[0]);
    setImages(prev => [...prev, ...processed]);
  }, [images.length]);

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter(i => i.id !== id);
    });
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const clearAll = () => {
    images.forEach(i => URL.revokeObjectURL(i.preview));
    setImages([]);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // ─ Drag-and-drop upload ───────────────────────────────────────────────
  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  // ─ Drag-to-reorder ───────────────────────────────────────────────────
  const onItemDragStart = (id: string) => { dragItemId.current = id; };
  const onItemDragOver  = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    dragOverId.current = id;
  };
  const onItemDrop = () => {
    const from = dragItemId.current;
    const to   = dragOverId.current;
    if (!from || !to || from === to) return;
    setImages(prev => {
      const arr   = [...prev];
      const fromI = arr.findIndex(i => i.id === from);
      const toI   = arr.findIndex(i => i.id === to);
      const [item] = arr.splice(fromI, 1);
      arr.splice(toI, 0, item);
      return arr;
    });
    dragItemId.current  = null;
    dragOverId.current  = null;
  };

  // ─ PDF Generation ────────────────────────────────────────────────────
  const convert = async () => {
    if (images.length === 0) {
      setErrorMsg('Please add at least one image.');
      return;
    }

    setConverting(true);
    setProgress(0);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      const qualityVal = QUALITY_MAP[settings.quality];
      const margin = settings.marginPct / 100;

      for (let idx = 0; idx < images.length; idx++) {
        const imgFile = images[idx];
        setProgress(Math.round((idx / images.length) * 90));

        // Get natural dimensions via canvas
        const { w: natW, h: natH } = await getImageDimensions(imgFile.preview);

        // Convert image to base64 via canvas (applies quality setting)
        const imgBytes = await new Promise<Uint8Array>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width  = natW;
            canvas.height = natH;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              blob => {
                if (!blob) { reject(new Error('Canvas conversion failed')); return; }
                blob.arrayBuffer().then(ab => resolve(new Uint8Array(ab)));
              },
              imgFile.file.type === 'image/png' ? 'image/png' : 'image/jpeg',
              qualityVal
            );
          };
          img.onerror = () => reject(new Error('Image load failed'));
          img.src = imgFile.preview;
        });

        // Determine page size
        let [pgW, pgH] = PAGE_SIZES[settings.pageSize];
        if (settings.pageSize === 'original') {
          pgW = natW;
          pgH = natH;
        }

        // Apply orientation
        let finalW = pgW;
        let finalH = pgH;
        if (settings.pageSize !== 'original') {
          const shouldLandscape =
            settings.orientation === 'landscape' ||
            (settings.orientation === 'auto' && natW > natH);
          if (shouldLandscape && pgW < pgH) {
            [finalW, finalH] = [pgH, pgW];
          }
        } else {
          finalW = natW;
          finalH = natH;
        }

        const page = pdfDoc.addPage([finalW, finalH]);

        // Embed image
        let pdfImage;
        if (imgFile.file.type === 'image/png') {
          pdfImage = await pdfDoc.embedPng(imgBytes);
        } else {
          pdfImage = await pdfDoc.embedJpg(imgBytes);
        }

        // Fit calculation
        const mTop    = finalH * margin;
        const mSide   = finalW * margin;
        const areaW   = finalW - mSide * 2;
        const areaH   = finalH - mTop * 2;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (settings.fitMode === 'actual' && settings.pageSize === 'original') {
          drawW = natW;
          drawH = natH;
          drawX = 0;
          drawY = 0;
        } else if (settings.fitMode === 'fill') {
          const scale = Math.max(areaW / natW, areaH / natH);
          drawW = natW * scale;
          drawH = natH * scale;
          drawX = mSide + (areaW - drawW) / 2;
          drawY = mTop  + (areaH - drawH) / 2;
        } else {
          // fit (default)
          const scale = Math.min(areaW / natW, areaH / natH);
          drawW = natW * scale;
          drawH = natH * scale;
          drawX = mSide + (areaW - drawW) / 2;
          drawY = mTop  + (areaH - drawH) / 2;
        }

        page.drawImage(pdfImage, { x: drawX, y: drawY, width: drawW, height: drawH });
      }

      setProgress(95);
      const pdfBytes = await pdfDoc.save();
      setProgress(100);

      // Download
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `converted-${new Date().toISOString().slice(0, 10)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setSuccessMsg(`PDF created with ${images.length} page${images.length > 1 ? 's' : ''} — download started.`);
    } catch (err) {
      console.error(err);
      setErrorMsg('PDF generation failed. Please try again or use a different browser.');
    } finally {
      setConverting(false);
      setTimeout(() => setProgress(0), 1200);
    }
  };

  // ─ Render ────────────────────────────────────────────────────────────
  const hasImages = images.length > 0;

  return (
    <div className={styles.workspace}>
      {/* Drop zone */}
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ''} ${hasImages ? styles.dropzoneCompact : ''}`}
        onDragEnter={onDragEnter}
        onDragOver={e => e.preventDefault()}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !hasImages && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Drop images or click to select"
        onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
      >
        <input
          id={inputId}
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXT.join(',')}
          multiple
          className={styles.fileInput}
          onChange={e => { addFiles(Array.from(e.target.files ?? [])); e.target.value = ''; }}
          aria-label="Select image files"
        />

        {!hasImages ? (
          <div className={styles.dropzoneContent}>
            <div className={styles.dropzoneIcon}>
              <Upload size={28} />
            </div>
            <h3 className={styles.dropzoneTitle}>
              {isDragging ? 'Drop your images here' : 'Drag & drop images here'}
            </h3>
            <p className={styles.dropzoneDesc}>
              JPG, JPEG, PNG and WEBP · Up to 20 MB each · Max {MAX_FILES} files
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              <FileImage size={16} /> Browse Files
            </button>
          </div>
        ) : (
          <div className={styles.dropzoneMini}>
            <div className={styles.dropzoneMiniLeft}>
              <Upload size={16} />
              <span>Add more images</span>
              <span className={styles.fileCount}>{images.length} / {MAX_FILES}</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              Browse
            </button>
          </div>
        )}
      </div>

      {/* Image grid */}
      {hasImages && (
        <div className={styles.imagesSection}>
          <div className={styles.imagesSectionHeader}>
            <span className={styles.imagesCount}>{images.length} image{images.length > 1 ? 's' : ''}</span>
            <span className={styles.imagesHint}>Drag to reorder</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={clearAll}>
              <X size={14} /> Clear all
            </button>
          </div>
          <div className={styles.thumbnailGrid}>
            {images.map((img, i) => (
              <div
                key={img.id}
                className={styles.thumbnail}
                draggable
                onDragStart={() => onItemDragStart(img.id)}
                onDragOver={e => onItemDragOver(e, img.id)}
                onDrop={onItemDrop}
              >
                <div className={styles.thumbHandle} aria-hidden="true">
                  <GripVertical size={14} />
                </div>
                <div className={styles.thumbNum}>{i + 1}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.preview}
                  alt={img.name}
                  className={styles.thumbImg}
                  loading="lazy"
                />
                <button
                  type="button"
                  className={styles.thumbRemove}
                  onClick={() => removeImage(img.id)}
                  aria-label={`Remove ${img.name}`}
                >
                  <X size={12} />
                </button>
                <div className={styles.thumbInfo}>
                  <span className={styles.thumbName}>{img.name}</span>
                  <span className={styles.thumbSize}>{formatBytes(img.size)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings panel */}
      <div className={`${styles.settingsPanel} card-glass`}>
        <button
          type="button"
          className={styles.settingsToggle}
          onClick={() => setSettingsOpen(v => !v)}
          aria-expanded={settingsOpen}
        >
          <span className={styles.settingsToggleLabel}>PDF Settings</span>
          {settingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {settingsOpen && (
          <div className={styles.settingsGrid}>
            {/* Page size */}
            <div className="form-group">
              <label className="form-label" htmlFor="pg-size">Page Size</label>
              <select
                id="pg-size"
                className="form-select"
                value={settings.pageSize}
                onChange={e => setSettings(s => ({ ...s, pageSize: e.target.value as PageSize }))}
              >
                <option value="a4">A4 (210 × 297 mm)</option>
                <option value="letter">Letter (8.5 × 11 in)</option>
                <option value="original">Original image size</option>
              </select>
            </div>

            {/* Orientation */}
            {settings.pageSize !== 'original' && (
              <div className="form-group">
                <label className="form-label" htmlFor="orientation">Orientation</label>
                <select
                  id="orientation"
                  className="form-select"
                  value={settings.orientation}
                  onChange={e => setSettings(s => ({ ...s, orientation: e.target.value as Orientation }))}
                >
                  <option value="auto">Auto (based on image)</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            )}

            {/* Fit mode */}
            <div className="form-group">
              <label className="form-label" htmlFor="fit-mode">Image Fit</label>
              <select
                id="fit-mode"
                className="form-select"
                value={settings.fitMode}
                onChange={e => setSettings(s => ({ ...s, fitMode: e.target.value as FitMode }))}
              >
                <option value="fit">Fit (preserve aspect ratio)</option>
                <option value="fill">Fill page (may crop)</option>
                <option value="actual">Actual size (no scaling)</option>
              </select>
            </div>

            {/* Quality */}
            <div className="form-group">
              <label className="form-label" htmlFor="quality">Image Quality</label>
              <select
                id="quality"
                className="form-select"
                value={settings.quality}
                onChange={e => setSettings(s => ({ ...s, quality: e.target.value as Quality }))}
              >
                <option value="high">High (best quality, larger file)</option>
                <option value="medium">Medium (balanced)</option>
                <option value="low">Low (smaller file)</option>
              </select>
            </div>

            {/* Margin */}
            <div className="form-group">
              <label className="form-label" htmlFor="margin">
                Margin: {settings.marginPct}%
              </label>
              <input
                id="margin"
                type="range"
                min={0}
                max={15}
                step={1}
                value={settings.marginPct}
                onChange={e => setSettings(s => ({ ...s, marginPct: Number(e.target.value) }))}
                className={styles.rangeInput}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status messages */}
      {errorMsg && (
        <div className={styles.alertError} role="alert">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className={styles.alertSuccess} role="status">
          <CheckCircle size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Progress bar */}
      {converting && progress > 0 && (
        <div className={styles.progressWrap}>
          <div className={styles.progressInfo}>
            <span>Generating PDF…</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Convert button */}
      <button
        type="button"
        className={`btn btn-primary btn-lg ${styles.convertBtn}`}
        onClick={convert}
        disabled={!hasImages || converting}
        aria-busy={converting}
      >
        {converting ? (
          <><Loader2 size={20} className="animate-spin" /> Generating PDF…</>
        ) : (
          <><Download size={20} /> Convert to PDF</>
        )}
      </button>

      {hasImages && !converting && (
        <p className={styles.note}>
          Processing is done locally in your browser — your images are never uploaded.
        </p>
      )}
    </div>
  );
}
