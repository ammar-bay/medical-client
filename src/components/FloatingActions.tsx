"use client";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 inset-e-6 flex flex-col gap-2.5 z-20">
      <a
        href="https://wa.me/923214820890"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="w-12 h-12 rounded-full flex items-center justify-center text-white no-underline transition-transform duration-120 hover:scale-[1.08]"
        style={{ background: "var(--green)", boxShadow: "var(--shadow-md)" }}
      >
        <WhatsAppIcon size={20} />
      </a>
      <a
        href="tel:+923214820890"
        title="Call"
        className="w-12 h-12 rounded-full flex items-center justify-center bg-(--teal) text-white no-underline transition-transform duration-120 hover:scale-[1.08]"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <PhoneIcon size={18} />
      </a>
    </div>
  );
}
