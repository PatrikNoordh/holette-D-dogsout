import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import DogDetail from "./pages/DogDetail/DogDetail";
import Admin from "./pages/Admin/Admin";
import { useDogs } from "./hooks/useDogs";

function App() {
  const [page, setPage] = useState("home");
  const [selectedChip, setSelectedChip] = useState(null);

  const { dogs, isLoading, error, reload, togglePresence } = useDogs();

  function navigate(to, chip = null) {
    setPage(to);
    setSelectedChip(chip);
  }

  const pageProps = {
    dogs,
    isLoading,
    error,
    onRetry: reload,
    onNavigate: navigate,
  };

  let content = <Home {...pageProps} />;

  if (page === "catalog") {
    content = <Catalog {...pageProps} />;
  }

  if (page === "detail") {
    content = <DogDetail {...pageProps} chipNumber={selectedChip} />;
  }

  if (page === "admin") {
    content = <Admin {...pageProps} onToggle={togglePresence} />;
  }

  const backTo = { detail: "catalog", admin: "home" }[page];

  return (
    <>
      <Header
        onNavigate={navigate}
        currentPage={page}
        backTo={backTo}
        action={
          page === "home" ? (
            <button type="button" onClick={() => navigate("admin")}>
              Admin
            </button>
          ) : undefined
        }
      />
      {content}
    </>
  );
}

export default App;
