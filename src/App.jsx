import { useState } from 'react'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import DogDetail from './pages/DogDetail/DogDetail';
import Admin from './pages/Admin/Admin';



function App() {
  const [page, setPage] = useState('home');
  const [selectedChip, setSelectedChip] = useState(null);

  function navigate(to, chip = null) {
    setPage(to);
    setSelectedChip(chip);
  }

    let content = <Home onNavigate={navigate} />;

  if (page === 'catalog') {
    content = <Catalog onNavigate={navigate} />;
  }

  if (page === 'detail') {
    content = <DogDetail chipNumber={selectedChip} onNavigate={navigate} />;
  }

  if (page === 'admin') {
    content = <Admin />;
  }

  const backTo = { detail: 'catalog', admin: 'home'} [page];

  

  return (
    <>
    <Header
      onNavigate={navigate}
      currentPage={page}
      backTo={backTo}
      action={
        page === 'home' ? (
          <button type="button" onClick={() => navigate('admin')}>
            Admin
          </button>
        ) : undefined
      }
    />
    {content}
    </>
  )

  

}

export default App;
