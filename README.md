# Videographer Portfolio

Astro + TailwindCSS で構築した、映像制作者向けのモダンなポートフォリオサイトです。

## Tech Stack

- **Framework**: Astro (SSG)
- **Styling**: Tailwind CSS v4
- **Typography**: Inter + Noto Sans JP (Google Fonts)
- **Content**: Astro Content Collections (Markdown)
- **Language**: TypeScript (strict)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── Header.astro        # Fixed header with mobile menu
│   ├── Footer.astro        # Footer with nav, social, email
│   ├── Hero.astro          # Background video hero section
│   ├── WorkCard.astro      # Work card with hover video preview
│   ├── SectionHeading.astro # Reusable section heading
│   ├── Services.astro      # Services grid
│   ├── Process.astro       # Production workflow timeline
│   ├── About.astro         # About section with stats
│   ├── Testimonials.astro  # Client testimonials
│   └── Contact.astro       # Contact form (Formspree)
├── content/
│   └── works/              # Work entries (Markdown + frontmatter)
│       ├── aurora-brand-film.md
│       ├── midnight-echoes.md
│       ├── the-craft.md
│       ├── wanderlust-hokkaido.md
│       ├── eternal-vows.md
│       └── neon-district.md
├── layouts/
│   └── BaseLayout.astro    # Base HTML layout with SEO/OG tags
├── pages/
│   ├── index.astro         # Home (LP: Hero + Works + Services + etc.)
│   └── works/
│       ├── index.astro     # All works with category filter
│       └── [slug].astro    # Work detail page
├── styles/
│   └── global.css          # Tailwind + custom theme + animations
└── content.config.ts       # Content collection schema
public/
├── images/                 # Static images
│   ├── hero-poster.jpg     # Hero video poster
│   ├── about-portrait.jpg  # About section portrait
│   ├── og-image.jpg        # OG image for social sharing
│   └── works/              # Work thumbnails
└── videos/                 # Static video files
    ├── hero-reel.mp4       # Hero background video
    └── works/              # Work preview clips
```

## Adding a New Work

1. Create a new `.md` file in `src/content/works/`:

```markdown
---
title: "Project Title"
year: 2025
role: "Director / DP"
client: "Client Name"
category: "commercial"  # commercial | music-video | documentary | wedding | brand | short-film
tags: ["tag1", "tag2"]
thumbnail: "/images/works/project-thumb.jpg"
previewVideo: "/videos/works/project-preview.mp4"  # optional
fullVideoUrl: "https://vimeo.com/123456"           # optional
description: "Short description for meta and hero."
featured: true    # Show on homepage
order: 1          # Sort order (lower = first)
credits:          # optional
  - role: "Director"
    name: "Your Name"
  - role: "Producer"
    name: "Producer Name"
---

Markdown body content here. Supports ## headings, lists, etc.
```

1. Add thumbnail image to `public/images/works/`
1. Add preview video to `public/videos/works/` (optional)

## Video Assets

### Hero Background Video

- **Path**: `public/videos/hero-reel.mp4`
- **Recommended**: 1920x1080, 15-30s loop, 5-10MB
- **Encoding**: H.264, CRF 23-28, no audio track
- **Poster**: `public/images/hero-poster.jpg` (same frame, JPEG ~100KB)

```bash
# Encode hero video with ffmpeg
ffmpeg -i source.mp4 -c:v libx264 -crf 26 -preset slow \
  -vf "scale=1920:1080" -an -movflags +faststart \
  public/videos/hero-reel.mp4
```

### Work Preview Clips

- **Path**: `public/videos/works/{name}-preview.mp4`
- **Recommended**: 640x400, 3-5s loop, <2MB each
- **Encoding**: H.264, CRF 28-32, no audio

```bash
# Encode preview clip
ffmpeg -i source.mp4 -c:v libx264 -crf 30 -preset slow \
  -vf "scale=640:400" -t 5 -an -movflags +faststart \
  public/videos/works/project-preview.mp4
```

### WebM Alternative (Optional)

```bash
# Create WebM version for better compression
ffmpeg -i source.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -vf "scale=1920:1080" -an public/videos/hero-reel.webm
```

## Customization

### Colors

Edit `src/styles/global.css` — the `@theme` block contains all design tokens:

```css
@theme {
  --color-accent: #67e8f9;        /* Change accent color */
  --color-bg-primary: #0a0a0a;    /* Main background */
}
```

### Content

- **Profile info**: Edit `src/components/About.astro` and `src/components/Footer.astro`
- **Services**: Edit `src/components/Services.astro`
- **Testimonials**: Edit `src/components/Testimonials.astro`
- **Contact form**: Update the Formspree endpoint in `src/components/Contact.astro`

### Contact Form Setup

The form uses [Formspree](https://formspree.io/). To activate:

1. Create a free account at formspree.io
1. Create a new form
1. Replace `YOUR_FORM_ID` in `src/components/Contact.astro` with your form ID

## Performance Notes

- Full SSG — zero JS shipped by default (only small inline scripts for interactions)
- Hero video: autoplay muted loop with poster fallback
- `prefers-reduced-motion`: videos pause, animations disable
- Slow connection detection via `navigator.connection` API
- Images use `loading="lazy"` and explicit `width/height` for CLS
- Work preview videos use `preload="none"` — loaded only on hover
- Only one preview video plays at a time
- Google Fonts loaded with `display=swap`

## Deploy

### Cloudflare Pages (Recommended)

```bash
npm run build
# Upload `dist/` folder, or connect Git repo
# Build command: npm run build
# Output directory: dist
```

### Vercel

```bash
npx vercel
# Or connect Git repo with:
# Framework: Astro
# Build command: npm run build
# Output directory: dist
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
# Or connect Git repo with build settings:
# Build command: npm run build
# Publish directory: dist
```

## Placeholder Assets

The current build uses SVG placeholder images. Replace these with actual media:

- `public/images/hero-poster.jpg` — Hero video poster (1920x1080)
- `public/images/about-portrait.jpg` — Portrait photo (600x750)
- `public/images/og-image.jpg` — OG/social image (1200x630)
- `public/images/works/*-thumb.jpg` — Work thumbnails (640x400)
- `public/videos/hero-reel.mp4` — Hero background loop
- `public/videos/works/*-preview.mp4` — Work hover previews
