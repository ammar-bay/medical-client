export const HOSPITALS = [
  {
    id: "ldh",
    name_en: "Doctors Hospital and Medical Center",
    name_ur: "ڈاکٹرز ہسپتال اینڈ میڈیکل سینٹر",
    area_en: "Johar Town",
    area_ur: "جوہر ٹاؤن",
    addr_en: "152-G, 1 Canal Rd, Block G1 Phase 1 Johar Town, Lahore, 54590",
    addr_ur: "152-G، 1 کینال روڈ، بلاک G1 فیز 1 جوہر ٹاؤن، لاہور",
    time_en: "12:00 PM – 2:00 PM / 8:00 PM – 10:00 PM",
    time_ur: "دوپہر 12 تا 2 / رات 8 تا 10",
    days: [1, 2, 3, 4, 5, 6],
    slots: {
      morning: [],
      afternoon: ["12:00 PM","12:20 PM","12:40 PM","1:00 PM","1:20 PM","1:40 PM","2:00 PM"],
      evening: ["8:00 PM","8:20 PM","8:40 PM","9:00 PM","9:20 PM","9:40 PM","10:00 PM"],
    },
    maps_url: "https://maps.app.goo.gl/D9D7PLeDGh6dFo1T7",
    phone: "+92 321 4820890",
    whatsapp: true,
  },
  {
    id: "fh",
    name_en: "Farooq Hospital DHA",
    name_ur: "فاروق ہسپتال ڈی ایچ اے",
    area_en: "DHA Lahore",
    area_ur: "ڈی ایچ اے لاہور",
    addr_en: "Avenue Mall, Main Ghazi Rd, DHA, Lahore, 54000",
    addr_ur: "ایونیو مال، مین غازی روڈ، ڈی ایچ اے، لاہور",
    time_en: "5:00 PM – 7:00 PM",
    time_ur: "شام 5 تا 7",
    days: [1, 2, 3, 4, 5, 6],
    slots: {
      morning: [],
      afternoon: [],
      evening: ["5:00 PM","5:20 PM","5:40 PM","6:00 PM","6:20 PM","6:40 PM","7:00 PM"],
    },
    maps_url: "https://maps.app.goo.gl/ZQhWQgDgUvgKfSSK9",
    phone: "+92 345 1450025",
    whatsapp: true,
  },
] as const;

export type HospitalId = (typeof HOSPITALS)[number]["id"];
export type Hospital = (typeof HOSPITALS)[number];

export function getHospital(id: HospitalId) {
  return HOSPITALS.find((h) => h.id === id)!;
}
