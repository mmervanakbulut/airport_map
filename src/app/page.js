"use client";

import dynamic from "next/dynamic";
import { useAirportFilters } from "@/app/hooks/useAirportFilters";
import TypeDropdown from "@/app/components/TypeDropdown";
import CountryDropdown from "@/app/components/CountryDropdown";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function Home() {
  const { selectedTypes, selectedCountries, toggleType, toggleCountry, clearCountries } =
    useAirportFilters();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <header className="h-[10vh] flex items-center justify-between px-8 bg-white dark:bg-zinc-900 shadow z-[9999] relative">
        <h1 className="text-xl font-bold">Dünya Haritası</h1>
        <div className="flex gap-3">
          <TypeDropdown selected={selectedTypes} onToggle={toggleType} />
          <CountryDropdown
            selected={selectedCountries}
            onToggle={toggleCountry}
            onClear={clearCountries}
          />
        </div>
      </header>

      <main className="h-[80vh] w-full px-4 md:px-8 dark:bg-zinc-900 lg:px-32">
        <MapComponent selectedTypes={selectedTypes} selectedCountries={selectedCountries} />
      </main>

      <footer className="h-[10vh] flex items-center justify-center bg-white dark:bg-zinc-900">
        <p className="text-sm text-gray-500">© 2026</p>
      </footer>
    </div>
  );
}