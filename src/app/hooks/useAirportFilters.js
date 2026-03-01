"use client";

import { useState } from "react";

/**
 * Havalimanı tip ve ülke filtrelerinin state yönetimi.
 * Saf mantık — UI içermez.
 */
export function useAirportFilters() {
  const [selectedTypes, setSelectedTypes] = useState(["large_airport"]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const toggleCountry = (code) =>
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );

  const clearCountries = () => setSelectedCountries([]);

  return { selectedTypes, selectedCountries, toggleType, toggleCountry, clearCountries };
}
