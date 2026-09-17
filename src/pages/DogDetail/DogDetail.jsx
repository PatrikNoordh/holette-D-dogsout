import { useDogs } from '../../hooks/useDogs'
import styles from './DogDetail.module.css'

function DogDetail({ chipNumber, onNavigate }) {

  const { dogs, isLoading, error  } = useDogs()

  if (isLoading) {
    return ( 
    <main className={styles.page}>
      <p>Loading...</p>
    </main>
    
  )
  
}

  if (error) {
    return(
    <main className={styles.page}>
      <p>{error} </p>
    </main>
    
  )
  
}

  const dog = dogs.find((dog) => dog.chipNumber === chipNumber)

  if (!dog) {
    return (
       <main className={styles.page}>
          <p>Dog not found.</p>
      <button
        className={styles.catalogButton} 
        type="button" 
        onClick = {() => onNavigate('catalog')} 
      >
        Back to catalog
      </button>
    </main>
    
  )
  
}

return (
  <main className={styles.page}>
    <div className={styles.card}>


    <img
      className={styles.image} 
      src={dog.img}
      alt={dog.name}
    />

    <h1 className={styles.name}>{dog.name}</h1>
    <p className={styles.breed}>{dog.breed}</p>

    <div className={styles.chips}>
    <span className={styles.chip}>{dog.age} years</span>

    <span className={styles.chip}>{dog.sex === 'female' ? 'Female' : 'Male'}
    </span>

    <span 
      className={`${styles.chip} ${dog.present ? styles.present : styles.home }`}
      >
      {dog.present ? 'Here today' : 'At home'}
      </span>
      </div>

      <button
        className={styles.catalogButton}
        type="button"
        onClick={() => onNavigate('catalog')}
      >
        Back to our dogs
      </button>

    </div>  
  </main>
)
}

export default DogDetail;
