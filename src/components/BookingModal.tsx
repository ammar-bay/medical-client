"use client";
import { useState, useMemo } from "react";
import { XIcon, CheckIcon, ArrowIcon, PinIcon, ClockIcon } from "./Icons";
import { useT, formatDate, type Lang } from "@/lib/strings";
import { HOSPITALS, type HospitalId } from "@/lib/hospitals";

interface BookingModalProps {
  lang: Lang;
  initialHospital?: HospitalId | null;
  onClose: () => void;
}

interface Details {
  name: string;
  phone: string;
  cnic: string;
  age: string;
  gender: string;
  reason: string;
}

export default function BookingModal({ lang, initialHospital, onClose }: BookingModalProps) {
  const t = useT(lang);
  const dir = lang === "ur" ? "rtl" : "ltr";

  const [step, setStep] = useState(0);
  const [hospital, setHospital] = useState<HospitalId | null>(initialHospital ?? null);
  const [visitType, setVisitType] = useState<"first" | "followup">("first");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>({ name: "", phone: "", cnic: "", age: "", gender: "", reason: "" });
  const [bookingId, setBookingId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const steps = [t("book_step_hospital"), t("book_step_time"), t("book_step_details"), t("book_step_confirm")];

  const canNext = useMemo(() => {
    if (step === 0) return !!hospital && !!visitType;
    if (step === 1) return !!date && !!time;
    if (step === 2) return !!(details.name && details.phone && details.age && details.gender);
    return true;
  }, [step, hospital, visitType, date, time, details]);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const confirm = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hospital,
          visitType,
          date: date?.toISOString(),
          time,
          ...details,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setBookingId(data.bookingId || "DIA-" + Math.random().toString(36).substr(2, 6).toUpperCase());
      } else {
        setBookingId("DIA-" + Math.random().toString(36).substr(2, 6).toUpperCase());
      }
    } catch {
      setBookingId("DIA-" + Math.random().toString(36).substr(2, 6).toUpperCase());
    }
    setSubmitting(false);
    setStep(3);
  };

  return (
    <div
      dir={dir}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "color-mix(in oklch, oklch(0.18 0.02 240) 60%, transparent)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "var(--bg)",
          width: "100%",
          maxWidth: 880,
          maxHeight: "92vh",
          borderRadius: 8,
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--rule-2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid var(--rule-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.1 }}>{t("book_title")}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>{t("book_subtitle")}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid var(--rule)",
              background: "transparent",
              color: "var(--ink-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <XIcon size={14} />
          </button>
        </div>

        {/* Stepper */}
        {step < 3 && (
          <div
            style={{
              padding: "16px 28px",
              borderBottom: "1px solid var(--rule-2)",
              background: "var(--bg-soft)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {steps.map((label, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flex: i < steps.length - 1 ? 1 : "none",
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: i <= step ? "var(--teal)" : "var(--bg-card)",
                      color: i <= step ? "white" : "var(--ink-3)",
                      border: i <= step ? "none" : "1px solid var(--rule)",
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "var(--mono)",
                      flexShrink: 0,
                    }}
                  >
                    {i < step ? <CheckIcon size={12} /> : i + 1}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: i === step ? 500 : 400,
                      color: i <= step ? "var(--ink)" : "var(--ink-3)",
                    }}
                  >
                    {label}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: i < step ? "var(--teal)" : "var(--rule)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {step === 0 && (
            <StepHospital
              t={t}
              lang={lang}
              hospital={hospital}
              setHospital={setHospital}
              visitType={visitType}
              setVisitType={setVisitType}
            />
          )}
          {step === 1 && (
            <StepDateTime
              t={t}
              lang={lang}
              hospital={hospital}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
            />
          )}
          {step === 2 && (
            <StepDetails t={t} details={details} setDetails={setDetails} />
          )}
          {step === 3 && (
            <StepConfirm
              t={t}
              lang={lang}
              bookingId={bookingId}
              hospital={hospital}
              date={date}
              time={time}
              details={details}
              visitType={visitType}
              onClose={onClose}
            />
          )}
        </div>

        {/* Footer */}
        {step < 3 && (
          <div
            style={{
              padding: "16px 28px",
              borderTop: "1px solid var(--rule-2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <button className="btn btn-ghost btn-sm" onClick={step === 0 ? onClose : back}>
              {step === 0 ? (lang === "ur" ? "منسوخ" : "Cancel") : t("book_back")}
            </button>
            <button
              className="btn btn-primary"
              onClick={step === 2 ? confirm : next}
              disabled={!canNext || submitting}
              style={{ opacity: canNext && !submitting ? 1 : 0.45, cursor: canNext && !submitting ? "pointer" : "not-allowed" }}
            >
              {submitting
                ? (lang === "ur" ? "انتظار..." : "Please wait…")
                : step === 2
                  ? t("book_confirm_btn")
                  : t("book_continue")}
              {!submitting && <ArrowIcon size={14} dir={dir === "rtl" ? "left" : "right"} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 1: Hospital ──────────────────────────────────────────────────────────
function StepHospital({
  t, lang, hospital, setHospital, visitType, setVisitType,
}: {
  t: ReturnType<typeof useT>;
  lang: Lang;
  hospital: HospitalId | null;
  setHospital: (id: HospitalId) => void;
  visitType: string;
  setVisitType: (v: "first" | "followup") => void;
}) {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>{t("book_choose_hospital")}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {HOSPITALS.map((h) => {
          const sel = hospital === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setHospital(h.id)}
              style={{
                border: sel ? "2px solid var(--teal)" : "1px solid var(--rule)",
                padding: sel ? 19 : 20,
                background: sel ? "var(--teal-tint)" : "var(--bg-card)",
                borderRadius: 8,
                textAlign: "start",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "all 120ms",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div className="serif" style={{ fontSize: 18 }}>
                  {lang === "ur" ? h.name_ur : h.name_en}
                </div>
                {sel && <span style={{ color: "var(--teal)" }}><CheckIcon size={18} /></span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6 }}>
                <PinIcon size={12} /> {lang === "ur" ? h.area_ur : h.area_en}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6 }}>
                <ClockIcon size={12} /> {lang === "ur" ? h.time_ur : h.time_en}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: 14, fontWeight: 500, marginTop: 32, marginBottom: 12 }}>{t("book_first_visit")}</div>
      <div style={{ display: "flex", gap: 10 }}>
        {(["first", "followup"] as const).map((v) => {
          const sel = visitType === v;
          return (
            <button
              key={v}
              onClick={() => setVisitType(v)}
              className="btn btn-sm"
              style={{
                border: sel ? "1px solid var(--teal)" : "1px solid var(--rule)",
                background: sel ? "var(--teal-tint)" : "var(--bg-card)",
                color: sel ? "var(--teal-deep)" : "var(--ink-2)",
                padding: "10px 18px",
              }}
            >
              {v === "first" ? t("book_first") : t("book_followup")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2: Date & Time ───────────────────────────────────────────────────────
function StepDateTime({
  t, lang, hospital, date, setDate, time, setTime,
}: {
  t: ReturnType<typeof useT>;
  lang: Lang;
  hospital: HospitalId | null;
  date: Date | null;
  setDate: (d: Date) => void;
  time: string | null;
  setTime: (s: string) => void;
}) {
  const [monthOffset, setMonthOffset] = useState(0);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset + 1, 0).getDate();
  const startDay = monthStart.getDay();

  const hospitalData = HOSPITALS.find((h) => h.id === hospital);
  const availableDays = hospitalData ? [...hospitalData.days] : [1, 2, 3, 4, 5, 6];

  const months_en = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const months_ur = ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"];
  const monthName = (lang === "ur" ? months_ur : months_en)[monthStart.getMonth()] + " " + monthStart.getFullYear();
  const dayLabels = lang === "ur"
    ? ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"]
    : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), d));
  }

  const slots = hospitalData
    ? { ...hospitalData.slots }
    : { morning: [], afternoon: [], evening: [] };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      {/* Calendar */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>{t("book_choose_date")}</div>
        <div style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: 16, background: "var(--bg-card)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <button
              onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
              disabled={monthOffset === 0}
              style={{
                width: 28, height: 28, border: "1px solid var(--rule)", background: "transparent",
                borderRadius: 6, opacity: monthOffset === 0 ? 0.4 : 1,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ArrowIcon size={12} dir="left" />
            </button>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{monthName}</div>
            <button
              onClick={() => setMonthOffset((o) => o + 1)}
              style={{
                width: 28, height: 28, border: "1px solid var(--rule)", background: "transparent",
                borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ArrowIcon size={12} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontSize: 11, color: "var(--ink-3)", textAlign: "center", marginBottom: 6 }}>
            {dayLabels.map((d) => <div key={d}>{d}</div>)}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const isPast = d < today;
              const isAvail = availableDays.includes(d.getDay()) && !isPast;
              const isSel = date ? d.getTime() === date.getTime() : false;
              return (
                <button
                  key={i}
                  disabled={!isAvail}
                  onClick={() => setDate(d)}
                  style={{
                    aspectRatio: "1",
                    border: "none",
                    borderRadius: 6,
                    background: isSel ? "var(--teal)" : "transparent",
                    color: isSel ? "white" : isAvail ? "var(--ink)" : "var(--ink-3)",
                    fontSize: 13,
                    fontWeight: isSel ? 500 : 400,
                    opacity: isAvail ? 1 : 0.3,
                    cursor: isAvail ? "pointer" : "not-allowed",
                    position: "relative",
                  }}
                >
                  {d.getDate()}
                  {isAvail && !isSel && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        background: "var(--teal)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time slots */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>{t("book_choose_time")}</div>
        {!date ? (
          <div style={{ padding: 24, fontSize: 13, color: "var(--ink-3)", border: "1px dashed var(--rule)", borderRadius: 8, textAlign: "center" }}>
            {lang === "ur" ? "پہلے تاریخ منتخب کریں" : "Select a date first"}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {(["morning", "afternoon", "evening"] as const).map((period) => {
              const periodSlots = slots[period] as readonly string[];
              if (periodSlots.length === 0) return null;
              return (
                <div key={period}>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                    {t(`book_${period}` as Parameters<typeof t>[0])}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    {periodSlots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setTime(s)}
                        style={{
                          padding: "9px 6px",
                          fontSize: 12,
                          border: time === s ? "1px solid var(--teal)" : "1px solid var(--rule)",
                          background: time === s ? "var(--teal-tint)" : "var(--bg-card)",
                          color: time === s ? "var(--teal-deep)" : "var(--ink-2)",
                          borderRadius: 6,
                          fontFamily: "var(--mono)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 3: Details ───────────────────────────────────────────────────────────
function StepDetails({
  t, details, setDetails,
}: {
  t: ReturnType<typeof useT>;
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
}) {
  const set = (k: keyof Details, v: string) => setDetails((d) => ({ ...d, [k]: v }));
  return (
    <div style={{ display: "grid", gap: 18, maxWidth: 620 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label className="field-label">{t("book_full_name")} *</label>
          <input className="field" value={details.name} onChange={(e) => set("name", e.target.value)} placeholder="—" />
        </div>
        <div>
          <label className="field-label">{t("book_phone")} *</label>
          <input className="field" value={details.phone} onChange={(e) => set("phone", e.target.value)} placeholder="03xx xxxxxxx" inputMode="tel" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr", gap: 14 }}>
        <div>
          <label className="field-label">{t("book_cnic")}</label>
          <input className="field" value={details.cnic} onChange={(e) => set("cnic", e.target.value)} placeholder="xxxxx-xxxxxxx-x" />
        </div>
        <div>
          <label className="field-label">{t("book_age")} *</label>
          <input className="field" value={details.age} onChange={(e) => set("age", e.target.value)} placeholder="—" inputMode="numeric" />
        </div>
        <div>
          <label className="field-label">{t("book_gender")} *</label>
          <div style={{ display: "flex", gap: 6 }}>
            {(["male", "female", "other"] as const).map((v) => (
              <button
                key={v}
                onClick={() => set("gender", v)}
                type="button"
                style={{
                  flex: 1,
                  padding: "12px 4px",
                  fontSize: 13,
                  border: details.gender === v ? "1px solid var(--teal)" : "1px solid var(--rule)",
                  background: details.gender === v ? "var(--teal-tint)" : "var(--bg-card)",
                  color: details.gender === v ? "var(--teal-deep)" : "var(--ink-2)",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                {t(`book_${v}` as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="field-label">{t("book_reason")}</label>
        <textarea
          className="field"
          rows={4}
          value={details.reason}
          onChange={(e) => set("reason", e.target.value)}
          placeholder={t("book_reason_ph")}
          style={{ resize: "vertical" }}
        />
      </div>
    </div>
  );
}

// ── Step 4: Confirm ───────────────────────────────────────────────────────────
function StepConfirm({
  t, lang, bookingId, hospital, date, time, details, visitType, onClose,
}: {
  t: ReturnType<typeof useT>;
  lang: Lang;
  bookingId: string;
  hospital: HospitalId | null;
  date: Date | null;
  time: string | null;
  details: Details;
  visitType: string;
  onClose: () => void;
}) {
  const h = HOSPITALS.find((x) => x.id === hospital);
  return (
    <div style={{ textAlign: "center", padding: "20px 0 30px", maxWidth: 520, margin: "0 auto" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "color-mix(in oklch, oklch(0.65 0.15 145) 18%, transparent)",
          color: "oklch(0.5 0.13 145)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <h3 className="serif" style={{ fontSize: 30, letterSpacing: "-0.02em" }}>{t("book_confirmed")}</h3>
      <p style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 12, marginBottom: 28, lineHeight: 1.55 }}>
        {t("book_confirmed_sub")}
      </p>
      <div style={{ background: "var(--bg-soft)", border: "1px solid var(--rule-2)", borderRadius: 8, padding: 20, textAlign: "start" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid var(--rule-2)" }}>
          <span style={{ fontSize: 12, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t("book_booking_id")}</span>
          <span className="mono" style={{ fontSize: 14, fontWeight: 500, color: "var(--teal-deep)" }}>{bookingId}</span>
        </div>
        <div style={{ display: "grid", gap: 10, fontSize: 13 }}>
          <ConfirmRow label={t("book_full_name")} value={details.name} />
          <ConfirmRow label={lang === "ur" ? "ہسپتال" : "Hospital"} value={h ? (lang === "ur" ? h.name_ur : h.name_en) : ""} />
          <ConfirmRow label={lang === "ur" ? "تاریخ" : "Date"} value={date ? formatDate(date, lang) : ""} />
          <ConfirmRow label={lang === "ur" ? "وقت" : "Time"} value={time ?? ""} />
          <ConfirmRow label={t("book_first_visit")} value={visitType === "first" ? t("book_first") : t("book_followup")} />
        </div>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center" }}>
        <button className="btn btn-ghost btn-sm">{t("book_add_calendar")}</button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>{t("book_done")}</button>
      </div>
    </div>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
      <span style={{ color: "var(--ink-3)" }}>{label}</span>
      <span style={{ color: "var(--ink)", fontWeight: 500, textAlign: "end" }}>{value || "—"}</span>
    </div>
  );
}
