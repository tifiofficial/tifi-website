# Debugging Blank White Page

## Quick Checks

1. **Open Browser Console** (F12 → Console tab)
   - Look for red error messages
   - Copy any errors you see

2. **Check Network Tab** (F12 → Network tab)
   - Refresh page
   - Look for failed requests (red)
   - Check if CSS/JS files are loading

3. **Try Test Page**
   - Visit: `http://localhost:3000/test`
   - If this works, the issue is with the main page

4. **Check Terminal**
   - Look at the terminal where `npm run dev` is running
   - Check for any error messages

## Common Causes

### JavaScript Error
- Check browser console for errors
- Common: Import errors, undefined variables

### CSS Not Loading
- Check Network tab for CSS files
- Try hard refresh: Cmd+Shift+R

### Client Component Issue
- All components using hooks need 'use client'
- Check if any server components are using client-only features

## Quick Fixes

### Disable Smooth Scroll Temporarily
Comment out SmoothScrollProvider in `app/layout.tsx`:
```tsx
{/* <SmoothScrollProvider> */}
  {children}
{/* </SmoothScrollProvider> */}
```

### Disable Cursor Follower
Comment out CursorFollower in `app/layout.tsx`:
```tsx
{/* <CursorFollower /> */}
```

### Minimal Test
Replace `app/page.tsx` content with:
```tsx
export default function Home() {
  return <div style={{padding: '50px', color: 'white'}}>Test</div>
}
```

If this works, add components back one by one.
