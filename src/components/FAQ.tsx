"use client";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

export default function FAQ({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const [open, setOpen] = useState<number>(0);
  const items = [1, 2, 3, 4, 5] as const;

  return (
    <section id="faq" style={{ background: "var(--bg-soft)", borderBottom: "1px solid var(--rule-2)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "100px 28px",
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 60,
        }}
      >
        <div>
          <div className="eyebrow">{t("faq_eyebrow")}</div>
          <h2
            className="serif"
            style={{ fontSize: 38, marginTop: 12, letterSpacing: "-0.02em" }}
          >
            {t("faq_title")}
          </h2>
        </div>

        <div>
          {items.map((i, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={i}
                style={{
                  borderTop: "1px solid var(--rule-2)",
                  borderBottom: idx === items.length - 1 ? "1px solid var(--rule-2)" : "none",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    background: "transparent",
                    border: "none",
                    padding: "22px 0",
                    textAlign: "start",
                  }}
                >
                  <span className="serif" style={{ fontSize: 20, color: "var(--ink)" }}>
                    {t(`faq_${i}_q` as Parameters<typeof t>[0])}
                  </span>
                  <span style={{ color: "var(--teal)", flexShrink: 0 }}>
                    {isOpen ? <MinusIcon size={18} /> : <PlusIcon size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      paddingBottom: 22,
                      fontSize: 15,
                      color: "var(--ink-2)",
                      lineHeight: 1.6,
                      maxWidth: 640,
                    }}
                  >
                    {t(`faq_${i}_a` as Parameters<typeof t>[0])}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
