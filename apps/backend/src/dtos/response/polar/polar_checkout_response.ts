export class PolarPrice {
  created_at: string;
  modified_at: string;
  id: string;
  source: string;
  amount_type: string;
  price_currency: string;
  is_archived: boolean;
  product_id: string;
  type: string;
  recurring_interval: string;
  price_amount: number;
  legacy: boolean;
}

export class PolarBenefit {
  id: string;
  created_at: string;
  modified_at: string;
  type: string;
  description: string;
  selectable: boolean;
  deletable: boolean;
  organization_id: string;
}

export class PolarMedia {
  id: string;
  organization_id: string;
  name: string;
  path: string;
  mime_type: string;
  size: number;
  storage_version: string;
  checksum_etag: string;
  checksum_sha256_base64: string;
  checksum_sha256_hex: string;
  last_modified_at: string;
  version: string;
  service: string;
  is_uploaded: boolean;
  created_at: string;
  size_readable: string;
  public_url: string;
}

export class PolarProduct {
  metadata: Record<string, unknown>;
  id: string;
  created_at: string;
  modified_at: string;
  trial_interval: string;
  trial_interval_count: number;
  name: string;
  description: string;
  visibility: string;
  recurring_interval: string;
  recurring_interval_count: number;
  is_recurring: boolean;
  is_archived: boolean;
  organization_id: string;
  prices: PolarPrice[];
  benefits: PolarBenefit[];
  medias: PolarMedia[];
}

export class PolarDiscount {
  duration: string;
  type: string;
  amount: number;
  currency: string;
  amounts: Record<string, unknown>;
  created_at: string;
  modified_at: string;
  id: string;
  metadata: Record<string, unknown>;
  name: string;
  code: string;
  starts_at: string;
  ends_at: string;
  max_redemptions: number;
  redemptions_count: number;
  organization_id: string;
}

export class Polar_checkout_response {
  id: string;
  created_at: string;
  modified_at: string;
  trial_interval: string;
  trial_interval_count: number;
  metadata: Record<string, unknown>;
  payment_processor: string;
  client_secret: string;
  success_url: string;
  return_url: string;
  label: string;
  allow_discount_codes: boolean;
  require_billing_address: boolean;
  discount_id: string;
  organization_id: string;
  products: PolarProduct[];
  discount: PolarDiscount;
  url: string;
}
