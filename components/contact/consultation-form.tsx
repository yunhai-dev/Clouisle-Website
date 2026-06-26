"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  hasFieldErrors,
  submitInquiry,
  validateInquiry,
  type CreateInquiryPayload,
  type InquiryErrorCode,
  type InquiryFieldErrors,
} from "@/lib/consultation-api";
import type { ContactCopy } from "@/lib/seo";

interface ConsultationFormProps {
  copy: ContactCopy["form"];
  lang: "en" | "zh";
}

type Status = "idle" | "submitting" | "success" | "error";

interface BannerError {
  code: InquiryErrorCode;
  prefix: string;
  raw: string;
  rawLang: "zh" | "en";
}

type TouchedMap = { [K in keyof CreateInquiryPayload]?: boolean };

const COOLDOWN_MS = 30_000;
const STORAGE_KEY = "clouisle.contact.lastSubmitAt";

const CJK_RE = /[㐀-鿿]/;

const EMPTY_VALUES: CreateInquiryPayload = {
  appellation: "",
  content: "",
  contact: "",
  company: "",
};

export function ConsultationForm({ copy, lang }: ConsultationFormProps) {
  const [values, setValues] = useState<CreateInquiryPayload>(EMPTY_VALUES);
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [touched, setTouched] = useState<TouchedMap>({});
  const [status, setStatus] = useState<Status>(() => readInitialStatus());
  const [banner, setBanner] = useState<BannerError | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(() =>
    readInitialCooldown()
  );

  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cooldown ticker: shows the "you can submit again in Ns" countdown.
  useEffect(() => {
    cooldownTimer.current = setInterval(() => {
      const next = readCurrentCooldown();
      setCooldownRemaining(next);
      if (next <= 0 && cooldownTimer.current) {
        clearInterval(cooldownTimer.current);
        cooldownTimer.current = null;
      }
    }, 1000);

    return () => {
      if (cooldownTimer.current) {
        clearInterval(cooldownTimer.current);
        cooldownTimer.current = null;
      }
    };
  }, []);

  function updateField<K extends keyof CreateInquiryPayload>(
    key: K,
    value: CreateInquiryPayload[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear the field error as soon as the user types.
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (banner) setBanner(null);
  }

  function handleBlur(field: keyof CreateInquiryPayload) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const all = validateInquiry(values);
    setErrors((prev) => {
      const next = { ...prev };
      if (all[field]) next[field] = all[field];
      else delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const allErrors = validateInquiry(values);
    if (hasFieldErrors(allErrors)) {
      setErrors(allErrors);
      setTouched({ appellation: true, content: true, contact: true, company: true });
      return;
    }

    // If a cooldown is in effect, surface it as a banner and bail.
    if (cooldownRemaining > 0) {
      setBanner({
        code: "NETWORK",
        prefix: "",
        raw: copy.cooldown.replace("{seconds}", String(cooldownRemaining)),
        rawLang: lang,
      });
      return;
    }

    setStatus("submitting");
    setBanner(null);

    const result = await submitInquiry({ payload: values, honeypot });

    if (result.ok) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      }
      setStatus("success");
      setCooldownRemaining(Math.ceil(COOLDOWN_MS / 1000));
      setValues(EMPTY_VALUES);
      setTouched({});
      setErrors({});
      return;
    }

    setStatus("error");
    setBanner(buildBannerError(result.error, copy));
  }

  function handleSendAnother() {
    if (cooldownRemaining > 0) return;
    setStatus("idle");
    setBanner(null);
  }

  if (status === "success") {
    const cooldownText = cooldownRemaining > 0
      ? copy.cooldown.replace("{seconds}", String(cooldownRemaining))
      : "";

    return (
      <div className="cl-form-success" role="status" aria-live="polite">
        <span className="cl-form-success-icon" aria-hidden="true">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <p className="cl-form-success-title">{copy.success}</p>
        <p className="cl-form-success-hint">{copy.successHint}</p>
        <Button
          type="button"
          variant="outline"
          onClick={handleSendAnother}
          disabled={cooldownRemaining > 0}
          className="mt-2"
        >
          {cooldownRemaining > 0 ? cooldownText : copy.sendAnother}
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="cl-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: real users never fill this. Naive bots do. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="clouisle-contact-website">Website</label>
        <input
          id="clouisle-contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {banner && (
        <div className="cl-form-error-banner" role="alert">
          {banner.prefix && <span>{banner.prefix}</span>}
          <span lang={banner.rawLang === "zh" ? "zh-CN" : "en"}>{banner.raw}</span>
        </div>
      )}

      <div className="cl-form-field">
        <Label htmlFor="inquiry-appellation">{copy.appellationLabel}</Label>
        <Input
          id="inquiry-appellation"
          name="appellation"
          value={values.appellation}
          onChange={(e) => updateField("appellation", e.target.value)}
          onBlur={() => handleBlur("appellation")}
          aria-invalid={touched.appellation && !!errors.appellation}
          aria-describedby={
            touched.appellation && errors.appellation
              ? "inquiry-appellation-error"
              : undefined
          }
          placeholder={copy.appellationPlaceholder}
          maxLength={64}
          autoComplete="name"
          disabled={submitting}
        />
        {touched.appellation && errors.appellation && (
          <p id="inquiry-appellation-error" className="cl-form-error">
            {errors.appellation}
          </p>
        )}
      </div>

      <div className="cl-form-field">
        <Label htmlFor="inquiry-content">{copy.contentLabel}</Label>
        <Textarea
          id="inquiry-content"
          name="content"
          value={values.content}
          onChange={(e) => updateField("content", e.target.value)}
          onBlur={() => handleBlur("content")}
          aria-invalid={touched.content && !!errors.content}
          aria-describedby={
            touched.content && errors.content ? "inquiry-content-error" : undefined
          }
          placeholder={copy.contentPlaceholder}
          maxLength={2000}
          rows={5}
          disabled={submitting}
        />
        {touched.content && errors.content && (
          <p id="inquiry-content-error" className="cl-form-error">
            {errors.content}
          </p>
        )}
      </div>

      <div className="cl-form-field">
        <Label htmlFor="inquiry-contact">{copy.contactLabel}</Label>
        <Input
          id="inquiry-contact"
          name="contact"
          value={values.contact}
          onChange={(e) => updateField("contact", e.target.value)}
          onBlur={() => handleBlur("contact")}
          aria-invalid={touched.contact && !!errors.contact}
          aria-describedby={
            touched.contact && errors.contact ? "inquiry-contact-error" : undefined
          }
          placeholder={copy.contactPlaceholder}
          maxLength={64}
          autoComplete="off"
          inputMode="text"
          disabled={submitting}
        />
        {touched.contact && errors.contact && (
          <p id="inquiry-contact-error" className="cl-form-error">
            {errors.contact}
          </p>
        )}
      </div>

      <div className="cl-form-field">
        <Label htmlFor="inquiry-company">{copy.companyLabel}</Label>
        <Input
          id="inquiry-company"
          name="company"
          value={values.company}
          onChange={(e) => updateField("company", e.target.value)}
          onBlur={() => handleBlur("company")}
          aria-invalid={touched.company && !!errors.company}
          aria-describedby={
            touched.company && errors.company ? "inquiry-company-error" : undefined
          }
          placeholder={copy.companyPlaceholder}
          maxLength={128}
          autoComplete="organization"
          disabled={submitting}
        />
        {touched.company && errors.company && (
          <p id="inquiry-company-error" className="cl-form-error">
            {errors.company}
          </p>
        )}
      </div>

      <div className="cl-form-submit-row">
        <Button
          type="submit"
          className="cl-btn-primary cl-form-submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {copy.submitting}
            </>
          ) : (
            copy.submit
          )}
        </Button>
      </div>
    </form>
  );
}

function readRemainingSeconds(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return 0;
  const ts = Number.parseInt(raw, 10);
  if (!Number.isFinite(ts)) return 0;
  const remaining = Math.ceil((ts + COOLDOWN_MS - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
}

function readInitialStatus(): Status {
  return readRemainingSeconds() > 0 ? "success" : "idle";
}

function readInitialCooldown(): number {
  return readRemainingSeconds();
}

function readCurrentCooldown(): number {
  return readRemainingSeconds();
}

function buildBannerError(
  error: { code: InquiryErrorCode; message: string },
  copy: ContactCopy["form"]
): BannerError {
  const raw = error.message?.trim() ?? "";
  if (!raw) {
    if (error.code === "NETWORK") {
      return { code: error.code, prefix: "", raw: copy.errorNetwork, rawLang: "en" };
    }
    return { code: error.code, prefix: "", raw: copy.errorGeneric, rawLang: "en" };
  }
  const rawLang: "zh" | "en" = CJK_RE.test(raw) ? "zh" : "en";
  return {
    code: error.code,
    prefix: copy.errorPrefix,
    raw,
    rawLang,
  };
}
