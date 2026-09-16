import { useState, useEffect } from "react";
import { fetchDogs } from "../api/dogs";

export function useDogs() {
  const [dogs, setDogs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    async function load() {
      try {
        const data = await fetchDogs({ signal: controller.signal });
        setDogs(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError("Could not load the dogs. Try again.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => controller.abort();
  }, [attempt]);

  function reload() {
    setAttempt((a) => a + 1);
  }

  return { dogs, isLoading, error, reload };
}
