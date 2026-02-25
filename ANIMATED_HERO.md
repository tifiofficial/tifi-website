# Animated Hero Landing Page

## ✨ FISHER-Inspired Animation

Your landing page now features a dynamic, video-based hero section inspired by FISHER's website style.

## Features

### Video Background
- **Rotating videos**: Automatically cycles through hero videos every 8 seconds
- **Smooth transitions**: Fade animations between video changes
- **Full-screen coverage**: Videos fill the entire viewport
- **Auto-play**: Videos start automatically (muted for browser compatibility)

### Animated Text
- **Staggered animations**: Title, tagline, description, and CTAs animate in sequence
- **Scale effects**: Title scales up on load
- **Fade-ins**: Smooth opacity transitions
- **Large typography**: Massive, bold title (8xl to 12rem)

### Visual Effects
- **Dark overlay**: Gradient overlay for text readability
- **Grain texture**: Subtle grain overlay for premium feel
- **Scroll indicator**: Animated scroll prompt at bottom

## Hero Videos

Currently configured to rotate through:
1. `/videos/NCG REEL 1.mp4` (New City Gas)
2. `/videos/Beachclub 1.MOV` (Beachclub)
3. `/videos/Soluna 1.m4v` (Soluna)

To change hero videos, edit `/content/videos.ts`:
```typescript
export const heroVideos = [
  '/videos/your-video-1.mp4',
  '/videos/your-video-2.mp4',
]
```

## Customization

### Change Animation Speed
Edit `AnimatedHero.tsx`:
- Video rotation: Change `8000` (8 seconds) to your preferred duration
- Text delays: Adjust delay values (0.3, 0.5, 0.7, etc.)

### Adjust Overlay Darkness
Edit the gradient overlay opacity:
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/60" />
```
Change `/60`, `/40`, `/60` values to adjust darkness.

### Typography Size
Modify title size:
```tsx
className="text-8xl md:text-[12rem]"
```

## Performance

- Videos are lazy-loaded
- Smooth transitions prevent jarring cuts
- Grain overlay is CSS-based (no image needed)
- Optimized for mobile and desktop

## Browser Compatibility

- Auto-play works on all modern browsers (muted)
- Falls back gracefully if videos fail to load
- Mobile-optimized with responsive sizing
