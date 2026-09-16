import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import DogCard from "../../components/DogCard/DogCard";
import styles from "./Catalog.module.css";

const dogs = [
  
 //Hårdkodat vi ändrar den sen när vi har fixat med API :D
  /* { chipNumber: "DOG-001", name: "Milo", present: true, imageUrl: "https://s3.animalia.bio/pets/animals/photos/full/1x1/KbUZShTV58b44zK17o0gTyRPUJ4fXDjPIChE1RBX.webp?id=d9a66f40bbaf3f470adfdf0c4bb05e7a" },
  { chipNumber: "DOG-002", name: "Luna", present: true, imageUrl: "https://cdn.britannica.com/44/233244-050-A65D4571/Chihuahua-dog.jpg" },
  { chipNumber: "DOG-003", name: "Otis", present: false, imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Rusty.jpg/960px-Rusty.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail" },
  { chipNumber: "DOG-004", name: "Nala", present: true, imageUrl: "https://static01.nyt.com/images/2024/06/30/multimedia/30sp-scipet-manifesto-vzjw/30sp-scipet-manifesto-vzjw-articleLarge.jpg?quality=75&auto=webp&disable=upscale" },
  { chipNumber: "DOG-005", name: "Tony", present: true, imageUrl: "https://s3.animalia.bio/pets/animals/photos/full/1x1/KbUZShTV58b44zK17o0gTyRPUJ4fXDjPIChE1RBX.webp?id=d9a66f40bbaf3f470adfdf0c4bb05e7a" },
  { chipNumber: "DOG-006", name: "Edgar", present: true, imageUrl: "https://cdn.britannica.com/44/233244-050-A65D4571/Chihuahua-dog.jpg" },
  { chipNumber: "DOG-007", name: "Daisy", present: false, imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Rusty.jpg/960px-Rusty.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail" },
  { chipNumber: "DOG-008", name: "Bimbi", present: true, imageUrl: "https://static01.nyt.com/images/2024/06/30/multimedia/30sp-scipet-manifesto-vzjw/30sp-scipet-manifesto-vzjw-articleLarge.jpg?quality=75&auto=webp&disable=upscale" },
   */
];

const filters = [
  { value: "all", label: "All dogs" },
  { value: "present", label: "Here today" },
  { value: "home", label: "At home" },
];

function Catalog({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const presentCount = useMemo(
    () => dogs.filter((dog) => dog.present).length,
    []
  );

  const filteredDogs = useMemo(() => {
    switch (activeFilter) {
      case "present":
        return dogs.filter((dog) => dog.present);
      case "home":
        return dogs.filter((dog) => !dog.present);
      default:
        return dogs;
    }
  }, [activeFilter]);

  const emptyMessages = {
    all: "No dogs to show right now.",
    present: "No dogs are here right now.",
    home: "All dogs are here today.",
  };

  return (
    <main className={styles.catalog}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Our dogs</h1>
        <p className={styles.subtitle}>
          {presentCount} happy visitors today
        </p>
      </header>

      <div className={styles.filters} aria-label="Filter dogs" role="group">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`${styles.filterButton} ${
              activeFilter === filter.value ? styles.activeFilter : ""
            }`}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredDogs.length > 0 ? (
        <Swiper
          key={activeFilter}
          className={styles.swiper}
          modules={[Navigation, A11y, Pagination]}
          pagination={true}

          spaceBetween={16}
          slidesPerView={1}
          
          
          breakpoints={{
            600: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2.1,
              spaceBetween: 24,
            },
          }}
          a11y={{
            prevSlideMessage: "Previous dogs",
            nextSlideMessage: "Next dogs",
          }}
        >
          {filteredDogs.map((dog) => (
            <SwiperSlide key={dog.chipNumber} className={styles.slide}>
              <DogCard
                dog={dog}
                onSelect={(chip) => onNavigate("detail", chip)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className={styles.emptyState}>
          {emptyMessages[activeFilter]}
        </p>
      )}
    </main>
  );
}

export default Catalog;