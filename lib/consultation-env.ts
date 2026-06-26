/**
 * Consultation API configuration.
 *
 * The base URL and API key are both hardcoded in source. This project is a
 * static export (`output: 'export'`) with no server runtime, so any value
 * passed via `NEXT_PUBLIC_*` would end up in the JS bundle anyway. The key
 * is expected to be scoped to `create` only on `/api/inquiries` and
 * rate-limited upstream.
 *
 * To rotate: edit the constant below and redeploy.
 */

export const CONSULTATION_API_BASE = "https://consultation.clouisle.asia";
export const CONSULTATION_API_KEY =
  "1c369eff624bce67d8b4fb5468f8bf85bc7e4d45082df2432db44dba38a49068";

export interface ConsultationEnv {
  base: string;
  apiKey: string;
}

export function getConsultationEnv(): ConsultationEnv {
  return { base: CONSULTATION_API_BASE, apiKey: CONSULTATION_API_KEY };
}
