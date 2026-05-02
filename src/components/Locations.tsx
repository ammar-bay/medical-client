"use client";
import { PinIcon, ClockIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";
import type { HospitalId } from "@/lib/hospitals";

interface LocationsProps {
  lang: Lang;
  onBookHospital: (id: HospitalId) => void;
}

const CARDS = [
  { id: "ldh" as HospitalId, nameKey: "loc_ldh", addrKey: "loc_ldh_addr", hoursKey: "loc_ldh_hours" },
  { id: "fh" as HospitalId, nameKey: "loc_fh", addrKey: "loc_fh_addr", hoursKey: "loc_fh_hours" },
];

export default function Locations({ lang, onBookHospital }: LocationsProps) {
  const t = useT(lang);
  return (
    <section
      id="locations"
      style={{
        background: "linear-gradient(180deg, oklch(0.34 0.10 28) 0%, oklch(0.30 0.09 25) 100%)",
        color: "white",
        borderBottom: "1px solid var(--rule-2)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 28px" }}>
        <div>
          <div className="eyebrow" style={{ color: "color-mix(in oklch, white 70%, transparent)" }}>
            {t("loc_eyebrow")}
          </div>
          <h2
            className="serif"
            style={{ fontSize: 42, marginTop: 12, letterSpacing: "-0.02em", color: "white" }}
          >
            {t("loc_title")}
          </h2>
        </div>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {CARDS.map((h) => (
            <div
              key={h.id}
              style={{
                background: "color-mix(in oklch, white 8%, transparent)",
                border: "1px solid color-mix(in oklch, white 14%, transparent)",
                borderRadius: 4,
                padding: 28,
                display: "grid",
                gridTemplateColumns: "1fr 140px",
                gap: 24,
              }}
            >
              <div>
                <h3 className="serif" style={{ fontSize: 24, color: "white" }}>
                  {t(h.nameKey as Parameters<typeof t>[0])}
                </h3>
                <div
                  style={{
                    marginTop: 16,
                    fontSize: 14,
                    color: "color-mix(in oklch, white 80%, transparent)",
                    lineHeight: 1.6,
                    display: "grid",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ marginTop: 2 }}><PinIcon size={14} /></span>
                    <span>{t(h.addrKey as Parameters<typeof t>[0])}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ marginTop: 2 }}><ClockIcon size={14} /></span>
                    <span>{t(h.hoursKey as Parameters<typeof t>[0])}</span>
                  </div>
                </div>
                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                  <button
                    className="btn btn-sm"
                    style={{ background: "white", color: "var(--teal-deep)" }}
                    onClick={() => onBookHospital(h.id)}
                  >
                    {t("nav_book")}
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "1px solid color-mix(in oklch, white 20%, transparent)",
                    }}
                  >
                    {t("loc_directions")}
                  </button>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                style={{
                  height: 140,
                  borderRadius: 3,
                  background: `
                    radial-gradient(circle at 50% 60%, oklch(0.65 0.15 145) 0 6px, transparent 7px),
                    repeating-linear-gradient(0deg, color-mix(in oklch, white 15%, transparent) 0 1px, transparent 1px 16px),
                    repeating-linear-gradient(90deg, color-mix(in oklch, white 15%, transparent) 0 1px, transparent 1px 16px),
                    color-mix(in oklch, white 6%, transparent)
                  `,
                  border: "1px solid color-mix(in oklch, white 14%, transparent)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
