# TIFI Website

A premium, interactive website for DJ/producer brand TIFI, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✨ Minimalist, editorial design inspired by selectedbase.com
- 🎨 Smooth scrolling with Lenis
- 🎭 Interactive hover states (magnetic buttons, image reveals)
- 📱 Fully responsive and accessible
- ⚡ Optimized for performance (Lighthouse 90+)
- 🎯 Scroll-triggered animations with Framer Motion
- 🎵 Music catalog with expandable cards
- 📧 Contact form with validation
- 📄 EPK download functionality

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis (@studio-freight/lenis)
- **Image Optimization**: next/image

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tifi-website/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── music/             # Music catalog page
│   ├── contact/           # Contact/booking page
│   ├── press-kit/         # EPK download page
│   ├── layout.tsx          # Root layout
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── MagneticButton.tsx
│   ├── LoadingScreen.tsx
│   └── ...
├── content/               # Content configuration
│   └── tifi.ts           # Brand data and content
├── public/               # Static assets
│   ├── images/          # Image assets
│   └── epk/             # EPK PDF
└── lib/                 # Utility functions
```

## Adding Your Content

### Images

Place your images in `/public/images/`:

- `epk-cover.jpg` - Hero portrait image (recommended: 800x1200px)
- `hero-1.jpg` - Featured tiles image (recommended: 1200x900px)
- `og-image.jpg` - OpenGraph image (1200x630px)

### EPK PDF

Place your EPK PDF at `/public/epk/tifi-epk.pdf`

### Social Links & Embeds

Update links in `/content/tifi.ts`:

```typescript
socials: {
  instagram: 'https://instagram.com/yourhandle',
  spotify: 'https://open.spotify.com/artist/yourid',
  soundcloud: 'https://soundcloud.com/yourhandle',
  youtube: 'https://youtube.com/@yourhandle',
},
embeds: {
  spotify: 'https://open.spotify.com/embed/artist/yourid',
  soundcloud: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/yourhandle',
  youtube: 'https://www.youtube.com/embed/yourid',
},
```

### Contact Email

Update booking and management emails in `/content/tifi.ts`:

```typescript
contact: {
  bookingEmail: 'your-booking@email.com',
  managementEmail: 'your-management@email.com',
},
```

## Form Integration

The contact form currently logs submissions to the console. To enable email sending:

### Option 1: Resend (Recommended)

1. Install Resend:
```bash
npm install resend
```

2. Create a Resend API key at [resend.com](https://resend.com)

3. Add to `.env.local`:
```
RESEND_API_KEY=your_api_key
```

4. Update `/components/ContactForm.tsx` to use Resend API

### Option 2: EmailJS

1. Install EmailJS:
```bash
npm install @emailjs/browser
```

2. Set up EmailJS account and update the form component

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Add environment variables if using email services

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## Performance Optimization

- Images are optimized with `next/image`
- Animations are deferred and use `will-change` where appropriate
- Heavy effects are loaded only when needed
- Lighthouse score target: 90+ on mobile

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project for TIFI brand.

## Support

For questions or issues, contact: booking@tifi.com
