export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content: {
    heading: string;
    body: string[];
  }[];
  keyTakeaways: string[];
}

export const articles: Article[] = [
  {
    slug: 'how-to-convert-jpg-to-pdf',
    title: 'How to Convert JPG to PDF Without Losing Quality',
    metaDescription: 'Step-by-step guide to converting JPG photos and scans into high-resolution PDF documents locally in your browser without compression loss.',
    excerpt: 'Learn the correct settings for page sizing, margins, and DPI preservation when packaging JPG images into a single PDF document.',
    category: 'Guide',
    readTime: '4 min read',
    date: 'Oct 12, 2026',
    author: 'Engineering Team',
    keyTakeaways: [
      'Maintain original aspect ratio to avoid image stretching or distortion.',
      'Select A4 for international documentation or Letter for North American standards.',
      'Local client-side conversion keeps sensitive receipts, IDs, and financial records private.',
      'Setting quality to High preserves raw JPEG quantization tables without unnecessary re-encoding loss.'
    ],
    content: [
      {
        heading: 'Why Convert JPG Photos to PDF?',
        body: [
          'JPEG is the universal format for digital photography, smartphone snapshots, and document scans. However, sending multiple individual JPG attachments frequently creates issues: recipients receive files out of order, image orientations can be scrambled by email clients, and printing individual photos requires manually adjusting print dimensions for each sheet.',
          'Combining related photos into a structured PDF resolves these challenges. A single multi-page PDF preserves the exact sequence of your pages, ensures uniform print margins, and opens identically across macOS, Windows, iOS, and Android without specialized software.'
        ]
      },
      {
        heading: 'Selecting the Right Page Dimensions',
        body: [
          'When converting images, deciding on the output page dimension is the most critical step:',
          '• A4 (210 × 297 mm): The global standard used in Europe, Asia, Latin America, and Oceania. Ideal for official forms, visa documents, and job applications.',
          '• US Letter (8.5 × 11 in): The standard in the United States and Canada. Essential if your recipient expects to print onto standard American office paper.',
          '• Original Image Dimensions: Places each image on a custom-sized PDF canvas matching its natural pixel dimensions. This is ideal when you want zero whitespace borders around artwork, technical schematics, or non-standard receipts.'
        ]
      },
      {
        heading: 'How Client-Side Conversion Protects Confidential Data',
        body: [
          'Many online file converters transmit your uploaded documents to remote cloud servers to execute conversion scripts. If you are converting tax documents, passport scans, medical records, or contractual agreements, uploading those files exposes you to server-side logging and potential data breaches.',
          'ImageToPDF runs entirely inside your browser using modern WebAssembly and Canvas APIs. Your images remain in your device memory and are directly synthesized into PDF bytes without traveling over the network.'
        ]
      }
    ]
  },
  {
    slug: 'pdf-page-sizes-explained',
    title: 'PDF Page Sizes Explained: A4 vs US Letter vs Original Dimensions',
    metaDescription: 'Understand standard document dimensions, aspect ratios, and when to use A4, Letter, or Original Dimensions when creating PDFs from images.',
    excerpt: 'A comprehensive comparison of international ISO 216 paper sizes and North American formats to help you choose the ideal layout.',
    category: 'Standards',
    readTime: '5 min read',
    date: 'Oct 08, 2026',
    author: 'Standards & Formats Team',
    keyTakeaways: [
      'ISO 216 standardizes A4 (1:√2 ratio), allowing geometric scaling between A3, A4, and A5.',
      'US Letter uses 1:1.2941 aspect ratio and is wider and shorter than A4.',
      'Choosing Auto-Orientation aligns each page to portrait or landscape depending on the individual photo aspect ratio.',
      'Using Original Dimensions prevents downsampling and unnecessary whitespace borders.'
    ],
    content: [
      {
        heading: 'The ISO 216 Paper Hierarchy (A4 and Beyond)',
        body: [
          'Adopted by virtually every nation outside North America, the ISO 216 standard is built upon the unique mathematical ratio 1:√2 (approximately 1:1.414). This property guarantees that folding or cutting an A-series sheet in half yields the next smaller size in the exact same proportion.',
          'A4 measures 210 × 297 mm (8.27 × 11.69 inches). In 72 DPI digital PDF coordinate points, A4 corresponds precisely to 595.28 × 841.89 points. When converting documents destined for government agencies, international universities, or corporate contracts abroad, A4 is virtually always required.'
        ]
      },
      {
        heading: 'North American ANSI Standards (US Letter)',
        body: [
          'The United States, Canada, and parts of Mexico rely on the ANSI/ASME Y14.1 system. US Letter measures 8.5 × 11 inches (215.9 × 279.4 mm), which translates to 612 × 792 points in standard PDF space.',
          'Notice that US Letter is slightly wider (by 5.9 mm) but noticeably shorter (by 17.6 mm) than A4. If an A4 document is printed on US Letter paper without scaling, the top or bottom 18 mm will often be truncated by physical printer hardware.'
        ]
      },
      {
        heading: 'When to Use "Original Dimensions"',
        body: [
          'Standard paper sizes introduce white letterboxing when an image does not match the 1:1.414 or 1:1.294 aspect ratio. For photographs, panoramic shots, receipts, infographics, and smartphone screenshots, forcing a fixed paper size creates awkward empty margins.',
          'Selecting "Original Dimensions" instructs the converter to create a custom viewport for each page matching the image aspect ratio exactly. This ensures edge-to-edge fidelity without clipping or unwanted margins.'
        ]
      }
    ]
  },
  {
    slug: 'image-quality-in-pdf',
    title: 'Optimizing Image Quality and File Size in PDF Documents',
    metaDescription: 'How to strike the ideal balance between visual sharpness and lightweight PDF file size for emails, archiving, and printing.',
    excerpt: 'Explore how JPEG compression levels, DPI targets, and canvas scaling affect final PDF size and clarity.',
    category: 'Optimization',
    readTime: '6 min read',
    date: 'Sep 29, 2026',
    author: 'Performance Lab',
    keyTakeaways: [
      'Email attachments typically cap out at 20–25 MB; optimizing quality prevents delivery failure.',
      '95% quality is visually indistinguishable from lossless for photography while saving 40% file size.',
      '75–80% quality is optimal for everyday business invoices, homework, and administrative submissions.',
      'Avoid double-compression cycles by converting original source files whenever possible.'
    ],
    content: [
      {
        heading: 'Understanding Digital Image Compression in PDFs',
        body: [
          'A PDF file is a vector and binary container. When images are inserted into a PDF page, they are embedded as image XObjects. The compression method applied to these objects dictates both visual fidelity and document weight.',
          'For photographic and scanned content, DCTDecode (JPEG compression) is applied. Unlike uncompressed raw bitmaps which can easily exceed 20 MB for a single high-megapixel smartphone photo, JPEG compression groups image data into 8×8 pixel blocks and preserves luminance information while subtly downsampling high-frequency color variations that the human eye cannot discern.'
        ]
      },
      {
        heading: 'Choosing Between High, Medium, and Low Presets',
        body: [
          'Our converter provides three meticulously tuned compression profiles:',
          '• High (95% quality): Recommended for fine artwork, portfolios, technical diagrams with small text, and prints. Produces minimal compression artifacts at the expense of a slightly larger file size.',
          '• Medium (80% quality): The sweet spot for 90% of use cases. It reduces the file size by 50–70% compared to uncompressed images while maintaining crisp legibility for text, signatures, and photographic detail.',
          '• Low (60% quality): Built for strict file-upload gates (such as legal portals or legacy government websites requiring under 2 MB totals). Sharp edges may exhibit slight blurring, but documents remain fully legible.'
        ]
      },
      {
        heading: 'Resolution and PPI (Pixels Per Inch)',
        body: [
          'A common misconception is that increasing PPI settings makes a digital PDF clearer on screens. On digital displays, only pixel dimensions matter. However, for physical printing:',
          '• 300 PPI is the industry standard for photographic offset printing.',
          '• 150 to 200 PPI provides excellent results on office laser and inkjet printers.',
          '• 72 to 100 PPI is standard for digital screen distribution.'
        ]
      }
    ]
  },
  {
    slug: 'convert-png-to-pdf',
    title: 'Converting PNG to PDF: Handling Transparency, Logos, and Diagrams',
    metaDescription: 'Best practices for converting PNG graphics and transparent logos into crisp vector-friendly PDF presentations and reports.',
    excerpt: 'Understand how alpha channel transparency interacts with PDF background layers and how to avoid dark silhouette artifacts.',
    category: 'Design',
    readTime: '4 min read',
    date: 'Sep 20, 2026',
    author: 'Engineering Team',
    keyTakeaways: [
      'PNG uses lossless DEFLATE compression, making it ideal for sharp text, line art, and icons.',
      'Alpha transparency requires careful flattening against a clean white canvas for standard document printing.',
      'PNG files are typically larger than JPEGs of the same dimensions; convert carefully when bundling many pages.',
      'Our converter preserves PNG crispness without introducing blurry JPEG compression artifacts.'
    ],
    content: [
      {
        heading: 'PNG vs JPEG for PDF Documents',
        body: [
          'While JPEG is optimized for continuous tone photographs with smooth gradients, PNG (Portable Network Graphics) was designed for graphics, charts, screenshots, and logos with solid colors and sharp transitions.',
          'When you embed a screenshot containing small code or spreadsheet typography into a JPEG-compressed PDF, you will often notice "mosquito noise" artifacts surrounding the letters. Converting PNG directly preserves pixel-perfect edges.'
        ]
      },
      {
        heading: 'Handling Alpha Transparency',
        body: [
          'Many PNGs (like corporate logos or transparent product renders) do not have a solid background color. When viewed in dark-mode viewers or printed, transparent regions can sometimes render as solid black or gray depending on the PDF viewer default canvas.',
          'Our converter automatically renders PNGs onto an optimal white substrate or embeds the native PNG alpha mask, ensuring that transparent assets look clean and professional regardless of the recipient viewer settings.'
        ]
      }
    ]
  },
  {
    slug: 'mobile-image-to-pdf-guide',
    title: 'How to Convert Phone Photos to PDF on iOS and Android',
    metaDescription: 'Quickly turn smartphone photos, receipts, and whiteboard snapshots into clean multi-page PDFs directly on your mobile browser.',
    excerpt: 'A mobile-first tutorial for snapping receipts, ID cards, and school assignments and turning them into PDFs without third-party app installations.',
    category: 'Mobile',
    readTime: '3 min read',
    date: 'Sep 14, 2026',
    author: 'Product Team',
    keyTakeaways: [
      'No app store download or account registration needed.',
      'Works seamlessly in mobile Safari, Chrome, Samsung Internet, and Firefox.',
      'Rearrange pages on touchscreens with intuitive drag-and-drop handles.',
      'Take photos directly from your camera roll or capture live through the file picker.'
    ],
    content: [
      {
        heading: 'No Native App Required',
        body: [
          'Many mobile "scanner apps" lock essential features behind expensive monthly subscriptions, watermarking your PDFs or forcing you to register an account before downloading. Others upload your private camera roll to third-party ad servers.',
          'ImageToPDF runs smoothly in any mobile web browser. You get full desktop-grade PDF creation directly on your iPhone, iPad, or Android phone with zero privacy compromises.'
        ]
      },
      {
        heading: 'Tips for Taking Clean Mobile Document Scans',
        body: [
          '1. Ensure Even Lighting: Avoid overhead single-bulb spotlights that cast harsh shadows of your hand or phone across the paper. Diffused daylight near a window works best.',
          '2. Align Parallel to the Document: Hold your smartphone directly above the document rather than at an acute angle to minimize keystoning perspective distortion.',
          '3. High Contrast Background: Place white sheets of paper on a dark desk or table so the paper borders stand out clearly.'
        ]
      }
    ]
  },
  {
    slug: 'pdf-conversion-troubleshooting',
    title: 'Troubleshooting Common Image to PDF Conversion Problems',
    metaDescription: 'Solutions for out-of-memory errors, upside-down image orientations, oversized PDFs, and unsupported file formats.',
    excerpt: 'Fixing common hurdles when creating PDFs from high-megapixel photos and corrupted image files.',
    category: 'Troubleshooting',
    readTime: '5 min read',
    date: 'Sep 02, 2026',
    author: 'Support & Engineering',
    keyTakeaways: [
      'Browser memory constraints can occur if adding dozens of 50+ megapixel RAW/uncompressed images.',
      'EXIF orientation metadata can sometimes flip portrait photos sideways; use Auto-orientation.',
      'HEIC photos from newer iPhones must be converted or shared as JPEG before bundling.',
      'Always check the total PDF file size before emailing to ensure it falls under email gateway thresholds.'
    ],
    content: [
      {
        heading: 'Browser Memory Management with Large Batches',
        body: [
          'Because our converter runs completely in client-side memory for privacy, handling 40 or 50 high-resolution camera files (e.g., 48 MP files from recent iPhone or Galaxy flagships) requires significant RAM.',
          'If your browser tab refreshes or slows down during conversion, try processing your document in batches of 15–20 images, or lower the quality setting from High to Medium. This reduces canvas buffer allocation without impacting readable quality.'
        ]
      },
      {
        heading: 'Orientation & Rotation Glitches',
        body: [
          'Digital cameras write an EXIF tag specifying whether a photo was shot in portrait or landscape. Some older software ignores EXIF metadata and defaults to the sensor native orientation, causing pages to appear rotated 90 degrees.',
          'ImageToPDF automatically honors EXIF tags and inspects the computed aspect ratio of every uploaded file. By choosing "Auto Orientation", landscape images automatically receive landscape pages, and portrait shots receive portrait pages.'
        ]
      }
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}
