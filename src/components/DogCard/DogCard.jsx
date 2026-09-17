import styles from "./DogCard.module.css";
import { useStrings } from "../../strings/LanguageContext";
import placeholderImage from "../../assets/placeholderDog.png";

function DogCard({ dog, onSelect }) {
  const { t } = useStrings();
  const breed = dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1);

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
          <span className={styles.presenceDot} />
        </div>

        <p className={styles.details}>
          {breed}, {t.common.years(dog.age)}
        </p>
        <button
          className={styles.profileButton}
          type="button"
          onClick={() => onSelect(dog.chipNumber)}
        >
          {t.dogCard.viewProfile}
        </button>
      </div>
    </article>
  );
}

export default DogCard;
