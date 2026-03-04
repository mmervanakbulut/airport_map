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


export const greenPassportCountries = [
  // Schengen
  { code: "DE", days: 90, region: "Schengen" },
  { code: "FR", days: 90, region: "Schengen" },
  { code: "IT", days: 90, region: "Schengen" },
  { code: "ES", days: 90, region: "Schengen" },
  { code: "GR", days: 90, region: "Schengen" },
  { code: "NL", days: 90, region: "Schengen" },
  { code: "CH", days: 90, region: "Schengen" },
  // Avrupa (Schengen Dışı)
  { code: "BA", days: 90, region: "Avrupa" },
  { code: "RS", days: 90, region: "Avrupa" },
  { code: "ME", days: 90, region: "Avrupa" },
  { code: "AL", days: 90, region: "Avrupa" },
  { code: "GE", days: 365, region: "Avrupa" },
  { code: "UA", days: 90, region: "Avrupa" },
  // Asya & Orta Doğu
  { code: "JP", days: 90, region: "Asya" },
  { code: "KR", days: 90, region: "Asya" },
  { code: "SG", days: 90, region: "Asya" },
  { code: "AE", days: 90, region: "Orta Doğu" },
  { code: "QA", days: 90, region: "Orta Doğu" },
  { code: "AZ", days: 90, region: "Asya" },
  // Amerika
  { code: "BR", days: 90, region: "Amerika" },
  { code: "AR", days: 90, region: "Amerika" },
  { code: "CO", days: 90, region: "Amerika" },
  // Afrika
  { code: "MA", days: 90, region: "Afrika" },
  { code: "ZA", days: 30, region: "Afrika" },
];

export const greenPassportCodes = new Set(greenPassportCountries.map((c) => c.code));