import { StarIcon } from "./Icons";
import { useT, type Lang } from "@/lib/strings";

export default function Testimonials({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const items = [1, 2, 3] as const;

  return (
    <section className="border-b border-(--rule-2)">
      <div className="max-w-300 mx-auto px-5 md:px-7 py-16 md:py-25">
        <div className="eyebrow">{t("test_eyebrow")}</div>
        <h2 className="serif text-[34px] md:text-[42px] mt-3 tracking-[-0.02em]">
          {t("test_title")}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((i) => (
            <figure key={i} className="card p-7 m-0 rounded">
              <div className="flex gap-0.5 text-(--gold) mb-3.5">
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} size={14} />)}
              </div>
              <blockquote className="serif m-0 text-[19px] leading-[1.4] text-(--ink)">
                &ldquo;{t(`test_${i}` as Parameters<typeof t>[0])}&rdquo;
              </blockquote>
              <figcaption className="mt-5.5 pt-4.5 border-t border-(--rule-2)">
                <div className="text-sm font-medium">
                  {t(`test_${i}_name` as Parameters<typeof t>[0])}
                </div>
                <div className="text-xs text-(--ink-3) mt-0.5">
                  {t(`test_${i}_meta` as Parameters<typeof t>[0])}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
