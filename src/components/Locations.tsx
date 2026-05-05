"use client";
import { PinIcon, ClockIcon, PhoneIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";
import { HOSPITALS, type HospitalId } from "@/lib/hospitals";

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
      className="border-b border-(--rule-2) text-white"
      style={{ background: "var(--loc-gradient)" }}
    >
      <div className="max-w-300 mx-auto px-5 md:px-7 py-16 md:py-25">
        <div className="eyebrow" style={{ color: "var(--loc-eyebrow)" }}>{t("loc_eyebrow")}</div>
        <h2 className="serif text-[34px] md:text-[42px] mt-3 tracking-[-0.02em] text-white">
          {t("loc_title")}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((h) => {
            const hospital = HOSPITALS.find((x) => x.id === h.id)!;
            return (
              <div
                key={h.id}
                className="rounded p-7"
                style={{
                  background: "var(--loc-card-bg)",
                  border: "1px solid var(--loc-card-border)",
                }}
              >
                <h3 className="serif text-2xl text-white mb-4">
                  {t(h.nameKey as Parameters<typeof t>[0])}
                </h3>

                <div className="text-sm leading-relaxed grid gap-2.5 mb-5" style={{ color: "var(--loc-text)" }}>
                  <div className="flex gap-2.5 items-start">
                    <span className="mt-0.5 shrink-0"><PinIcon size={14} /></span>
                    <span>{t(h.addrKey as Parameters<typeof t>[0])}</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="mt-0.5 shrink-0"><ClockIcon size={14} /></span>
                    <span>{t(h.hoursKey as Parameters<typeof t>[0])}</span>
                  </div>
                  <div className="flex gap-2.5 items-center flex-wrap">
                    <span className="shrink-0"><PhoneIcon size={14} /></span>
                    <a
                      href={`tel:${hospital.phone.replace(/\s/g, "")}`}
                      className="mono text-[13px]"
                      style={{ color: "inherit" }}
                    >
                      {hospital.phone}
                    </a>
                    {hospital.whatsapp && (
                      <a
                        href={`https://wa.me/${hospital.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--wa-bg)",
                          color: "var(--wa-text)",
                          border: "1px solid var(--wa-border)",
                        }}
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-2.5 flex-wrap">
                  <button
                    className="btn btn-sm bg-white text-(--teal-deep)"
                    onClick={() => onBookHospital(h.id)}
                  >
                    {t("nav_book")}
                  </button>
                  <a
                    href={hospital.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm text-white"
                    style={{ background: "transparent", border: "1px solid var(--loc-border-btn)" }}
                  >
                    {t("loc_directions")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
