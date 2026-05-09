import Link from "next/link";
import { notFound } from "next/navigation";

interface VerifyMedicine {
  label: string;
  dose?: string;
  quantity?: string;
  duration?: string;
  instruction?: string;
}

interface VerifyResponse {
  verified: boolean;
  visit: {
    date?: string;
    doctor?: string;
    location?: string;
    diseases: { label: string }[];
    medicines: VerifyMedicine[];
  };
  patient: { firstName: string } | null;
}

export const dynamic = "force-dynamic";

async function fetchVerify(id: string): Promise<VerifyResponse | null> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return null;
  try {
    const res = await fetch(`${base}/verify/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as VerifyResponse;
  } catch {
    return null;
  }
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchVerify(id);
  if (!data || !data.verified) notFound();

  const { visit, patient } = data;

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-soft)" }}>
      <div className="mx-auto max-w-2xl px-5 py-12">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--ink-3)", fontFamily: "var(--font-jetbrains)" }}
        >
          Dr. Irfan Ahmad
        </Link>

        <div
          className="mt-6 rounded-lg p-7"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--rule)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "oklch(0.65 0.15 145)" }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "oklch(0.45 0.15 145)", fontWeight: 600 }}
            >
              Verified prescription
            </span>
          </div>

          <h1
            className="mt-4 text-2xl"
            style={{ fontFamily: "var(--font-newsreader)", color: "var(--ink)" }}
          >
            Issued by{" "}
            <span style={{ color: "var(--teal-deep)" }}>
              {visit.doctor || "the practice"}
            </span>
          </h1>

          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            {patient?.firstName && (
              <div>
                <dt
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--ink-3)" }}
                >
                  Patient
                </dt>
                <dd style={{ color: "var(--ink)" }}>{patient.firstName}</dd>
              </div>
            )}
            {visit.date && (
              <div>
                <dt
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--ink-3)" }}
                >
                  Issued
                </dt>
                <dd
                  style={{
                    color: "var(--ink)",
                    fontFamily: "var(--font-jetbrains)",
                  }}
                >
                  {visit.date}
                </dd>
              </div>
            )}
            {visit.location && (
              <div className="col-span-2">
                <dt
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--ink-3)" }}
                >
                  Location
                </dt>
                <dd style={{ color: "var(--ink)" }}>{visit.location}</dd>
              </div>
            )}
          </dl>

          {visit.diseases.length > 0 && (
            <div className="mt-7">
              <h2
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--ink-3)", fontWeight: 600 }}
              >
                Diagnosis
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {visit.diseases.map((d, i) => (
                  <li
                    key={i}
                    className="rounded-md px-2.5 py-1 text-sm"
                    style={{
                      background: "var(--teal-tint)",
                      color: "var(--teal-deep)",
                      border: "1px solid var(--teal-soft)",
                    }}
                  >
                    {d.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {visit.medicines.length > 0 && (
            <div className="mt-7">
              <h2
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--ink-3)", fontWeight: 600 }}
              >
                Medicines
              </h2>
              <ul
                className="mt-3 divide-y"
                style={{ borderColor: "var(--rule-2)" }}
              >
                {visit.medicines.map((m, i) => (
                  <li
                    key={i}
                    className="py-3"
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid var(--rule-2)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-newsreader)",
                        color: "var(--ink)",
                        fontSize: 16,
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      className="mt-1 text-xs"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {[m.quantity, m.dose, m.duration, m.instruction]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p
            className="mt-8 text-xs italic"
            style={{ color: "var(--ink-3)" }}
          >
            This page confirms the prescription was issued from this practice.
            For medical questions, please contact the clinic directly.
          </p>
        </div>
      </div>
    </main>
  );
}
