import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStrings } from "../../strings/LanguageContext";
import { Autoplay, Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import DogCard from "../../components/DogCard/DogCard";
import styles from "./Catalog.module.css";

function Catalog({ dogs, isLoading, error, onRetry, onNavigate }) {
  const { t } = useStrings();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { value: "all", label: t.catalog.all },
    { value: "present", label: t.catalog.here },
    { value: "home", label: t.catalog.away },
  ];

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
    all: t.catalog.emptyAll,
    present: t.catalog.emptyHere,
    home: t.catalog.emptyAway,
  };

  if (isLoading) {
    return (
      <main className={styles.catalog}>
        <p className={styles.emptyState}>{t.common.loading}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.catalog}>
        <p className={styles.emptyState} role="alert">
          {t.common.error}
        </p>
        <button type="button" className={styles.filterButton} onClick={onRetry}>
          {t.common.retry}
        </button>
      </main>
    );
  }

  return (
    <main className={styles.catalog}>
      <header className={styles.header}>
        <h1 className={styles.heading}>{t.catalog.title}</h1>
        <p className={styles.subtitle}>{t.catalog.visitors(presentCount)}</p>
      </header>

      <div
        className={styles.filters}
        aria-label={t.catalog.filterLabel}
        role="group"
      >
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
