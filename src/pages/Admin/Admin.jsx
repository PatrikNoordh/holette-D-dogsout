import { useMemo } from "react";
import AdminRow from "./AdminRow";
import styles from "./Admin.module.css";

function Admin({ dogs, isLoading, error, onRetry, onToggle }) {
  

  const sortedDogs = useMemo(
    () =>
      [...dogs].sort((a, b) => {
        if (a.present !== b.present) {
          return a.present ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      }),
    [dogs],
  );

  const presentCount = dogs.filter((dog) => dog.present).length;

  if (isLoading) {
    return (
      <main className={styles.admin}>
        <p className={styles.status}>Loading dogs…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.admin}>
        <p className={styles.status} role="alert">{error}</p>
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      </main>
    );
  }

  if (dogs.length === 0) {
    return (
      <main className={styles.admin}>
        <p className={styles.status}>No dogs registered yet.</p>
      </main>
    );
  }

  return (
    <main className={styles.admin}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Admin</h1>
        <p className={styles.subtitle}>
          {presentCount} of {dogs.length} dogs here today
        </p>
      </header>

      <ul className={styles.list}>
        {sortedDogs.map((dog) => (
          <li key={dog.chipNumber}>
            <AdminRow dog={dog} onToggle={onToggle} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Admin;
