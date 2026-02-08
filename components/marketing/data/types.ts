import type { LucideIcon } from 'lucide-react';

export type Locale = 'en' | 'zh';

export interface MarketingHomePageProps {
  lang: string;
}

export interface Capability {
  title: string;
  description: string;
  highlights: string[];
  tag: string;
  icon: LucideIcon;
  previewTitle: string;
  previewMeta: string;
  previewMetric: string;
  previewTone: 'cyan' | 'violet' | 'emerald';
  previewImage?: string | string[];
  previewImageAlt?: string | string[];
}

export interface UseCase {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export type ArchitectureNodeKey = 'frontend' | 'backend' | 'vector' | 'pgsql' | 'worker' | 'scheduler';
export type ArchitectureScaleTarget = 'vector' | 'worker';

export interface ArchitectureNode {
  key: ArchitectureNodeKey;
  title: string;
  subtitle: string;
  meta: string;
  expansion: string;
}

export interface ArchitectureScaleNode {
  id: string;
  target: ArchitectureScaleTarget;
  title: string;
  detail: string;
  variant?: 'default' | 'add';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface RagMode {
  badge: string;
  title: string;
  summary: string;
  points: string[];
  image?: string;
  imageAlt?: string;
}

export interface Advantage {
  title: string;
  description: string;
  proof: string;
}

export interface DeliveryStep {
  title: string;
  detail: string;
}

export interface CopyData {
  badge: string;
  title: string;
  titleSub: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  heroImage?: string;
  heroImageAlt?: string;
  stats: StatItem[];
  trustLine: string;
  whyTitle: string;
  whyBody: string;
  whyPoints: string[];
  capabilitiesTitle: string;
  capabilitiesLead: string;
  ragEyebrow: string;
  ragTitle: string;
  ragSubtitle: string;
  ragModes: RagMode[];
  advantagesTitle: string;
  advantagesSubtitle: string;
  advantagesEyebrow: string;
  advantages: Advantage[];
  deliveryTitle: string;
  deliverySubtitle: string;
  deliverySteps: DeliveryStep[];
  architectureTitle: string;
  architectureBody: string;
  architectureEyebrow: string;
  architectureNodes: ArchitectureNode[];
  architectureScaleNodes: ArchitectureScaleNode[];
  securityTitle: string;
  securityEyebrow: string;
  securityItems: string[];
  useCaseTitle: string;
  useCaseEyebrow: string;
  roadmapTitle: string;
  roadmapNow: string;
  roadmapNext: string;
  finalTitle: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
}
