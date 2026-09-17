import styles from "./DogDetail.module.css";
import { useStrings } from "../../strings/LanguageContext";
import placeholderImage from "../../assets/placeholderDog.png";

function DogDetail({
  dogs,
  isLoading,
  error,
  onRetry,
  chipNumber,
  onNavigate,
}) {
  const { t } = useStrings();

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = placeholderImage;
  };

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p>{t.common.loading}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <p role="alert">{t.common.error}</p>
        <button
          className={styles.catalogButton}
          type="button"
          onClick={onRetry}
        >
          {t.common.retry}
        </button>
      </main>
    );
  }

  const dog = dogs.find((dog) => dog.chipNumber === chipNumber);

  if (!dog) {
    return (
      <main className={styles.page}>
        <p>{t.dogDetail.notFound}</p>
        <button
          className={styles.catalogButton}
          type="button"
          onClick={() => onNavigate("catalog")}
        >
          {t.dogDetail.backToCatalog}
        </button>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <img
          className={styles.image}
          src={dog.img || placeholderImage}
          alt={dog.name}
          onError={handleImageError}
        />

        <h1 className={styles.name}>{dog.name}</h1>
        <p className={styles.breed}>{dog.breed}</p>

        <div className={styles.chips}>
          <span className={styles.chip}>{t.common.years(dog.age)}</span>

          <span className={styles.chip}>
            {dog.sex === "female" ? t.common.female : t.common.male}
          </span>

          <span
            className={`${styles.chip} ${dog.present ? styles.present : styles.home}`}
          >
            {dog.present ? t.common.hereToday : t.common.atHome}
          </span>
        </div>

        <button
          className={styles.catalogButton}
          type="button"
          onClick={() => onNavigate("catalog")}
        >
          {t.dogDetail.backToCatalog}
        </button>
      </div>
    </main>
  );
}

export default DogDetail;
