import type { Channel, PublishStatus, Status } from "./content";

export const PERMISSION_STATUSES = [
  "not_needed",
  "requested",
  "granted",
  "declined",
] as const;
export type PermissionStatus = (typeof PERMISSION_STATUSES)[number];

export const PERMISSION_LABELS: Record<PermissionStatus, string> = {
  not_needed: "Not needed",
  requested: "Asked, waiting",
  granted: "Granted",
  declined: "Declined",
};

export const ENGAGEMENT_KINDS = [
  "Comment",
  "DM",
  "Mention",
  "Tag",
  "Review",
] as const;
export type EngagementKind = (typeof ENGAGEMENT_KINDS)[number];

export const ENGAGEMENT_STATUSES = [
  "Needs reply",
  "Replied",
  "No reply needed",
] as const;
export type EngagementStatus = (typeof ENGAGEMENT_STATUSES)[number];

export type EngagementEntry = {
  id: string;
  platform: Channel;
  kind: EngagementKind;
  who: string | null;
  summary: string;
  link: string | null;
  post_id: string | null;
  status: EngagementStatus;
  handled_by: string | null;
  handled_at: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  channel: Channel;
  pillar: string;
  format: string | null;
  template: string | null;
  cta: string | null;
  owner: string | null;
  status: Status;
  post_date: string; // yyyy-mm-dd
  canva_link: string | null;
  caption: string | null;
  scheduled_at: string | null;
  publish_status: PublishStatus | null;
  platform_post_id: string | null;
  published_at: string | null;
  published_url: string | null;
  publish_error: string | null;
  notes: string | null;
  // link tracking
  link_url: string | null;
  tracked_url: string | null;
  // accessibility
  alt_text: string | null;
  // reshare permission trail
  is_reshare: boolean;
  permission_status: PermissionStatus;
  permission_source: string | null;
  permission_note: string | null;
  permission_recorded_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Template = {
  id: string;
  name: string;
  pillar: string;
  description: string | null;
  canva_url: string | null;
  sort_order: number;
};

export type Pillar = {
  name: string;
  color: string;
  description: string | null;
  sort_order: number | null;
};

/** Tokens are never selected client-side, see the RLS notes in the schema. */
export type SocialAccount = {
  id: string;
  platform: Channel;
  display_name: string | null;
  external_account_id: string | null;
  token_expires_at: string | null;
  connected_by: string | null;
  created_at: string;
};

export type PostMetric = {
  id: string;
  post_id: string;
  captured_at: string;
  impressions: number | null;
  reach: number | null;
  likes: number | null;
  comments: number | null;
  saves: number | null;
  shares: number | null;
  clicks: number | null;
};
