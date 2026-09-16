import { useState } from "react";

const STORAGE_KEY = "hdd:presence";

// localStorage is external data — guard it like the API.
// Anything that isn't a plain object becomes {}.
function readOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function writeOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // Storage disabled or full. State still updates; it just won't survive refresh.
  }
}

// Per-dog presence overrides, keyed by chipNumber.
// Knows nothing about dogs or the API — just a persisted { [key]: boolean } map.
export function usePresence() {
    // Function reference, not a call: React reads storage once on first render only.
  const [overrides, setOverrides] = useState(readOverrides);

  function setPresence(chipNumber, present) {
    setOverrides((prev) => {
      const next = { ...prev, [chipNumber]: present };

      // Write in the same step so state and storage never disagree.
      writeOverrides(next);

      return next;
    });
  }

  return { overrides, setPresence };
}
