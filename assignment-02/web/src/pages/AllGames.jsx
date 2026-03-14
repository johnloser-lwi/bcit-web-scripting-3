import { useState, useEffect } from 'react';
import GenreFilter from '../components/GenreFilter';
import GameCard from '../components/GameCard';
import AddGameForm from '../components/AddGameForm';

function AllGames({ onGameClick }) {
  const [games, setGames] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchGames = () => {
    // if there's a selectedGenreId defined add the genere id in the url as parameters
    const url = selectedGenreId
      ? `http://localhost:3000/games?genre_id=${selectedGenreId}`
      : 'http://localhost:3000/games';

    fetch(url)
      .then(res => res.json())
      .then(data => setGames(data));
  };

  // whenever selectedGenereId changes, fetch the games
  useEffect(() => {
    fetchGames();
  }, [selectedGenreId]);

  return (
    <main className="container">
      <div className="page-header">
        <h2>My Video Games Collection</h2>
        <button className="button" onClick={() => setShowAddForm(true)}>
          + Add Game
        </button>
      </div>

      <div className="grid-container">
        <div className="col-3">
          <GenreFilter
            selectedGenreId={selectedGenreId}
            onGenreChange={setSelectedGenreId}
          />
        </div>

        <div className="col-9">
          <div className="games-grid">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                // pass in the id of the game clicked so the simple routing in App.js can know what game to display when showing SingleGame page
                onClick={() => onGameClick(game.id)}
              />
            ))}
            {games.length === 0 && (
              <p>No games found. Try a different genre or add a new game!</p>
            )}
          </div>
        </div>
      </div>

      {/* Display the add game form is showAddForm is true*/}
      {/* define the 2 events onClose and onGameAdded */}
      {showAddForm && (
        <AddGameForm
          onClose={() => setShowAddForm(false)}
          onGameAdded={() => {
            fetchGames();
            setShowAddForm(false);
          }}
        />
      )}
    </main>
  );
}

export default AllGames;
