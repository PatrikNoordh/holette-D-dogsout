import { useState } from "react";
import styles from "./Header.module.css";

function Header({ onNavigate, currentPage, backTo, action }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { page: "home", label: "Home" },
    { page: "catalog", label: "Our dogs" },
  ];

  return (
    <header className={styles.header}>
      {backTo ? (
        <button
          type="button"
          className={styles.back}
          onClick={() => onNavigate(backTo)}
        >
          ← Back
        </button>
      ) : (
        <button
          type="button"
          className={styles.title}
          onClick={() => onNavigate("home")}
        >
          <img
            className={styles.logo}
            src="public/android-chrome-192x192.png"
            alt=""
          />
          <span>Holette D Dogsout</span>
        </button>
      )}

      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
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
        {action && <div className={styles.action}>{action}</div>}
      </nav>

    </header>
  );
}

export default Header;
