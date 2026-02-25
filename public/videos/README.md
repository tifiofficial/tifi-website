# Video Upload Guide

## Where to Place Videos

Place your video files in `/public/videos/` directory.

### Recommended Structure:
```
public/videos/
├── performances/
│   ├── new-city-gas-set.mp4
│   ├── beachclub-set.mp4
│   └── coffee-party-set.mp4
├── behind-the-scenes/
│   └── studio-session.mp4
└── thumbnails/  (optional - for video posters)
    ├── new-city-gas-thumb.jpg
    └── beachclub-thumb.jpg
```

## Video Format Recommendations

### Best Practices:
- **Format**: MP4 (H.264 codec) - most compatible
- **Resolution**: 1080p (1920x1080) or 4K if available
- **File Size**: Keep under 100MB per video for web (consider compression)
- **Duration**: Shorter clips (1-5 min) load faster
- **Thumbnails**: Create JPG poster images (1920x1080) for better loading

## Adding Videos to the Site

### Step 1: Upload Videos
1. Copy your video files to `/public/videos/`
2. Optionally create thumbnail images in `/public/videos/thumbnails/` or `/public/images/video-thumbnails/`

### Step 2: Update Video Configuration
Edit `/content/videos.ts`:

```typescript
export const videos: Video[] = [
  {
    src: '/videos/performances/new-city-gas-set.mp4',
    poster: '/images/video-thumbnails/new-city-gas-thumb.jpg', // Optional
    title: 'Live Set at New City Gas',
    description: 'Full performance from Montreal',
    venue: 'New City Gas',
    date: '2024',
  },
  {
    src: '/videos/performances/beachclub-set.mp4',
    poster: '/images/video-thumbnails/beachclub-thumb.jpg',
    title: 'Beachclub Performance',
    description: 'Summer set at Beachclub',
    venue: 'Beachclub',
    date: '2024',
  },
]
```

### Step 3: View Your Videos
- Main videos page: `/videos`
- Or add videos to venue pages (see below)

## Adding Videos to Venue Pages

To add videos to specific venue pages, update the venue page component to include videos from the videos config.

## Video Optimization Tips

### Compression Tools:
- **HandBrake** (free): Great for compressing videos
- **FFmpeg** (command line): Advanced compression
- **CloudConvert**: Online video compression

### Compression Settings:
- **Codec**: H.264
- **Bitrate**: 2-5 Mbps for 1080p
- **Frame Rate**: 30fps (or match source)
- **Audio**: AAC, 128kbps

### Example FFmpeg Command:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
```

## Performance Considerations

- Videos are loaded on-demand (not autoplay by default)
- Use poster images for faster initial page load
- Consider hosting large videos on YouTube/Vimeo and embedding instead
- For very large files (>50MB), consider external hosting

## Video Hosting Alternatives

For better performance with large videos, consider:
- **YouTube**: Embed videos (free, unlimited)
- **Vimeo**: Higher quality, embeddable
- **Cloudflare Stream**: Professional video hosting
- **AWS S3 + CloudFront**: Self-hosted solution

To embed YouTube/Vimeo, update the VideoPlayer component to support iframe embeds.
