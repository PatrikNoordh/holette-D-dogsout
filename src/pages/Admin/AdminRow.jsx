import styles from "./AdminRow.module.css";

function AdminRow({ dog, onToggle }) {
  const breed = dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1);
  const sex = dog.sex === "female" ? "Female" : "Male";
  const { owner } = dog;

  return (
    <article className={`${styles.card} ${!dog.present ? styles.away : ""}`}>
      <img className={styles.thumbnail} src={dog.img} alt={dog.name} />

      <div className={styles.content}>
        <div className={styles.nameRow}>
          <h2 className={styles.name}>{dog.name}</h2>
          <span className={styles.presenceDot} aria-hidden="true" />
        </div>

        <p className={styles.details}>
          {breed}, {dog.age} years, {sex}
        </p>

        <p className={styles.meta}>Chip: {dog.chipNumber}</p>

        <p className={styles.meta}>
          Owner: {owner.name} {owner.lastName}
        </p>

        <a className={styles.phone} href={`tel:${owner.phoneNumber}`}>
          {owner.phoneNumber}
        </a>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={dog.present}
        aria-label={`${dog.name} is ${dog.present ? "here" : "away"}`}
        className={styles.switch}
        onClick={() => onToggle(dog.chipNumber)}
      >
        <span className={styles.knob} aria-hidden="true" />
        <span className={styles.switchLabel}>
          {dog.present ? "Here" : "Away"}
        </span>
      </button>
    </article>
  );
}

export default AdminRow;
