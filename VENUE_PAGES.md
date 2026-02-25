# Venue Pages Setup

## ✅ Venue-Specific Pages Created

### 1. New City Gas (`/venues/new-city-gas`)
- **Location**: Montreal
- **Photos**: 5 performance shots
- **Status**: ✅ Live

### 2. Beachclub (`/venues/beachclub`)
- **Location**: Toronto (added to venues list)
- **Photos**: 3 performance shots
- **Status**: ✅ Live

### 3. Coffee Party (`/venues/coffee-party`)
- **Location**: General gallery (can be assigned to a specific venue later)
- **Photos**: 4 performance shots (including 1 B&W)
- **Status**: ✅ Live

## Features

### Venue Gallery Component
- **Grid layout**: Responsive 1/2/3 column grid
- **Lightbox modal**: Click any photo to view full-size
- **Navigation**: Previous/Next buttons in lightbox
- **Hover effects**: Smooth scale and overlay on hover
- **Image optimization**: Uses Next.js Image component

### Venues List Integration
- Venues with photos show a "Photos" badge
- Clickable cards that link to venue pages
- Smooth hover animations
- Filterable by city (Toronto, Montreal, etc.)

## How to Access

1. **From Homepage**: Scroll to "Venues" section
2. **Click any venue with photos**: New City Gas, Beachclub, or Coffee Party
3. **Direct URLs**:
   - `/venues/new-city-gas`
   - `/venues/beachclub`
   - `/venues/coffee-party`

## Adding More Venues

To add photos for another venue:

1. **Add photos** to `/public/images/venues/[venue-slug]/`
2. **Update** `/content/venuePhotos.ts`:
   ```typescript
   'Venue Name': [
     '/images/venues/venue-slug/photo1.png',
     '/images/venues/venue-slug/photo2.png',
   ],
   ```
3. **Add slug mapping** in `/components/Venues.tsx`:
   ```typescript
   const venueSlugs: Record<string, string> = {
     'Venue Name': 'venue-slug',
     // ...
   }
   ```
4. **Add venue** to `/content/tifi.ts` venues array if not already there

## Photo Organization

```
public/images/venues/
├── new-city-gas/     (5 photos)
├── beachclub/        (3 photos)
└── other/            (4 Coffee Party photos)
```

All photos are optimized by Next.js automatically!
