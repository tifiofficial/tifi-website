# Quick Start Guide

## 🚀 Get Running in 5 Minutes

1. **Install dependencies:**
   ```bash
   cd tifi-website
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Before Going Live

### Required: Add Your Images
Place these files in `/public/images/`:
- `epk-cover.jpg` - Hero portrait (800x1200px recommended)
- `hero-1.jpg` - Featured tiles (1200x900px recommended)  
- `og-image.jpg` - Social preview (1200x630px required)

### Required: Add EPK PDF
Place `tifi-epk.pdf` in `/public/epk/`

### Required: Update Content
Edit `/content/tifi.ts`:
- Replace placeholder social media links
- Update Spotify/SoundCloud/YouTube embed URLs
- Change contact emails to your actual addresses

### Optional: Email Integration
See `SETUP.md` for Resend or EmailJS setup

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change:
- `navy` - Main background color
- `ice-blue` - Accent color
- `teal-accent` - Secondary accent

### Typography
Fonts are set in `app/globals.css` via CSS variables

### Animations
- Smooth scroll: `components/SmoothScrollProvider.tsx`
- Magnetic buttons: `components/MagneticButton.tsx`
- Cursor follower: `components/CursorFollower.tsx`

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Test production build
npm start

# Deploy to Vercel (see DEPLOYMENT.md)
```

## 📚 Full Documentation

- **SETUP.md** - Detailed setup instructions
- **DEPLOYMENT.md** - Deployment guide
- **README.md** - Complete project documentation

## 🐛 Common Issues

**Port already in use?**
```bash
# Use different port
npm run dev -- -p 3001
```

**Images not showing?**
- Check file paths match exactly
- Ensure images are in `/public/images/`
- Check browser console for 404 errors

**Build errors?**
```bash
# Check for TypeScript errors
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

## ✨ Features Implemented

✅ Loading screen with TIFI branding  
✅ Hero section with magnetic CTAs  
✅ Featured tiles (Sound, Shows, Press Kit)  
✅ About section with sound descriptors  
✅ Animated stats counters  
✅ Filterable venues grid  
✅ Support list + expandable catalog cards  
✅ Music catalog page  
✅ Listen section with embed modals  
✅ Contact form with validation  
✅ Press kit page with EPK download  
✅ Smooth scrolling  
✅ Cursor follower  
✅ Responsive design  
✅ SEO meta tags  
✅ Performance optimized  

## 🎯 Next Steps

1. Add your images and EPK PDF
2. Update all links in `/content/tifi.ts`
3. Test all pages and interactions
4. Set up email integration (optional)
5. Deploy to Vercel
6. Share your site! 🎉
