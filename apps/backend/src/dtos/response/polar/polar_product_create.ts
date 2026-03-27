export class PolarProductPrice {
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

export class PolarBenefitProperties {
  note: string;
}

export class PolarProductBenefit {
  id: string;
  created_at: string;
  modified_at: string;
  type: string;
  description: string;
  selectable: boolean;
  deletable: boolean;
  organization_id: string;
  metadata: Record<string, unknown>;
  properties: PolarBenefitProperties;
}

export class PolarProductMedia {
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

export class CustomFieldProperties {
  form_label: string;
  form_help_text: string;
  form_placeholder: string;
  textarea: boolean;
  min_length: number;
  max_length: number;
}

export class PolarCustomField {
  created_at: string;
  modified_at: string;
  id: string;
  metadata: Record<string, unknown>;
  type: string;
  slug: string;
  name: string;
  organization_id: string;
  properties: CustomFieldProperties;
}

export class PolarAttachedCustomField {
  custom_field_id: string;
  custom_field: PolarCustomField;
  order: number;
  required: boolean;
}

export class PolarProductCreateResponse {
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
  metadata: Record<string, unknown>;
  prices: PolarProductPrice[];
  benefits: PolarProductBenefit[];
  medias: PolarProductMedia[];
  attached_custom_fields: PolarAttachedCustomField[];
}
