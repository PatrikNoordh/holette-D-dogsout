import { useMemo, useRef } from "react";
import AdminRow from "./AdminRow";
import { useStrings } from "../../strings/LanguageContext";
import styles from "./Admin.module.css";

function Admin({ dogs, isLoading, error, onRetry, onToggle }) {
  const { t } = useStrings();

  const orderRef = useRef(null);

  const sortedDogs = useMemo(() => {
    if (dogs.length === 0) return [];

    if (orderRef.current === null) {
      orderRef.current = [...dogs]
        .sort((a, b) => {
          if (a.present !== b.present) {
            return a.present ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        })
        .map((dog) => dog.chipNumber);
    }


    const position = new Map(orderRef.current.map((chip, i) => [chip, i]));
    return [...dogs].sort(
      (a, b) => position.get(a.chipNumber) - position.get(b.chipNumber)
    );
  }, [dogs]);
  

  const presentCount = dogs.filter((dog) => dog.present).length;

  if (isLoading) {
    return (
      <main className={styles.admin}>
        <p className={styles.status}>{t.common.loading}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.admin}>
        <p className={styles.status} role="alert">
          {t.common.error}
        </p>
        <button type="button" className={styles.retry} onClick={onRetry}>
          {t.common.retry}
        </button>
      </main>
    );
  }

  if (dogs.length === 0) {
    return (
      <main className={styles.admin}>
        <p className={styles.status}>{t.common.empty}</p>
      </main>
    );
  }

  return (
    <main className={styles.admin}>
      <header className={styles.header}>
        <h1 className={styles.heading}>{t.admin.title}</h1>
        <p className={styles.subtitle}>
          {t.admin.summary(presentCount, dogs.length)}
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
