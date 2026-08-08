/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ServiceItem,
  PortfolioItem,
  TestimonialItem,
  ContactSubmission,
  LocalCacheStore,
} from "../types";

// Standard hydration datasets
const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "immersive-web",
    title: "AI DRIVEN BRAND CONTENT",
    shortDesc: "AI-crafted content for impactful brand storytelling",
    fullDesc:
      "AI-powered content that combines creativity, technology, and audience insights to create impactful brand experiences across digital and traditional platforms",
    features: [
      "Guaranteed cost efficiency",
      "Enhancing brand salience",
      "Guaranteed user engagement",
    ],
    iconType: "digital-ai",
    accentColor: "cyber-blue",
  },
  {
    id: "cinematic-reel",
    title: "Cinematic Brand Storytelling",
    shortDesc: "Bringing brands to life through powerful cinematic visuals",
    fullDesc:
      "Leveraging the power of AI and cinematic production, we create captivating brand stories that elevate perception, deepen engagement, and deliver memorable experiences",
    features: [
      "Enhances brand meaningfulness",
      "Cinematic colour grading",
      "Cinematic Audio",
    ],
    iconType: "cinema",
    accentColor: "electric-blue",
  },
  {
    id: "brand-architecture",
    title: "3d designs for exhibition stalls",
    shortDesc: "Custom-designed exhibition stalls built to engage audiences",
    fullDesc:
      "Custom 3D exhibition stall concepts designed to elevate brand visibility, enhance visitor engagement and create lasting impressions",
    features: [
      "Tailor-made exhibition stall designs",
      "Creating immersive brand experiences",
      "Functional execution",
    ],
    iconType: "design-3d",
    accentColor: "cyber-blue",
  },
  {
    id: "digital-marketing",
    title: "3d designs for shop branding",
    shortDesc:
      "Creating immersive retail spaces that strengthen brand identity",
    fullDesc:
      "We create innovative 3D shop branding concepts and designs that transform retail spaces into visually compelling brand environments, enhancing customer experience and strengthening brand identity",
    features: [
      "Strategic visual merchandising",
      "Brand-led spatial design",
      "Functional execution",
    ],
    iconType: "shop-3d",
    accentColor: "electric-blue",
  },
];

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "electric-glass",
    title: "Dulux Celebrates The King of Pop",
    client: "Dulux",
    category: "Cinematic AI Reel",
    description: "Used OOH, at Cinemas and Digital Platforms",
    deliverables: ["Used OOH", "at Cinemas", "Digital Platforms"],
    stats: {
      label: "Used OOH, at Cinemas and Digital Platforms",
      value: "360° Media",
    },
    image: "/portfolio/dulux.jpg",
    featured: true,
    year: "2026",
    accentColor: "#0066ff",
    videoUrl: "https://www.youtube.com/watch?v=PyNOokoHS68",
  },
  {
    id: "cinematic-vortex",
    title: "Power Drive",
    client: "Janashakthi",
    category: "Cinematic AI Reel",
    description: "Motivational piece for a conference intro",
    deliverables: [
      "4K Broadcast Video",
      "Micro-cut Ad Sequences",
      "OOH Curved Display Reel",
    ],
    stats: {
      label: "Ad Recall Uplift",
      value: "+42%",
    },
    image: "/portfolio/janashakthi.jpg",
    featured: true,
    year: "2026",
    accentColor: "#94a3b8",
    videoUrl: "https://youtu.be/G5R4C02-exU",
  },
  {
    id: "mesh-horizon",
    title: "Mark Of A Super Star",
    client: "Dulux",
    category: "Cinematic AI Reel",
    description: "Used in digital platforms during FIFA 2026",
    deliverables: [
      "Creative System Guidelines",
      "Dynamic Web Ads Set",
      "Interactive Investor Kit",
    ],
    stats: {
      label: "Direct Inbound Funnels",
      value: "18.2k+",
    },
    image: "/portfolio/dulux.jpg",
    featured: false,
    year: "2026",
    accentColor: "#334155",
    videoUrl: "https://youtu.be/d_NP97sDhxg",
  },
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    author: "Elena Vance",
    role: "VP of Innovative Design",
    company: "Omnicorp Global",
    quote:
      "Genius Art has revolutionized our product debuts. The metallic silver typography of our landing page perfectly echoes the physical design of our metal enclosures, boosting user curiosity by lightyears.",
    rating: 5,
    avatarSeed: "elena",
    year: "2026",
  },
  {
    id: "t2",
    author: "Marcuse Sterling",
    role: "Executive Brand Director",
    company: "Apex Dynamics",
    quote:
      "The loop video header and parallax transitions are intensely cinematic. Visitors consistently mention that browsing our portfolio feels like visiting a high-end arts pavilion. Exceptional design craft.",
    rating: 5,
    avatarSeed: "marcus",
    year: "2026",
  },
  {
    id: "t3",
    author: "Sophia Chen",
    role: "Principal Product Officer",
    company: "Lumina Labs",
    quote:
      "We chose their cyber-eye interactive advertising array, and our CTR rose immediately. When clients load the web offline, they can still view cached materials seamlessly because of their excellent offline storage framework.",
    rating: 5,
    avatarSeed: "sophia",
    year: "2025",
  },
];

