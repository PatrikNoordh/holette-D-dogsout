import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination,} from "swiper/modules";
import { useDogs } from "../../hooks/useDogs";


import "swiper/css";
import "swiper/css/navigation";

import DogCard from "../../components/DogCard/DogCard";
import styles from "./Catalog.module.css";




const filters = [
  { value: "all", label: "All dogs" },
  { value: "present", label: "Here today" },
  { value: "home", label: "At home" },
];

function Catalog({ onNavigate }) {
  const { dogs, isLoading, error, reload } = useDogs();
  const [activeFilter, setActiveFilter] = useState("all");

  const presentCount = useMemo(
    () => dogs.filter((dog) => dog.present).length,
    [dogs]
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
  }, [activeFilter, dogs]);

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
          pagination={false}
          

          spaceBetween={16}
          slidesPerView={1}
          
          
          breakpoints={{
            600: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
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