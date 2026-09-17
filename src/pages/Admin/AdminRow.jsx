import styles from "./AdminRow.module.css";
import { useStrings } from "../../strings/LanguageContext";
import placeholderImage from "../../assets/placeholderDog.png";

function AdminRow({ dog, onToggle }) {
  const { t } = useStrings();
  const breed = dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1);
  const sex = dog.sex === "female" ? t.common.female : t.common.male;
  const { owner } = dog;

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = placeholderImage;
  };

  return (
    <article className={`${styles.card} ${!dog.present ? styles.away : ""}`}>
      <img
        className={styles.thumbnail}
        src={dog.img || placeholderImage}
        alt={dog.name}
        onError={handleImageError}
      />

      <div className={styles.content}>
        <div className={styles.nameRow}>
          <h2 className={styles.name}>{dog.name}</h2>
          <span className={styles.presenceDot} aria-hidden="true" />
        </div>

        <p className={styles.details}>{breed}</p>
        <p className={styles.details}>
          {t.common.years(dog.age)} · {sex}
        </p>

        <p className={styles.meta}>
          {t.admin.chip}: {dog.chipNumber}
        </p>

        <p className={styles.meta}>
          {t.admin.owner}: {owner.name} {owner.lastName}
        </p>

        <a className={styles.phone} href={`tel:${owner.phoneNumber}`}>
          {owner.phoneNumber}
        </a>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={dog.present}
        aria-label={t.admin.switchLabel(dog.name, dog.present)}
        className={styles.switch}
        onClick={() => onToggle(dog.chipNumber)}
      >
        <span className={styles.knob} aria-hidden="true" />
        <span className={styles.switchLabel}>
          {dog.present ? t.admin.here : t.admin.away}
        </span>
      </button>
    </article>
  );
}

export default AdminRow;
