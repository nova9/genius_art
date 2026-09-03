export type ServiceIconType =
  | "digital-ai"
  | "cinema"
  | "design-3d"
  | "shop-3d";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: readonly string[];
  iconType: ServiceIconType;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  year: string;
  videoUrl: string;
}

export const services: readonly ServiceItem[] = [
  {
    id: "immersive-web",
    title: "AI Driven Brand Content",
    description:
      "AI-powered content that combines creativity, technology and audience insight across digital and traditional platforms.",
    features: [
      "AI-enabled production workflows",
      "Audience-aware creative development",
      "Digital and traditional formats",
    ],
    iconType: "digital-ai",
  },
  {
    id: "cinematic-reel",
    title: "Cinematic Brand Storytelling",
    description:
      "AI and cinematic production come together to create distinctive, memorable brand stories.",
    features: [
      "Brand-led storytelling",
      "Cinematic colour grading",
      "Cinematic audio",
    ],
    iconType: "cinema",
  },
  {
    id: "brand-architecture",
    title: "3D Designs for Exhibition Stalls",
    description:
      "Custom 3D exhibition concepts designed around brand visibility, visitor experience and practical execution.",
    features: [
      "Tailor-made stall concepts",
      "Immersive brand experiences",
      "Functional execution",
    ],
    iconType: "design-3d",
  },
  {
    id: "digital-marketing",
    title: "3D Designs for Shop Branding",
    description:
      "3D shop-branding concepts that turn retail spaces into clear, cohesive brand environments.",
    features: [
      "Strategic visual merchandising",
      "Brand-led spatial design",
      "Functional execution",
    ],
    iconType: "shop-3d",
  },
];

export const portfolio: readonly PortfolioItem[] = [
  {
    id: "electric-glass",
    title: "Dulux Celebrates The King of Pop",
    client: "Dulux",
    category: "Cinematic AI Reel",
    description: "Created for OOH, cinema and digital platforms.",
    image: "/portfolio/dulux.jpg",
    year: "2026",
    videoUrl: "https://www.youtube.com/watch?v=PyNOokoHS68",
  },
  {
    id: "cinematic-vortex",
    title: "Power Drive",
    client: "Janashakthi",
    category: "Cinematic AI Reel",
    description: "A motivational piece created for a conference introduction.",
    image: "/portfolio/janashakthi.jpg",
    year: "2026",
    videoUrl: "https://youtu.be/G5R4C02-exU",
  },
  {
    id: "mesh-horizon",
    title: "Mark Of A Super Star",
    client: "Dulux",
    category: "Cinematic AI Reel",
    description: "Created for use across digital platforms.",
    image: "/portfolio/dulux.jpg",
    year: "2026",
    videoUrl: "https://youtu.be/d_NP97sDhxg",
  },
];
