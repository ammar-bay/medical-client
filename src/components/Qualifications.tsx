import { useT, type Lang } from "@/lib/strings";

const ROWS: [string, string][] = [
  ["mbbs", "2004"],
  ["mrcp", "2014"],
  ["hst", "2019"],
  ["tx", "2022"],
  ["diab", "2025"],
  ["assoc", "2025"],
  ["frcp", "2026"],
];

export default function Qualifications({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section className="border-b border-(--rule-2)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-16 md:py-25 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-15">
        <div>
          <div className="eyebrow">{t("qual_eyebrow")}</div>
          <h2 className="serif text-[34px] md:text-[38px] mt-3 tracking-[-0.02em]">
            {t("qual_title")}
          </h2>
        </div>
        <div className="border-t border-(--rule-2)">
          {ROWS.map(([key, year]) => (
            <div
              key={key}
              className="grid grid-cols-[70px_1fr] gap-6 py-5 border-b border-(--rule-2)"
            >
              <div className="mono text-(--teal) text-[13px] pt-1">{year}</div>
              <div>
                <div className="serif text-[19px] leading-[1.3]">
                  {t(`qual_${key}` as Parameters<ReturnType<typeof useT>>[0])}
                </div>
                <div className="text-[13px] text-(--ink-3) mt-0.5">
                  {t(`qual_${key}_inst` as Parameters<ReturnType<typeof useT>>[0])}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
