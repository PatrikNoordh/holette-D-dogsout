import styles from "./Header.module.css";

function Header({ onNavigate, currentPage, backTo, action }) {
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

      <nav className={styles.nav} aria-label="Main">
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
            onClick={() => onNavigate(item.page)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}

export default Header;
