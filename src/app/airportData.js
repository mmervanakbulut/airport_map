// Tüm JSON verileri tek yerden yüklenir → bundle'da tekrar etmez
import basicInfo from "ourairports-data-js/data/basic_info.json";
import coordinates from "ourairports-data-js/data/coordinates.json";
import regions from "ourairports-data-js/data/region.json";

export const typeIconMap = {
  large_airport:  { html: "🔴", size: 30, label: "Büyük Havalimanı" },
  medium_airport: { html: "🔵", size: 26, label: "Orta Havalimanı" },
  small_airport:  { html: "🟢", size: 22, label: "Küçük Havalimanı" },
};

export const countryNames = new Intl.DisplayNames(["tr"], { type: "region" });

const coordMap = Object.fromEntries(coordinates.map((c) => [c.id, c]));
const regionMap = Object.fromEntries(regions.map((r) => [r.id, r]));

// ✅ Tüm veriyi bir kez birleştir
export const allAirports = basicInfo
  .filter((a) => Object.keys(typeIconMap).includes(a.type))
  .map((a) => ({ ...a, ...coordMap[a.id], ...regionMap[a.id] }))
  .filter((a) => a.latitude_deg && a.longitude_deg);

// ✅ Unique ülke listesi — alfabetik sıralı
export const countryList = [
  ...new Set(allAirports.map((a) => a.iso_country)),
]
  .filter(Boolean)
  .map((code) => ({ code, name: countryNames.of(code) ?? code }))
  .sort((a, b) => a.name.localeCompare(b.name, "tr"));
