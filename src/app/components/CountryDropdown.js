"use client";

import { useState, useMemo } from "react";
import { countryList } from "@/app/airportData";

export default function CountryDropdown({ selected, onToggle, onClear, open, onOpenToggle }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => countryList.filter((c) =>
      c.name.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr"))
    ),
    [search]
  );

  return (
    <div className="relative" data-dropdown>
      <button
        onClick={onOpenToggle}
        className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm flex items-center gap-2"
      >
        🌍 Ülke{selected.length > 0 ? ` (${selected.length})` : " (Tümü)"}
        <span className="text-xs">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg flex flex-col z-[9999] max-h-80">
          <div className="p-2 border-b border-zinc-200 dark:border-zinc-600">
            <input
              type="text"
              placeholder="Ülke ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-sm rounded border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 outline-none"
              autoFocus
            />
          </div>

          <button
            onClick={onClear}
            className="text-xs text-blue-500 px-4 py-1.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 border-b border-zinc-100 dark:border-zinc-600"
          >
            {selected.length > 0 ? "❌ Seçimi Temizle" : "✅ Tümü (seçim yok)"}
          </button>

          <div className="overflow-y-auto">
            {filtered.map(({ code, name }) => (
              <label
                key={code}
                className="flex items-center gap-3 px-4 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(code)}
                  onChange={() => onToggle(code)}
                  className="w-4 h-4 accent-blue-500"
                />
                {name}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}