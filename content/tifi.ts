export type VenueRegion = 'Toronto' | 'Montreal' | 'International'

export interface TifiStat {
  label: string
  value: number
  suffix?: string
}

export interface TifiVenue {
  name: string
  city: string
  region: VenueRegion
}

export interface TifiCatalogItem {
  title: string
  artists: string
  streams: number
  type: 'mashup' | 'remix' | 'original'
  note?: string
  link?: string
}

export interface TifiEmbed {
  id: 'spotify' | 'soundcloud' | 'youtube'
  label: string
  embedUrl: string
  externalUrl: string
}

export interface TifiContent {
  brand: {
    name: string
    tagline: string
    location: string
    genre: string
    soundDescription: string
    description: string
  }
  about: {
    summary: string
    descriptors: string[]
  }
  stats: {
    asOf: string
    items: TifiStat[]
    label: string
    spotifyStreams: number
    soundcloudStreams: number
    instagramFollowers: number
    tiktokViews: number
  }
  venues: TifiVenue[]
  support: string[]
  sharedStageWith: string[]
  catalog: TifiCatalogItem[]
  socials: {
    instagram: string
    spotify: string
    soundcloud: string
    youtube: string
  }
  embeds: TifiEmbed[]
  contact: {
    bookingEmail: string
    managementEmail: string
  }
  epk: {
    publicPdfPath: string
  }
  extractionNotes: {
    sourceFile: string
    status: 'pending_source_pdf' | 'extracted'
    fieldsMapped: string[]
  }
}

export const tifiContent: TifiContent = {
  brand: {
    name: 'TIFI',
    tagline: 'Producer / DJ',
    location: 'Toronto, Ontario',
    genre: 'Afro-Melodic / Indie Soul',
    soundDescription:
      'International DJ and producer crafting timeless music for elevated spaces, blending Melodic Afro House and Indie-Dance Soul.',
    description:
      'His sound lives between nostalgia and forward motion, with an identity defined by taste, atmosphere, and elevated experience.',
  },
  about: {
    summary:
      'TIFI is an international DJ and producer crafting timeless music for elevated spaces. Blending Melodic Afro House and Indie-Dance Soul, his sound lives somewhere between nostalgia and forward motion. His identity extends beyond music, defined by taste, atmosphere, and elevated experience. An upcoming EP featuring major collaborations signals the next chapter in his evolution: bold, intentional, and built to last. Stay tuned as TIFI takes his vision worldwide.',
    descriptors: [
      'timeless',
      'melodic',
      'afro house',
      'indie-dance soul',
      'nostalgia + forward motion',
      'elevated experience',
    ],
  },
  stats: {
    asOf: 'As of 2026',
    items: [
      { label: 'SoundCloud Streams', value: 700_000 },
      { label: 'Instagram Followers', value: 3_800 },
      { label: 'TikTok Views', value: 3_000_000 },
    ],
    label: 'As of 2026',
    spotifyStreams: 0,
    soundcloudStreams: 700_000,
    instagramFollowers: 3_800,
    tiktokViews: 3_000_000,
  },
  venues: [
    { name: 'NOMAD', city: 'Toronto', region: 'Toronto' },
    { name: 'Mister Wolf', city: 'Toronto', region: 'Toronto' },
    { name: 'Lost and Found', city: 'Toronto', region: 'Toronto' },
    { name: 'Century', city: 'Toronto', region: 'Toronto' },
    { name: 'Kissa', city: 'Toronto', region: 'Toronto' },
    { name: 'DPRTMNT', city: 'Toronto', region: 'Toronto' },
    { name: 'Deer Lady', city: 'Toronto', region: 'Toronto' },
    { name: 'Cabana Pool Bar', city: 'Toronto', region: 'Toronto' },
    { name: 'Pearl', city: 'Toronto', region: 'Toronto' },
    { name: 'Liberty Grand', city: 'Toronto', region: 'Toronto' },
    { name: 'Soluna', city: 'Toronto', region: 'Toronto' },
    { name: 'Pizza Wine Disco', city: 'Toronto', region: 'Toronto' },
    { name: 'Stillife', city: 'Montreal', region: 'Montreal' },
    { name: 'Soubois', city: 'Montreal', region: 'Montreal' },
    { name: 'New City Gas', city: 'Montreal', region: 'Montreal' },
    { name: 'London Music Hall', city: 'London, ON', region: 'International' },
    { name: "Delilah's", city: 'London, ON', region: 'International' },
    { name: 'Lost Love', city: 'London, ON', region: 'International' },
    { name: 'Tabu', city: 'London, ON', region: 'International' },
    { name: 'Beachclub', city: 'Pointe-Calumet', region: 'International' },
    { name: 'La Petite Plage', city: 'St. Barths', region: 'International' },
    { name: 'Mona Lisa', city: 'Miami', region: 'International' },
    { name: 'Mynt', city: 'Miami', region: 'International' },
  ],
  support: ['Francis Mercier', 'Sparrow & Barbossa', 'Chris IDH', 'Magnifik'],
  sharedStageWith: ['Gordo', 'Fisher', 'Elderbrook', 'Francis Mercier', 'Loud Luxury'],
  catalog: [
    {
      title: 'Fall For You',
      artists: 'Deeproot Records',
      streams: 0,
      type: 'original',
      note: 'On Deeproot Records',
      link: 'https://open.spotify.com/track/1NZrLNZP6KmPnpEjcI7089?si=713d847172314df0',
    },
    {
      title: 'All I Need',
      artists: 'Klub Record',
      streams: 0,
      type: 'original',
      note: 'On Klub Record',
      link: 'https://open.spotify.com/track/5yh1aT2FLapFm70els0F3E?si=658e118a31974900',
    },
  ],
  socials: {
    instagram: 'https://www.instagram.com/tifiofc/',
    spotify: 'https://open.spotify.com/artist/4L8fJ5OPgCKDm19iNjVk7U?si=NPUKAWjUTq6aMvngG1co-g',
    soundcloud: 'https://soundcloud.com/matthew-latifi',
    youtube: 'https://www.youtube.com/watch?v=ArdzKHcUeWM',
  },
  embeds: [
    {
      id: 'spotify',
      label: 'Spotify',
      embedUrl: 'https://open.spotify.com/embed/artist/4L8fJ5OPgCKDm19iNjVk7U',
      externalUrl: 'https://open.spotify.com/artist/4L8fJ5OPgCKDm19iNjVk7U?si=NPUKAWjUTq6aMvngG1co-g',
    },
    {
      id: 'soundcloud',
      label: 'SoundCloud',
      embedUrl: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/matthew-latifi',
      externalUrl: 'https://soundcloud.com/matthew-latifi',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      embedUrl: 'https://www.youtube.com/embed/ArdzKHcUeWM',
      externalUrl: 'https://www.youtube.com/watch?v=ArdzKHcUeWM',
    },
  ],
  contact: {
    bookingEmail: 'booking@tifi.com',
    managementEmail: 'management@tifi.com',
  },
  epk: {
    publicPdfPath: '/epk/tifi-epk.pdf',
  },
  extractionNotes: {
    sourceFile: './TIFI EPK-2.pdf',
    status: 'extracted',
    fieldsMapped: [
      'Name',
      'Location',
      'Genre / sound description',
      'Stats (streams / followers / views + as-of label)',
      'Performed venues',
      'Supported-by list',
      'Best-performing catalog',
      'Social links from PDF annotations',
      'Contact + socials + embeds',
    ],
  },
}
