export const HOSPITALS = [
  {
    id: "ldh",
    name_en: "Lahore Doctors Hospital",
    name_ur: "لاہور ڈاکٹرز ہسپتال",
    area_en: "Johar Town",
    area_ur: "جوہر ٹاؤن",
    addr_en: "152-A, Block G-1, Johar Town, Lahore",
    addr_ur: "152-A، بلاک G-1، جوہر ٹاؤن، لاہور",
    time_en: "5:00 PM – 8:00 PM",
    time_ur: "شام 5 تا 8",
    days: [1, 2, 3, 4, 5, 6],
    slots: {
      morning: [],
      afternoon: [],
      evening: ["5:00 PM","5:20 PM","5:40 PM","6:00 PM","6:20 PM","6:40 PM","7:00 PM","7:20 PM","7:40 PM"],
    },
    maps_url: "https://maps.google.com/?q=Lahore+Doctors+Hospital+Johar+Town",
    phone: "+92 42 3518 0000",
  },
  {
    id: "fh",
    name_en: "Farooq Hospital",
    name_ur: "فاروق ہسپتال",
    area_en: "Raiwind Road",
    area_ur: "رائے ونڈ روڈ",
    addr_en: "Westwood Branch, Raiwind Road, Lahore",
    addr_ur: "ویسٹ ووڈ برانچ، رائے ونڈ روڈ، لاہور",
    time_en: "11:00 AM – 2:00 PM",
    time_ur: "صبح 11 تا 2",
    days: [1, 3, 5],
    slots: {
      morning: ["11:00 AM","11:20 AM","11:40 AM","12:00 PM","12:20 PM"],
      afternoon: ["1:00 PM","1:20 PM","1:40 PM"],
      evening: [],
    },
    maps_url: "https://maps.google.com/?q=Farooq+Hospital+Raiwind+Road+Lahore",
    phone: "+92 42 3711 0000",
  },
] as const;

export type HospitalId = (typeof HOSPITALS)[number]["id"];
export type Hospital = (typeof HOSPITALS)[number];

export function getHospital(id: HospitalId) {
  return HOSPITALS.find((h) => h.id === id)!;
}