const CACHE_KEY = "genius_art_local_cache";

/**
 * Ensures local storage has hydrated databases. Returns the current store.
 */
export function initializeCacheStore(): LocalCacheStore {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LocalCacheStore;
      // Validate structure matches
      if (
        parsed.services &&
        parsed.portfolio &&
        parsed.testimonials &&
        parsed.submissions
      ) {
        // Migrate old default video URL if present in settings
        if (parsed.settings) {
          if (
            parsed.settings.portalVideoUrl ===
            "https://youtu.be/PyNOokoHS68?si=ZwkTpXqXBr-N1OgH"
          ) {
            parsed.settings.portalVideoUrl =
              "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L";
          }
        } else {
          parsed.settings = {
            theme: "dark",
            cinematicVideoEnabled: true,
            portalVideoUrl: "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L",
          };
        }
        // Force update the title if it is stale in the existing local cache
        parsed.services = parsed.services.map((item) => {
          if (item.id === "immersive-web") {
            item.title = "AI DRIVEN BRAND CONTENT";
            item.shortDesc =
              "AI-crafted content for impactful brand storytelling";
            item.fullDesc =
              "AI-powered content that combines creativity, technology, and audience insights to create impactful brand experiences across digital and traditional platforms";
            item.features = [
              "Guaranteed cost efficiency",
              "Enhancing brand salience",
              "Guaranteed user engagement",
            ];
            item.metricLabel = undefined;
            item.metricValue = undefined;
            item.iconType = "digital-ai";
          }
          if (item.id === "cinematic-reel") {
            item.title = "Cinematic Brand Storytelling";
            item.shortDesc =
              "Bringing brands to life through powerful cinematic visuals";
            item.fullDesc =
              "Leveraging the power of AI and cinematic production, we create captivating brand stories that elevate perception, deepen engagement, and deliver memorable experiences";
            item.features = [
              "Enhances brand meaningfulness",
              "Cinematic colour grading",
              "Cinematic Audio",
            ];
            item.metricLabel = undefined;
            item.metricValue = undefined;
            item.iconType = "cinema";
          }
          if (item.id === "brand-architecture") {
            item.title = "3d designs for exhibition stalls";
            item.shortDesc =
              "Custom-designed exhibition stalls built to engage audiences";
            item.fullDesc =
              "Custom 3D exhibition stall concepts designed to elevate brand visibility, enhance visitor engagement and create lasting impressions";
            item.iconType = "design-3d";
            item.metricLabel = undefined;
            item.metricValue = undefined;
            item.features = [
              "Tailor-made exhibition stall designs",
              "Creating immersive brand experiences",
              "Functional execution",
            ];
          }
          if (item.id === "digital-marketing") {
            item.title = "3d designs for shop branding";
            item.shortDesc =
              "Creating immersive retail spaces that strengthen brand identity";
            item.fullDesc =
              "We create innovative 3D shop branding concepts and designs that transform retail spaces into visually compelling brand environments, enhancing customer experience and strengthening brand identity";
            item.iconType = "shop-3d";
            item.metricLabel = undefined;
            item.metricValue = undefined;
            item.features = [
              "Strategic visual merchandising",
              "Brand-led spatial design",
              "Functional execution",
            ];
          }
          return item;
        });
        parsed.portfolio = parsed.portfolio
          .filter((item) => item.id !== "cyber-eye-v1")
          .map((item) => {
            if (item.id === "electric-glass") {
              item.category = "Cinematic AI Reel";
              item.client = "Dulux";
              item.title = "Dulux Celebrates The King of Pop";
              item.image = "/portfolio/dulux.jpg";
              item.description = "Used OOH, at Cinemas and Digital Platforms";
              item.deliverables = [
                "Used OOH",
                "at Cinemas",
                "Digital Platforms",
              ];
              item.stats = {
                label: "Used OOH, at Cinemas and Digital Platforms",
                value: "360° Media",
              };
              item.videoUrl = "https://www.youtube.com/watch?v=PyNOokoHS68";
            }
            if (item.id === "cinematic-vortex") {
              item.client = "Janashakthi";
              item.title = "Power Drive";
              item.category = "Cinematic AI Reel";
              item.description = "Motivational piece for a conference intro";
              item.image = "/portfolio/janashakthi.jpg";
              item.year = "2026";
              item.videoUrl = "https://youtu.be/G5R4C02-exU";
            }
            if (item.id === "mesh-horizon") {
              item.client = "Dulux";
              item.title = "Mark Of A Super Star";
              item.category = "Cinematic AI Reel";
              item.year = "2026";
              item.description = "Used in digital platforms during FIFA 2026";
              item.image = "/portfolio/dulux.jpg";
              item.videoUrl = "https://youtu.be/d_NP97sDhxg";
            }
            return item;
          });
        return parsed as LocalCacheStore;
      }
    }
  } catch (e) {
    console.warn("Storage failed or parsing issue, recreating store.", e);
  }

  // Hydrate defaults
  const defaultStore: LocalCacheStore = {
    services: DEFAULT_SERVICES,
    portfolio: DEFAULT_PORTFOLIO,
    testimonials: DEFAULT_TESTIMONIALS,
    submissions: [],
    settings: {
      theme: "dark",
      cinematicVideoEnabled: true,
      portalVideoUrl: "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L",
    },
  };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(defaultStore));
  } catch (err) {
    console.error("Storage write error", err);
  }

  return defaultStore;
}

