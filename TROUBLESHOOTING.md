# Troubleshooting Guide

## Page Not Loading

### Check Dev Server
1. Make sure dev server is running:
   ```bash
   npm run dev
   ```
2. Check terminal for errors
3. Visit `http://localhost:3000`

### Common Issues

#### 1. Video Loading Issues
- **Problem**: Videos with spaces in filenames may not load
- **Solution**: Next.js automatically URL-encodes spaces, but if issues persist:
  - Rename files to remove spaces (e.g., `Beachclub-1.MOV`)
  - Update paths in `/content/videos.ts`

#### 2. Browser Console Errors
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab to see if videos are loading

#### 3. Video Format Issues
- `.MOV` files may not work in all browsers
- Convert to `.mp4` for better compatibility:
  ```bash
  # Using ffmpeg
  ffmpeg -i "Beachclub 1.MOV" "Beachclub-1.mp4"
  ```

#### 4. Content Not Showing
- The page shows content even if videos fail
- Check if text/content appears (videos are optional)
- Videos are background only - content should always show

### Quick Fixes

#### Disable Video Background Temporarily
Edit `/components/AnimatedHero.tsx`:
```tsx
// Comment out video section temporarily
{false && heroVideos.length > 0 && (
  // video code
)}
```

#### Use Static Background Instead
Replace video section with:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy" />
```

### Check File Paths
Verify videos exist:
```bash
ls -la public/videos/
```

### Browser Compatibility
- Try different browser (Chrome, Firefox, Safari)
- Check if autoplay is blocked (browser settings)
- Videos are muted, so autoplay should work

### Performance
- Large video files (>50MB) may load slowly
- Consider compressing videos
- Use poster images for faster initial load

## Still Not Working?

1. **Check terminal output** for build errors
2. **Clear browser cache** (Cmd+Shift+R / Ctrl+Shift+R)
3. **Restart dev server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```
4. **Check file permissions** - videos should be readable
