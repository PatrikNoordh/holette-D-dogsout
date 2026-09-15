function DogCard({ dog, onSelect }) {
  return (
    <article>
      <h2>{dog.name}</h2>

      <button type="button" onClick={() => onSelect(dog.chipNumber)}>
        View profile
      </button>
    </article>
  );
}

export default DogCard;
