function DogDetail({ chipNumber, onNavigate }) {   // ← chipNumber comes as a prop,
                                                   //   not from a URL. App.jsx
                                                   //   owns it.
  return (
    <main>
      <h1>Dog detail</h1>
      <p>Placeholder for chip {chipNumber}</p>   {/* ← TEMPORARY. Shown only to
                                                        prove the prop arrives.
                                                        HDD-009 must remove it —
                                                        chipNumber is never
                                                        rendered publicly. */}
      <button type="button" onClick={() => onNavigate('catalog')}>
        Back to catalog
      </button>
    </main>
  );
}

export default DogDetail;