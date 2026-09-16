import styles from "./DogCard.module.css";

function DogCard({ dog, onSelect }) {
  const breed = dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1);

  return (
    <article className={`${styles.card} ${!dog.present ? styles.away :""}`}>
      <img className={styles.thumbnail} src={dog.img} alt={dog.name} />

      <div className={styles.content}>
        <div className={styles.nameRow}>
          <h2 className={styles.name}>{dog.name}</h2>
          <span className={styles.presenceDot} />
        </div>

        <p className={styles.details}>
          {breed}, {dog.age} years
        </p>
        <button
          className={styles.profileButton}
          type="button"
          onClick={() => onSelect(dog.chipNumber)}
        >
          View profile →
        </button>
      </div>
    </article>
  );
}

export default DogCard;
