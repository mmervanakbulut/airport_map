"use client";

import dynamic from "next/dynamic";
import { useAirportFilters } from "@/app/hooks/useAirportFilters";
import TypeDropdown from "@/app/components/TypeDropdown";
import CountryDropdown from "@/app/components/CountryDropdown";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function Home() {
  const { selectedTypes, selectedCountries, toggleType, toggleCountry, clearCountries, visibleCount } =
    useAirportFilters();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <header className="flex flex-col items-center px-8 py-3 bg-white dark:bg-zinc-900 shadow z-[9999] relative gap-2">
        <h1 className="text-xl font-bold">Dünya Haritası</h1>
        <div className="flex gap-3">
          <TypeDropdown selected={selectedTypes} onToggle={toggleType} visibleCount={visibleCount} />
          <CountryDropdown
            selected={selectedCountries}
            onToggle={toggleCountry}
            onClear={clearCountries}
          />
        </div>
      </header>

      <main className="h-[80vh] w-full px-4 py-4 md:px-8 dark:bg-zinc-900 lg:px-32">
        <MapComponent selectedTypes={selectedTypes} selectedCountries={selectedCountries} />
      </main>

      {/* Yeşil Pasaport Bilgisi */}
      <section className="px-8 py-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
        <h2 className="text-lg font-bold mb-4">Yeşil Pasaportla Vizesiz Gidilebilecek Ülkeler</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              region: "Schengen",
              countries: [
                { name: "Almanya", days: 90 },
                { name: "Fransa", days: 90 },
                { name: "İtalya", days: 90 },
                { name: "İspanya", days: 90 },
                { name: "Yunanistan", days: 90 },
                { name: "Hollanda", days: 90 },
                { name: "İsviçre", days: 90 },
              ],
            },
            {
              region: "Avrupa",
              countries: [
                { name: "Bosna Hersek", days: 90 },
                { name: "Sırbistan", days: 90 },
                { name: "Karadağ", days: 90 },
                { name: "Arnavutluk", days: 90 },
                { name: "Gürcistan", days: 365 },
                { name: "Ukrayna", days: 90 },
              ],
            },
            {
              region: "Asya & Orta Doğu",
              countries: [
                { name: "Japonya", days: 90 },
                { name: "Güney Kore", days: 90 },
                { name: "Singapur", days: 90 },
                { name: "BAE", days: 90 },
                { name: "Katar", days: 90 },
                { name: "Azerbaycan", days: 90 },
              ],
            },
            {
              region: "Amerika",
              countries: [
                { name: "Brezilya", days: 90 },
                { name: "Arjantin", days: 90 },
                { name: "Kolombiya", days: 90 },
              ],
            },
            {
              region: "Afrika",
              countries: [
                { name: "Fas", days: 90 },
                { name: "Güney Afrika", days: 30 },
              ],
            },
          ].map(({ region, countries }) => (
            <div key={region}>
              <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                {region}
              </h3>
              <ul className="space-y-1">
                {countries.map(({ name, days }) => (
                  <li key={name} className="flex items-center justify-between text-sm">
                    <span>{name}</span>
                    <span className="text-xs text-green-600 font-semibold ml-2">{days}g</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="h-[10vh] flex items-center justify-center bg-white dark:bg-zinc-900">
        <p className="text-sm text-gray-500 mx-4">
          © 2026
          </p>
        <a href="https://www.flypgs.com/" target="_blank" className="text-blue-500 hover:underline mx-4">
          pegasus
        </a>
        <a href="https://ajet.com/tr" target="_blank" className="text-blue-500 hover:underline mx-4">
          ajet
        </a>
        <a href="https://www.turkishairlines.com/tr-tr/" target="_blank" className="text-blue-500 hover:underline mx-4">
          thy
        </a>
      </footer>
    </div>
  );
}