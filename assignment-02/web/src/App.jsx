import { useState } from 'react';
import Header from './components/Header';
import AllGames from './pages/AllGames';
import SingleGame from './pages/SingleGame';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('all');
  const [selectedGameId, setSelectedGameId] = useState(null);

  const goToSingle = (id) => {
    setSelectedGameId(id);
    setCurrentPage('single');
  };

  const goToAll = () => {
    setSelectedGameId(null);
    setCurrentPage('all');
  };

  return (
    // simple routing to switch between AllGames and SingleGames with the currentPage state
    <div className="app">
      <Header />
      {currentPage === 'all' && (
        <AllGames onGameClick={goToSingle} />
      )}
      {currentPage === 'single' && (
        <SingleGame gameId={selectedGameId} onBack={goToAll} />
      )}
    </div>
  );
}

export default App;
