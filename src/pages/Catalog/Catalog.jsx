function Catalog({ onNavigate }) {
  return (
    <main>
      <h1>Catalog</h1>
      <button type="button" onClick={() => onNavigate('detail', 'IEH455006')}>
        View a dog
      </button>                         {/* ← hardcoded chip for now; HDD-008
                                              replaces this with real DogCards */}
    </main>
  );
}

export default Catalog;