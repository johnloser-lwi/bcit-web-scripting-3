// Root App component — manages which "page" is currently displayed
// Instead of React Router, we use a currentPage state string to switch views:
//   'all'    → shows the full game listing (AllGames)
//   'single' → shows the detail view for one selected game (SingleGame)

import { useState } from 'react';
import Header from './components/Header';
import AllGames from './pages/AllGames';
import SingleGame from './pages/SingleGame';
import './App.css';

function App() {
  // currentPage tracks which view to render
  const [currentPage, setCurrentPage] = useState('all');

  // selectedGameId stores the id of the game the user clicked on
  const [selectedGameId, setSelectedGameId] = useState(null);

  // Called when the user clicks a GameCard — switches to the single-game view
  const goToSingle = (id) => {
    setSelectedGameId(id);
    setCurrentPage('single');
  };

  // Called when the user hits the Back button in SingleGame — returns to the listing
  const goToAll = () => {
    setSelectedGameId(null);
    setCurrentPage('all');
  };

  return (
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
