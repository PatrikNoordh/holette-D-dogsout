import { useState } from "react";
import { useStrings } from "../../strings/LanguageContext";
import styles from "./Header.module.css";

function Header({ onNavigate, currentPage, backTo, action }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useStrings();
  const navItems = [
    { page: "home", label: t.header.home },
    { page: "catalog", label: t.header.ourDogs },
  ];

  return (
    <header className={styles.header}>
      {backTo ? (
        <button
          type="button"
          className={styles.back}
          onClick={() => onNavigate(backTo)}
        >
          {t.header.back}
        </button>
      ) : (
        <button
          type="button"
          className={styles.title}
          onClick={() => onNavigate("home")}
        >
          <img
            className={styles.logo}
            src={`${import.meta.env.BASE_URL}android-chrome-192x192.png`}
            alt=""
          />
          <span>Holette D Dogsout</span>
        </button>
      )}

      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={t.header.menu}
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>
      <nav
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        aria-label="Main"
      >
        {navItems.map((item) => (
          <button
            key={item.page}
            type="button"
            className={
              item.page === currentPage
                ? `${styles.navButton} ${styles.navButtonActive}`
                : styles.navButton
            }
            aria-current={item.page === currentPage ? "page" : undefined}
            onClick={() => {
              onNavigate(item.page);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          className={styles.navButton}
          lang={lang === "en" ? "sv" : "en"}
          aria-label={t.header.switchTo}
          onClick={() => {
            setLang(lang === "en" ? "sv" : "en");
            setMenuOpen(false);
          }}
        >
          {t.header.switchShort}
        </button>
        {action && <div className={styles.action}>{action}</div>}
      </nav>
    </header>
  );
}

export default Header;
