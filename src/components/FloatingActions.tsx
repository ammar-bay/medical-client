"use client";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

export default function FloatingActions() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        zIndex: 20,
      }}
    >
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          background: "oklch(0.7 0.16 150)",
          color: "white",
          boxShadow: "var(--shadow-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          transition: "transform 120ms, box-shadow 120ms",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
        }}
      >
        <WhatsAppIcon size={20} />
      </a>
      <a
        href="tel:+923001234567"
        title="Call"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          background: "var(--teal)",
          color: "white",
          boxShadow: "var(--shadow-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          transition: "transform 120ms, box-shadow 120ms",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
        }}
      >
        <PhoneIcon size={18} />
      </a>
    </div>
  );
}
