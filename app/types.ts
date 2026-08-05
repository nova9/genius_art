/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  metricLabel?: string;
  metricValue?: string;
  iconType: "eye-g" | "glass-t" | "chrome-aperture" | "glowing-layers" | "sparkles" | "digital-ai" | "cinema" | "design-3d" | "shop-3d";
  accentColor: string; // hex or tailwind class
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: "Digital Campaign" | "Cinematic Reel" | "Brand Identity" | "Immersive 3D" | "Social Impact" | "Cinematic AI Reel";
  description: string;
  deliverables: string[];
  stats: {
    label: string;
    value: string;
  };
  image: string;
  featured: boolean;
  year: string;
  accentColor: string;
  videoUrl?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatarSeed: string; // Used to generate unique identifiable avatars
  year: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  serviceId: string;
  message: string;
  timestamp: string;
  status: "cached" | "synced";
}

export interface LocalCacheStore {
  testimonials: TestimonialItem[];
  portfolio: PortfolioItem[];
  services: ServiceItem[];
  submissions: ContactSubmission[];
  settings: {
    theme: "light" | "dark";
    cinematicVideoEnabled: boolean;
    portalVideoUrl?: string;
  };
}
