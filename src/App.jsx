import { useState } from 'react'
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

  if (page === 'catalog') {
    return <Catalog onNavigate={navigate} />;
  }

  if (page === 'detail') {
    return <DogDetail chipNumber={selectedChip} onNavigate={navigate} />;
  }

  return <Home onNavigate={navigate} />;

}

export default App;
