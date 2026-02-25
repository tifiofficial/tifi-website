// Video content configuration
export interface Video {
  src: string
  poster?: string // Thumbnail image path
  title: string
  description?: string
  venue?: string
  date?: string
}

export const videos: Video[] = [
  {
    src: '/videos/NCG REEL 1.mp4',
    title: 'New City Gas Performance',
    description: 'Live set from Montreal',
    venue: 'New City Gas',
    date: '2024',
  },
  {
    src: '/videos/NCG REEL 2.mp4',
    title: 'New City Gas Performance',
    venue: 'New City Gas',
  },
  {
    src: '/videos/NCG REEL 3.mp4',
    title: 'New City Gas Performance',
    venue: 'New City Gas',
  },
  {
    src: '/videos/NCG REEL 4 V2.mp4',
    title: 'New City Gas Performance',
    venue: 'New City Gas',
  },
  {
    src: '/videos/NCG REEL 5.mp4',
    title: 'New City Gas Performance',
    venue: 'New City Gas',
  },
  {
    src: '/videos/NCG REEL 6.mp4',
    title: 'New City Gas Performance',
    venue: 'New City Gas',
  },
  {
    src: '/videos/NCG REEL 7.mp4',
    title: 'New City Gas Performance',
    venue: 'New City Gas',
  },
  {
    src: '/videos/Beachclub 1.MOV',
    title: 'Beachclub Performance',
    venue: 'Beachclub',
  },
  {
    src: '/videos/Beachclub 2.MOV',
    title: 'Beachclub Performance',
    venue: 'Beachclub',
  },
  {
    src: '/videos/Beachclub 3.MOV',
    title: 'Beachclub Performance',
    venue: 'Beachclub',
  },
  {
    src: '/videos/Beachclub 4.MOV',
    title: 'Beachclub Performance',
    venue: 'Beachclub',
  },
  {
    src: '/videos/Beachclub 5.MOV',
    title: 'Beachclub Performance',
    venue: 'Beachclub',
  },
  {
    src: '/videos/Soluna 1.m4v',
    title: 'Soluna Performance',
    venue: 'Soluna',
  },
  {
    src: '/videos/Soluna 2.m4v',
    title: 'Soluna Performance',
    venue: 'Soluna',
  },
  {
    src: '/videos/Soluna 4.m4v',
    title: 'Soluna Performance',
    venue: 'Soluna',
  },
  {
    src: '/videos/Soluna 6.m4v',
    title: 'Soluna Performance',
    venue: 'Soluna',
  },
]

// Group videos by venue
export const videosByVenue: Record<string, Video[]> = {
  'New City Gas': videos.filter((v) => v.venue === 'New City Gas'),
  'Beachclub': videos.filter((v) => v.venue === 'Beachclub'),
  'Soluna': videos.filter((v) => v.venue === 'Soluna'),
}

// Hero video for landing page
// Note: URLs need to be encoded for spaces - Next.js handles this automatically
export const heroVideos = [
  '/videos/NCG REEL 11.mp4',
  '/videos/NCG REEL 10.mp4',
  '/videos/NCG REEL 9.mp4',
  '/videos/NCG REEL 8.mp4',
  '/videos/NCG REEL 7.mp4',
  '/videos/NCG REEL 3.mp4',
  '/videos/Beachclub 5.MOV',
  '/videos/Soluna 6.m4v',
  '/videos/Soluna 4.m4v',
  '/videos/TIK TOK 12 (1).MP4',
].filter(Boolean) // Remove any empty entries
