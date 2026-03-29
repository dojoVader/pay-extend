export class PolarDiscountProduct {
  metadata: Record<string, unknown>;
  id: string;
  created_at: string;
  modified_at: string | null;
  trial_interval: 'day' | 'week' | 'month' | 'year' | null;
  trial_interval_count: number | null;
  name: string;
  description: string | null;
  visibility: 'draft' | 'public' | 'hidden';
  recurring_interval: 'day' | 'week' | 'month' | 'year' | null;
  recurring_interval_count: number | null;
  is_recurring: boolean;
  is_archived: boolean;
  organization_id: string;
}

export class PolarDiscountCreateResponse {
  id: string;
  name: string;
  code: string | null;
  duration: 'once' | 'repeating' | 'forever';
  type: 'fixed' | 'percentage';
  amount: number;
  currency: string | null;
  amounts: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  modified_at: string | null;
  starts_at: string | null;
  ends_at: string | null;
  max_redemptions: number | null;
  redemptions_count: number;
  organization_id: string;
  products: PolarDiscountProduct[];
}
