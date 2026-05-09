import Link from "next/link";

export default function VerifyNotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--bg-soft)" }}
    >
      <div
        className="max-w-md w-full rounded-lg p-8 text-center"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--rule)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div
          className="text-xs uppercase tracking-widest"
          style={{ color: "oklch(0.55 0.18 25)", fontWeight: 600 }}
        >
          Not verified
        </div>
        <h1
          className="mt-3 text-xl"
          style={{ fontFamily: "var(--font-newsreader)", color: "var(--ink)" }}
        >
          We couldn&apos;t verify this prescription
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--ink-2)" }}>
          The link may be invalid or the record has been removed. If you
          received this from the clinic, please contact us directly.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-xs uppercase tracking-widest"
          style={{ color: "var(--teal-deep)" }}
        >
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
