import {
  Briefcase, Heart, Users, Shield, Scale, BookOpen, Award, FileText,
  Building2, Globe2, Gavel, Landmark, FileSignature, HandCoins,
  ShieldCheck, Baby, HeartHandshake, Stethoscope, Home, Handshake,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Registry of icons selectable from the admin panel.
// Keep keys stable — they are persisted in localStorage.
export const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  Heart,
  Users,
  Shield,
  Scale,
  BookOpen,
  Award,
  FileText,
  Building2,
  Globe2,
  Gavel,
  Landmark,
  FileSignature,
  HandCoins,
  ShieldCheck,
  Baby,
  HeartHandshake,
  Stethoscope,
  Home,
  Handshake,
};

export type IconName = keyof typeof ICONS;

export function getIcon(name: string): LucideIcon {
  return ICONS[name] || Scale;
}

export const ICON_NAMES = Object.keys(ICONS) as IconName[];
