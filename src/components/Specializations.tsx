import { DropIcon, HeartIcon, PulseIcon, NeedleIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

const SPECS = [
  { icon: <DropIcon size={26} />, key: "kidney" as const },
  { icon: <HeartIcon size={26} />, key: "transplant" as const },
  { icon: <PulseIcon size={26} />, key: "diabetes" as const },
  { icon: <HeartIcon size={26} />, key: "hyper" as const },
  { icon: <NeedleIcon size={26} />, key: "intervention" as const },
];

export default function Specializations({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <section id="services" className="bg-(--bg-soft) border-b border-(--rule-2)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-16 md:py-25">
        <div className="eyebrow">{t("spec_eyebrow")}</div>
        <h2 className="serif text-[34px] md:text-[42px] mt-3 tracking-[-0.02em]">
          {t("spec_title")}
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-(--rule-2) rounded bg-(--bg-card)">
          {SPECS.map((s) => (
            <div key={s.key} className="spec-item p-6">
              <div className="text-(--teal) mb-5">{s.icon}</div>
              <h3 className="serif text-[19px] mb-2">
                {t(`spec_${s.key}` as Parameters<ReturnType<typeof useT>>[0])}
              </h3>
              <p className="text-[13px] text-(--ink-3) leading-[1.55] m-0">
                {t(`spec_${s.key}_desc` as Parameters<ReturnType<typeof useT>>[0])}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
