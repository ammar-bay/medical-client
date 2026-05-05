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
        body: JSON.stringify({ hospital, visitType, date: date?.toISOString(), time, ...details }),
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
      className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-6 bg-(--modal-overlay) backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-(--bg) w-full sm:max-w-220 max-h-[95vh] sm:max-h-[92vh] rounded-t-2xl sm:rounded-lg flex flex-col border border-(--rule-2) overflow-hidden"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Header */}
        <div className="px-5 md:px-7 py-5 border-b border-(--rule-2) flex items-center justify-between shrink-0">
          <div>
            <div className="serif text-[22px] leading-[1.1]">{t("book_title")}</div>
            <div className="text-xs text-(--ink-3) mt-1">{t("book_subtitle")}</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-(--rule) bg-transparent text-(--ink-2) flex items-center justify-center shrink-0"
          >
            <XIcon size={14} />
          </button>
        </div>

        {/* Stepper */}
        {step < 3 && (
          <div className="px-5 md:px-7 py-4 border-b border-(--rule-2) bg-(--bg-soft) shrink-0">
            <div className="flex items-center gap-2">
              {steps.map((label, i) => (
                <div key={i} className={`flex items-center gap-2 ${i < steps.length - 1 ? "flex-1" : ""}`}>
                  <div
                    className="w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mono"
                    style={{
                      background: i <= step ? "var(--teal)" : "var(--bg-card)",
                      color: i <= step ? "white" : "var(--ink-3)",
                      border: i <= step ? "none" : "1px solid var(--rule)",
                    }}
                  >
                    {i < step ? <CheckIcon size={12} /> : i + 1}
                  </div>
                  <div className={`text-xs hidden sm:block ${i === step ? "font-medium text-(--ink)" : "text-(--ink-3)"}`}>
                    {label}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 h-px"
                      style={{ background: i < step ? "var(--teal)" : "var(--rule)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="no-scrollbar flex-1 overflow-y-auto p-5 md:p-7">
          {step === 0 && (
            <StepHospital t={t} lang={lang} hospital={hospital} setHospital={setHospital} visitType={visitType} setVisitType={setVisitType} />
          )}
          {step === 1 && (
            <StepDateTime t={t} lang={lang} hospital={hospital} date={date} setDate={setDate} time={time} setTime={setTime} />
          )}
          {step === 2 && (
            <StepDetails t={t} details={details} setDetails={setDetails} />
          )}
          {step === 3 && (
            <StepConfirm t={t} lang={lang} bookingId={bookingId} hospital={hospital} date={date} time={time} details={details} visitType={visitType} onClose={onClose} />
          )}
        </div>

        {/* Footer */}
        {step < 3 && (
          <div className="px-5 md:px-7 py-4 border-t border-(--rule-2) flex justify-between items-center gap-3 shrink-0">
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
                : step === 2 ? t("book_confirm_btn") : t("book_continue")}
              {!submitting && <ArrowIcon size={14} dir={dir === "rtl" ? "left" : "right"} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 1: Hospital ──────────────────────────────────────────────────────────
function StepHospital({ t, lang, hospital, setHospital, visitType, setVisitType }: {
  t: ReturnType<typeof useT>;
  lang: Lang;
  hospital: HospitalId | null;
  setHospital: (id: HospitalId) => void;
  visitType: string;
  setVisitType: (v: "first" | "followup") => void;
}) {
  return (
    <div>
      <div className="text-sm font-medium mb-4">{t("book_choose_hospital")}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {HOSPITALS.map((h) => {
          const sel = hospital === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setHospital(h.id)}
              className="text-start flex flex-col gap-2 rounded-lg transition-all duration-120"
              style={{
                border: sel ? "2px solid var(--teal)" : "1px solid var(--rule)",
                padding: sel ? 19 : 20,
                background: sel ? "var(--teal-tint)" : "var(--bg-card)",
              }}
            >
              <div className="flex justify-between items-start">
                <div className="serif text-lg">{lang === "ur" ? h.name_ur : h.name_en}</div>
                {sel && <span className="text-(--teal)"><CheckIcon size={18} /></span>}
              </div>
              <div className="text-xs text-(--ink-3) flex items-center gap-1.5">
                <PinIcon size={12} /> {lang === "ur" ? h.area_ur : h.area_en}
              </div>
              <div className="text-xs text-(--ink-3) flex items-center gap-1.5">
                <ClockIcon size={12} /> {lang === "ur" ? h.time_ur : h.time_en}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-medium mt-8 mb-3">{t("book_first_visit")}</div>
      <div className="flex gap-2.5 flex-wrap">
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
function StepDateTime({ t, lang, hospital, date, setDate, time, setTime }: {
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

  const slots = hospitalData ? { ...hospitalData.slots } : { morning: [], afternoon: [], evening: [] };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Calendar */}
      <div>
        <div className="text-sm font-medium mb-4">{t("book_choose_date")}</div>
        <div className="border border-(--rule) rounded-lg p-4 bg-(--bg-card)">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
              disabled={monthOffset === 0}
              className="w-7 h-7 border border-(--rule) bg-transparent rounded flex items-center justify-center disabled:opacity-40"
            >
              <ArrowIcon size={12} dir="left" />
            </button>
            <div className="text-sm font-medium">{monthName}</div>
            <button
              onClick={() => setMonthOffset((o) => o + 1)}
              className="w-7 h-7 border border-(--rule) bg-transparent rounded flex items-center justify-center"
            >
              <ArrowIcon size={12} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-(--ink-3) text-center mb-1.5">
            {dayLabels.map((d) => <div key={d}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
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
                  className="aspect-square border-none rounded text-[13px] relative"
                  style={{
                    background: isSel ? "var(--teal)" : "transparent",
                    color: isSel ? "white" : isAvail ? "var(--ink)" : "var(--ink-3)",
                    fontWeight: isSel ? 500 : 400,
                    opacity: isAvail ? 1 : 0.3,
                    cursor: isAvail ? "pointer" : "not-allowed",
                  }}
                >
                  {d.getDate()}
                  {isAvail && !isSel && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--teal)" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time slots */}
      <div>
        <div className="text-sm font-medium mb-4">{t("book_choose_time")}</div>
        {!date ? (
          <div className="p-6 text-[13px] text-(--ink-3) border border-dashed border-(--rule) rounded-lg text-center">
            {lang === "ur" ? "پہلے تاریخ منتخب کریں" : "Select a date first"}
          </div>
        ) : (
          <div className="grid gap-4">
            {(["morning", "afternoon", "evening"] as const).map((period) => {
              const periodSlots = slots[period] as readonly string[];
              if (periodSlots.length === 0) return null;
              return (
                <div key={period}>
                  <div className="text-xs text-(--ink-3) uppercase tracking-widest mb-2">
                    {t(`book_${period}` as Parameters<typeof t>[0])}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {periodSlots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setTime(s)}
                        className="py-2.5 px-1.5 text-xs rounded mono"
                        style={{
                          border: time === s ? "1px solid var(--teal)" : "1px solid var(--rule)",
                          background: time === s ? "var(--teal-tint)" : "var(--bg-card)",
                          color: time === s ? "var(--teal-deep)" : "var(--ink-2)",
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
function StepDetails({ t, details, setDetails }: {
  t: ReturnType<typeof useT>;
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
}) {
  const set = (k: keyof Details, v: string) => setDetails((d) => ({ ...d, [k]: v }));
  return (
    <div className="grid gap-4.5 max-w-155">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="field-label">{t("book_full_name")} *</label>
          <input className="field" value={details.name} onChange={(e) => set("name", e.target.value)} placeholder="—" />
        </div>
        <div>
          <label className="field-label">{t("book_phone")} *</label>
          <input className="field" value={details.phone} onChange={(e) => set("phone", e.target.value)} placeholder="03xx xxxxxxx" inputMode="tel" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_100px_1fr] gap-3.5">
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
          <div className="flex gap-1.5">
            {(["male", "female", "other"] as const).map((v) => (
              <button
                key={v}
                onClick={() => set("gender", v)}
                type="button"
                className="flex-1 py-3 px-1 text-[13px] rounded-lg cursor-pointer"
                style={{
                  border: details.gender === v ? "1px solid var(--teal)" : "1px solid var(--rule)",
                  background: details.gender === v ? "var(--teal-tint)" : "var(--bg-card)",
                  color: details.gender === v ? "var(--teal-deep)" : "var(--ink-2)",
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
function StepConfirm({ t, lang, bookingId, hospital, date, time, details, visitType, onClose }: {
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
    <div className="text-center py-5 max-w-130 mx-auto">
      <div
        className="w-16 h-16 rounded-full inline-flex items-center justify-center mb-6"
        style={{ background: "var(--confirm-check-bg)", color: "var(--confirm-check-text)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <h3 className="serif text-[30px] tracking-[-0.02em]">{t("book_confirmed")}</h3>
      <p className="text-sm text-(--ink-3) mt-3 mb-7 leading-[1.55]">{t("book_confirmed_sub")}</p>

      <div className="bg-(--bg-soft) border border-(--rule-2) rounded-lg p-5 text-start">
        <div className="flex justify-between pb-3.5 mb-3.5 border-b border-(--rule-2)">
          <span className="text-xs text-(--ink-3) uppercase tracking-widest">{t("book_booking_id")}</span>
          <span className="mono text-sm font-medium text-(--teal-deep)">{bookingId}</span>
        </div>
        <div className="grid gap-2.5 text-[13px]">
          <ConfirmRow label={t("book_full_name")} value={details.name} />
          <ConfirmRow label={lang === "ur" ? "ہسپتال" : "Hospital"} value={h ? (lang === "ur" ? h.name_ur : h.name_en) : ""} />
          <ConfirmRow label={lang === "ur" ? "تاریخ" : "Date"} value={date ? formatDate(date, lang) : ""} />
          <ConfirmRow label={lang === "ur" ? "وقت" : "Time"} value={time ?? ""} />
          <ConfirmRow label={t("book_first_visit")} value={visitType === "first" ? t("book_first") : t("book_followup")} />
        </div>
      </div>

      <div className="mt-6 flex gap-2.5 justify-center">
        <button className="btn btn-ghost btn-sm">{t("book_add_calendar")}</button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>{t("book_done")}</button>
      </div>
    </div>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-(--ink-3)">{label}</span>
      <span className="text-(--ink) font-medium text-end">{value || "—"}</span>
    </div>
  );
}
