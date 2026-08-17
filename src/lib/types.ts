import type { Channel, PublishStatus, Status } from "./content";

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

/** Tokens are never selected client-side — see the RLS notes in the schema. */
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
