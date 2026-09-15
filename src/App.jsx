import { useState } from 'react'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import DogDetail from './pages/DogDetail/DogDetail';



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

  

  return (
    <>
    <Header
      onNavigate={navigate}
      currentPage={page}
      backTo={page === 'detail' ? 'catalog' : undefined}
    />
    {content}
    </>
  )

  

}

export default App;
