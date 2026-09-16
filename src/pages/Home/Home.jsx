import { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import { Autoplay, Pagination, EffectFade, Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
const baseUrl = import.meta.env.BASE_URL;

function syncVideosWithActiveSlide(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  swiper.el.querySelectorAll("video").forEach((video) => {
    if (video.closest(".swiper-slide") === activeSlide) {
      video.currentTime = 0;
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}

// TODO: Ska vara API anrop här (18 och 7 är bara  exempel)
async function fetchDogStats() {
  return { totalDogs: 18, dogsToday: 7 };
}

function Home({ onNavigate }) {
  const swiperRef = useRef(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    fetchDogStats().then((data) => {
      if (!isCancelled) setStats(data);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <main className={styles.home}>
      <section className={styles["dog-carousel-section"]}>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1.1}
          spaceBetween={16}
          loop
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          pagination={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncVideosWithActiveSlide(swiper);
          }}
          onSlideChange={syncVideosWithActiveSlide}

          // *VIdeolänkar */
        >
          <SwiperSlide data-swiper-autoplay="10000">
            <figure className={styles.card}>
              <video
                src={`${baseUrl}videos/dog-playing.mp4`}
                muted
                playsInline
              />
            </figure>
          </SwiperSlide>
          <SwiperSlide data-swiper-autoplay="10000">
            <figure className={styles.card}>
              <video src={`${baseUrl}videos/hundlek.mp4`} muted playsInline />
            </figure>
          </SwiperSlide>

          <SwiperSlide data-swiper-autoplay="10000">
            <figure className={styles.card}>
              <video src={`${baseUrl}videos/hundhem.mp4`} muted playsInline />
            </figure>
          </SwiperSlide>
        </Swiper>
      </section>

      <h1 className={styles.title}>Välkommen!</h1>
      <p className={styles.subtitle}>
        En trygg, rolig och aktiv dag för din bästa vän.
      </p>

      <button
        type="button"
        className={styles.ctaButton}
        onClick={() => onNavigate("catalog")}
      >
        Se våra hundar
      </button>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {stats ? stats.totalDogs : "…"}
          </span>
          <span className={styles.statLabel}>i registret</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {stats ? stats.dogsToday : "…"}
          </span>
          <span className={styles.statLabel}>här idag</span>
        </div>
      </div>

      <footer className={styles.footer}>Öppet vardagar 07:00–18:00</footer>
    </main>
  );
}

export default Home;
