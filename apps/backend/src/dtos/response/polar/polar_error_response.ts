export class PolarErrorDetail {
  loc: string[];
  msg: string;
  type: string;
  input: unknown;
  ctx: Record<string, unknown>;
}

export class PolarErrorResponse {
  detail: PolarErrorDetail[];
}
