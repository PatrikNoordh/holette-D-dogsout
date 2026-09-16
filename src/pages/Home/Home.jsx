import { useRef } from "react";
import styles from "./Home.module.css";
import { useDogs } from "../../hooks/useDogs";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
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

function Home({ onNavigate }) {
  const swiperRef = useRef(null);
  const { dogs, isLoading } = useDogs();
  const dogsToday = dogs.filter((dog) => dog.present).length;

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

      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.subtitle}>
        A safe, fun, and active day for your best friend.
      </p>

      <button
        type="button"
        className={styles.ctaButton}
        onClick={() => onNavigate("catalog")}
      >
        See our dogs
      </button>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {isLoading ? "..." : dogs.length}
          </span>
          <span className={styles.statLabel}>in the register</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {isLoading ? "..." : dogsToday}
          </span>
          <span className={styles.statLabel}>here today</span>
        </div>
      </div>

      <footer className={styles.footer}>Open weekdays 07:00–18:00</footer>
    </main>
  );
}

export default Home;