/**
 * Updates the cache store safely
 */
export function saveCacheStore(store: LocalCacheStore): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error("Failed to commit store to local cache", e);
  }
}

/**
 * Saves a new offline-ready contact submission
 */
export function addContactSubmission(
  submission: Omit<ContactSubmission, "id" | "timestamp" | "status">,
): ContactSubmission {
  const store = initializeCacheStore();

  // Decide whether online or simulated offline
  const isSimulatedOffline =
    localStorage.getItem("simulated_offline_mode") === "true";
  const status = isSimulatedOffline ? "cached" : "synced";

  const newSubmission: ContactSubmission = {
    ...submission,
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    status,
  };

  store.submissions = [newSubmission, ...store.submissions];
  saveCacheStore(store);

  // Trigger simulated console action
  console.log(
    `[Offline Caching Engine] Form submitted. Saved as ${status} in database.`,
    newSubmission,
  );

  return newSubmission;
}

/**
 * Triggers a sync of all cached submissions (simulating online restoration)
 */
export function syncSubmissions(): number {
  const store = initializeCacheStore();
  let syncCount = 0;

  store.submissions = store.submissions.map((sub) => {
    if (sub.status === "cached") {
      syncCount++;
      return { ...sub, status: "synced" as const };
    }
    return sub;
  });

  if (syncCount > 0) {
    saveCacheStore(store);
  }

  return syncCount;
}

/**
 * Get cached submissions
 */
export function getSubmissions(): ContactSubmission[] {
  const store = initializeCacheStore();
  return store.submissions;
}
