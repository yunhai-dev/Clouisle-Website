/**
 * Consultation API client + validation.
 *
 * - Types and helpers are browser-safe (no Node imports).
 * - `validateInquiry` is a pure function so it can be unit-tested in isolation.
 * - `submitInquiry` never throws — it always returns a `SubmitResult`.
 */

import { getConsultationEnv } from './consultation-env';

export interface Inquiry {
  id: number;
  appellation: string;
  content: string;
  contact: string;
  company: string;
  contacted: 0 | 1;
  created_at: number;
  updated_at: number;
}

export type CreateInquiryPayload = Pick<
  Inquiry,
  'appellation' | 'content' | 'contact' | 'company'
>;

export type InquiryErrorCode =
  | 'INVALID_BODY'
  | 'INVALID_API_KEY'
  | 'MISSING_API_KEY'
  | 'NOT_FOUND'
  | 'NETWORK'
  | 'INTERNAL_ERROR';

export interface InquiryError {
  code: InquiryErrorCode;
  message: string;
}

export type SubmitResult =
  | { ok: true; data: Inquiry }
  | { ok: false; error: InquiryError };

export type InquiryFieldErrors = {
  [K in keyof CreateInquiryPayload]?: string;
};

// Mirrors the server-side validation rules in the API spec.
const PHONE_RE = /^1[3-9]\d{9}$/;
const WECHAT_RE = /^[\w.-]{6,}$/;

function isPhone(value: string): boolean {
  return PHONE_RE.test(value);
}

function isWechat(value: string): boolean {
  return WECHAT_RE.test(value);
}

export function validateInquiry(
  values: CreateInquiryPayload
): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};

  const appellation = values.appellation.trim();
  if (!appellation) {
    errors.appellation = 'Please enter your name';
  } else if (appellation.length > 64) {
    errors.appellation = 'Name must be 64 characters or fewer';
  }

  const content = values.content.trim();
  if (!content) {
    errors.content = 'Please describe your inquiry';
  } else if (content.length > 2000) {
    errors.content = 'Inquiry must be 2000 characters or fewer';
  }

  const contact = values.contact.trim();
  if (!contact) {
    errors.contact = 'Please enter a phone number or WeChat ID';
  } else if (contact.length > 64 || (!isPhone(contact) && !isWechat(contact))) {
    errors.contact =
      'Enter a valid phone number (1[3-9]xxxxxxxxx) or WeChat ID (6+ characters)';
  }

  const company = values.company.trim();
  if (!company) {
    errors.company = 'Please enter your company name';
  } else if (company.length > 128) {
    errors.company = 'Company name must be 128 characters or fewer';
  }

  return errors;
}

export function hasFieldErrors(errors: InquiryFieldErrors): boolean {
  return Object.values(errors).some(Boolean);
}

interface SubmitArgs {
  payload: CreateInquiryPayload;
  honeypot: string;
}

export async function submitInquiry({
  payload,
  honeypot,
}: SubmitArgs): Promise<SubmitResult> {
  // Honeypot trap: a real user never fills this. Silently short-circuit
  // as a network error to avoid signalling that we detected a bot.
  if (honeypot.trim().length > 0) {
    return { ok: false, error: { code: 'NETWORK', message: '' } };
  }

  const env = getConsultationEnv();

  const trimmed: CreateInquiryPayload = {
    appellation: payload.appellation.trim(),
    content: payload.content.trim(),
    contact: payload.contact.trim(),
    company: payload.company.trim(),
  };

  try {
    const response = await fetch(`${env.base}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': env.apiKey,
      },
      body: JSON.stringify(trimmed),
    });

    if (response.status === 201) {
      const json = (await response.json()) as { data: Inquiry };
      return { ok: true, data: json.data };
    }

    // Non-2xx: try to parse the unified error envelope.
    let code: InquiryErrorCode = 'INTERNAL_ERROR';
    let message = '';

    try {
      const body = (await response.json()) as {
        error?: { code?: string; message?: string };
      };
      if (body?.error?.code) {
        code = normaliseErrorCode(body.error.code);
      }
      message = body?.error?.message ?? '';
    } catch {
      // Body wasn't JSON; fall through with empty message.
    }

    if (response.status >= 500) {
      code = 'INTERNAL_ERROR';
    } else if (!message) {
      message = `Request failed with status ${response.status}`;
    }

    return { ok: false, error: { code, message } };
  } catch {
    return {
      ok: false,
      error: { code: 'NETWORK', message: '' },
    };
  }
}

function normaliseErrorCode(raw: string): InquiryErrorCode {
  switch (raw) {
    case 'INVALID_BODY':
    case 'INVALID_QUERY':
    case 'INVALID_ID':
      return 'INVALID_BODY';
    case 'INVALID_API_KEY':
    case 'MISSING_API_KEY':
      return 'INVALID_API_KEY';
    case 'NOT_FOUND':
      return 'NOT_FOUND';
    case 'INTERNAL_ERROR':
      return 'INTERNAL_ERROR';
    default:
      return 'INTERNAL_ERROR';
  }
}
