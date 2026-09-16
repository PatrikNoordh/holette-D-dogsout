import { useState } from "react";

const STORAGE_KEY = "hdd:presence";

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
  } catch {}
}

export function usePresence() {
  const [overrides, setOverrides] = useState(readOverrides);

  function setPresence(chipNumber, present) {
    setOverrides((prev) => {
      const next = { ...prev, [chipNumber]: present };

      writeOverrides(next);

      return next;
    });
  }

  return { overrides, setPresence };
}
