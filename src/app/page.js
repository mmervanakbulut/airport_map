"use client";

import dynamic from "next/dynamic";
import { useAirportFilters } from "@/app/hooks/useAirportFilters";
import TypeDropdown from "@/app/components/TypeDropdown";
import CountryDropdown from "@/app/components/CountryDropdown";
import { useState, useEffect } from "react";
import { visaFreeCountriesByRegion } from "@/app/visaCountries";


const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function Home() {
  const { selectedTypes, selectedCountries, toggleType, toggleCountry, clearCountries, visibleCount } =
    useAirportFilters();
  const [openDropdown, setOpenDropdown] = useState(null); // "type" | "country" | null

  const toggleDropdown = (name) => setOpenDropdown((prev) => (prev === name ? null : name));

  // Dışarı tıklandığında kapat
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("[data-dropdown]")) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <header className="flex flex-col items-center px-8 py-3 bg-white dark:bg-zinc-900 shadow z-[9999] relative gap-2">
        <h1 className="text-xl font-bold">Dünya Haritası</h1>
        <div className="flex gap-3">
          <TypeDropdown
            selected={selectedTypes}
            onToggle={toggleType}
            visibleCount={visibleCount}
            open={openDropdown === "type"}
            onOpenToggle={() => toggleDropdown("type")}
          />
          <CountryDropdown
            selected={selectedCountries}
            onToggle={toggleCountry}
            onClear={clearCountries}
            open={openDropdown === "country"}
            onOpenToggle={() => toggleDropdown("country")}
          />
        </div>
      </header>

      <main className="h-[80vh] w-full px-4 py-4 md:px-8 dark:bg-zinc-900 lg:px-32">
        <MapComponent selectedTypes={selectedTypes} selectedCountries={selectedCountries} />
      </main>

      {/* Vizesiz ulkeler bilgisi */}
      <section className="px-8 py-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
        <h2 className="text-lg font-bold mb-4">Vizesiz Gidilebilecek Ülkeler</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {visaFreeCountriesByRegion.map(({ region, countries }) => (
            <div key={region}>
              <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                {region}
              </h3>

              {countries.some((c) => !c.bordo) && (
                <>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Sadece Yeşil</p>
                  <ul className="space-y-1 mb-3">
                    {countries
                      .filter((c) => !c.bordo)
                      .map(({ name, days }) => (
                        <li key={name} className="flex items-center justify-between text-base font-bold">
                          <span>{name}</span>
                          <span className="text-base text-green-600 font-semibold ml-2">{days}g</span>
                        </li>
                      ))}
                  </ul>
                </>
              )}

              {countries.some((c) => c.bordo) && (
                <>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Yeşil & Bordo</p>
                  <ul className="space-y-1">
                    {countries
                      .filter((c) => c.bordo)
                      .map(({ name, days }) => (
                        <li key={name} className="flex items-center justify-between text-base font-bold">
                          <span>{name}</span>
                          <span className="text-base text-blue-600 font-semibold ml-2">{days}g</span>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center justify-center py-4 bg-white dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <a href="https://www.flypgs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-base">pegasus</a>
          <a href="https://ajet.com/tr" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-base">ajet</a>
          <a href="https://www.turkishairlines.com/tr-tr/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-base">thy</a>
          <a href="https://www.wego.com.tr/en/flights" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-base">wego</a>
          <a href="https://www.enuygun.com/ucak-bileti/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-base">enuygun</a>
        </div>
        <p className="text-base text-gray-400 mt-2">© 2026</p>
      </footer>
    </div>
  );
}