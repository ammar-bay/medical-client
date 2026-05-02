"use client";
import { useState } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import Stats from "./Stats";
import About from "./About";
import Specializations from "./Specializations";
import Qualifications from "./Qualifications";
import Locations from "./Locations";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import BookingModal from "./BookingModal";
import type { Lang } from "@/lib/strings";
import type { HospitalId } from "@/lib/hospitals";

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingHospital, setBookingHospital] = useState<HospitalId | null>(null);

  const dir = lang === "ur" ? "rtl" : "ltr";

  const openBooking = (hospital?: HospitalId) => {
    setBookingHospital(hospital ?? null);
    setBookingOpen(true);
  };

  return (
    <div dir={dir} style={{ minHeight: "100vh" }}>
      <Nav lang={lang} setLang={setLang} onBook={() => openBooking()} />
      <Hero lang={lang} onBook={() => openBooking()} />
      <Stats lang={lang} />
      <About lang={lang} />
      <Specializations lang={lang} />
      <Qualifications lang={lang} />
      <Locations lang={lang} onBookHospital={(id) => openBooking(id)} />
      <Testimonials lang={lang} />
      <FAQ lang={lang} />
      <Footer lang={lang} />
      <FloatingActions />

      {bookingOpen && (
        <BookingModal
          lang={lang}
          initialHospital={bookingHospital}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  );
}
