import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import DogCard from "../../components/DogCard/DogCard";
import styles from "./Catalog.module.css";

const filters = [
  { value: "all", label: "All dogs" },
  { value: "present", label: "Here today" },
  { value: "home", label: "At home" },
];

function Catalog({ dogs, isLoading, error, onRetry, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const presentCount = useMemo(
    () => dogs.filter((dog) => dog.present).length,
    [dogs],
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

  if (isLoading) {
    return (
      <main className={styles.catalog}>
        <p className={styles.emptyState}>Loading dogs...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.catalog}>
        <p className={styles.emptyState} role="alert">
          {error}
        </p>
        <button type="button" className={styles.filterButton} onClick={onRetry}>
          Try again
        </button>
      </main>
    );
  }

  return (
    <main className={styles.catalog}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Our dogs</h1>
        <p className={styles.subtitle}>{presentCount} happy visitors today</p>
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
          modules={[Pagination, Autoplay, Grid]}
          slidesPerView={3}
          grid={{
            rows: 2,
            fill: "row",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            376: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          grabCursor
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            type: "bullets",
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
        <p className={styles.emptyState}>{emptyMessages[activeFilter]}</p>
      )}
    </main>
  );
}

export default Catalog;
