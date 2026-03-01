"use client";

import { useState } from "react";
import { typeIconMap } from "@/app/airportData";

/**
 * Havalimanı tipine göre çoklu seçim dropdown'u.
 * @param {{ selected: string[], onToggle: (type: string) => void }} props
 */
export default function TypeDropdown({ selected, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm flex items-center gap-2"
      >
        ✈️ Tip{selected.length > 0 && ` (${selected.length})`}
        <span className="text-xs">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg flex flex-col z-[9999]">
          {Object.entries(typeIconMap).map(([value, def]) => (
            <label
              key={value}
              className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => onToggle(value)}
                className="w-4 h-4 accent-blue-500"
              />
              <span>{def.html} {def.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
