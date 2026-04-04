export class PolarBenefitProperties {
  note: string | null;
}

export class PolarBenefitResponse {
  id: string;
  created_at: string;
  modified_at: string | null;
  type: string;
  description: string;
  selectable: boolean;
  deletable: boolean;
  organization_id: string;
  metadata: Record<string, unknown>;
  properties: PolarBenefitProperties;
}
