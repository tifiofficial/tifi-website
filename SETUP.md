# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your images:**
   - Place `epk-cover.jpg` in `/public/images/`
   - Place `hero-1.jpg` in `/public/images/`
   - Place `og-image.jpg` (1200x630) in `/public/images/`

3. **Add EPK PDF:**
   - Place `tifi-epk.pdf` in `/public/epk/`

4. **Update content:**
   - Edit `/content/tifi.ts` with your actual:
     - Social media links
     - Spotify/SoundCloud/YouTube embed URLs
     - Contact emails
     - Any updated stats or venues

5. **Run development server:**
   ```bash
   npm run dev
   ```

6. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Where to Paste Real Links/Images

### Images (`/public/images/`)
- **epk-cover.jpg**: Hero section portrait (recommended: 800x1200px, optimized)
- **hero-1.jpg**: Featured tiles background (recommended: 1200x900px)
- **og-image.jpg**: Social media preview (1200x630px, required for OpenGraph)

### Content (`/content/tifi.ts`)
- **Social Links**: Update `socials` object with your actual URLs
- **Embed URLs**: Update `embeds` object with your Spotify/SoundCloud/YouTube embed codes
- **Contact Emails**: Update `contact.bookingEmail` and `contact.managementEmail`
- **Stats**: Update numbers in `stats` object as needed
- **Venues**: Add/remove venues in `venues` array
- **Catalog**: Update tracks in `catalog` array

### EPK (`/public/epk/`)
- **tifi-epk.pdf**: Your Electronic Press Kit PDF

## Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Add Environment Variables (if using email):**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `RESEND_API_KEY` or EmailJS variables if needed

4. **Your site will be live!**

## Optional: Email Integration

### Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
4. Update `/components/ContactForm.tsx` to send emails via Resend API

### Using EmailJS

1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service and template
3. Add to `.env.local`:
   ```
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Update `/components/ContactForm.tsx` to use EmailJS

## Performance Checklist

- ✅ Images optimized with `next/image`
- ✅ Animations use `will-change` and are deferred
- ✅ Smooth scroll with Lenis (lightweight)
- ✅ Framer Motion for performant animations
- ✅ Tailwind CSS for minimal CSS bundle
- ✅ TypeScript for type safety

## Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Troubleshooting

**Images not loading?**
- Check file paths in `/public/images/`
- Ensure file extensions match (.jpg, .png, etc.)
- Check browser console for 404 errors

**Animations not working?**
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser console for errors
- Verify smooth scroll provider is wrapping content

**Build errors?**
- Run `npm run lint` to check for TypeScript errors
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (18+ required)

## Next Steps

1. Replace placeholder images with actual photos
2. Update all social links and embed URLs
3. Add your EPK PDF
4. Test contact form (set up email integration)
5. Deploy to Vercel
6. Set up custom domain (optional)
