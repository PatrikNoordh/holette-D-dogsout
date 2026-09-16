import { useState, useEffect } from "react";
import { fetchDogs } from "../api/dogs";

// Loading / error / data state around fetchDogs.
// Pages call this; they never fetch directly.
export function useDogs() {
  const [dogs, setDogs] = useState([]);

  // Starts true: the fetch fires on mount, so false would flash "no dogs" first.
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  // Reload counter. Its value is irrelevant — changing it re-runs the effect.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Lets cleanup cancel the request on unmount or reload.
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    async function load() {
      try {
        const data = await fetchDogs({ signal: controller.signal });
        setDogs(data);
      } catch (err) {
        // An aborted request is not a failure — leave state alone.
        if (err.name === "AbortError") return;

        // Plain text for the user; err.message stays in the console.
        setError("Could not load the dogs. Try again.");
      } finally {
        // If we were aborted, a newer run owns the loading flag now.
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
