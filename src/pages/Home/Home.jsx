function Home({ onNavigate }) {
  return (
    <main>
      <h1>Home</h1>
      <button type="button" onClick={() => onNavigate("catalog")}>
        See our dogs
      </button>
    </main>
  );
}

export default Home;
