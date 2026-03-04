"use client";

import { useState, useMemo } from "react";
import { allAirports } from "@/app/airportData";

/**
 * Havalimanı tip ve ülke filtrelerinin state yönetimi.
 * Saf mantık — UI içermez.
 */
export function useAirportFilters() {
  const [selectedTypes, setSelectedTypes] = useState(["large_airport"]);
  const [selectedCountries, setSelectedCountries] = useState(["TR"]);

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const toggleCountry = (code) =>
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );

  const clearCountries = () => setSelectedCountries([]);

  const visibleCount = useMemo(
    () =>
      allAirports.filter(
        (a) =>
          selectedTypes.includes(a.type) &&
          (selectedCountries.length === 0 || selectedCountries.includes(a.iso_country))
      ).length,
    [selectedTypes, selectedCountries]
  );

  return { selectedTypes, selectedCountries, toggleType, toggleCountry, clearCountries, visibleCount };
}
