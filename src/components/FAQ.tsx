"use client";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

export default function FAQ({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const [open, setOpen] = useState<number>(0);
  const items = [1, 2, 3, 4, 5] as const;

  return (
    <section id="faq" className="bg-(--bg-soft) border-b border-(--rule-2)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-16 md:py-25 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-15">
        <div>
          <div className="eyebrow">{t("faq_eyebrow")}</div>
          <h2 className="serif text-[34px] md:text-[38px] mt-3 tracking-[-0.02em]">
            {t("faq_title")}
          </h2>
        </div>

        <div>
          {items.map((i, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={i}
                className={`border-t border-(--rule-2)${idx === items.length - 1 ? " border-b" : ""}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  className="w-full flex justify-between items-center gap-5 bg-transparent border-none py-5.5 text-start cursor-pointer"
                >
                  <span className="serif text-xl text-(--ink)">
                    {t(`faq_${i}_q` as Parameters<typeof t>[0])}
                  </span>
                  <span className="text-(--teal) shrink-0">
                    {isOpen ? <MinusIcon size={18} /> : <PlusIcon size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5.5 text-[15px] text-(--ink-2) leading-relaxed max-w-160">
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
