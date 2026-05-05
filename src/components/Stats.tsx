import { useT, type Lang } from "@/lib/strings";

const STATS = [
  { value: "10+", key: "stat_years" as const },
  { value: "12,000+", key: "stat_patients" as const },
  { value: "100+", key: "stat_transplants" as const },
  { value: "4.9/5", key: "stat_rating" as const },
];

export default function Stats({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section className="border-b border-(--rule-2) bg-(--bg)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-11 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.key} className="ps-4.5 border-s border-(--rule)">
            <div className="serif text-[38px] font-medium text-(--teal-deep) tracking-[-0.02em]">
              {s.value}
            </div>
            <div className="text-xs text-(--ink-3) mt-1 uppercase tracking-[0.08em]">
              {t(s.key)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
