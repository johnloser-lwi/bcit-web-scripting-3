// AllGames page — the main listing view for the games collection
// Shows all games in a grid, supports genre filtering, and has an "Add Game" button
// that opens a modal form

import { useState, useEffect } from 'react';
import GenreFilter from '../components/GenreFilter';
import GameCard from '../components/GameCard';
import AddGameForm from '../components/AddGameForm';

function AllGames({ onGameClick }) {
  // games holds the array of game objects returned by the API
  const [games, setGames] = useState([]);

  // selectedGenreId is null when showing all genres, or an id number to filter
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  // showAddForm controls whether the Add Game modal is currently visible
  const [showAddForm, setShowAddForm] = useState(false);

  // fetchGames builds the correct URL based on the current genre filter
  // and updates the games state with the API response
  const fetchGames = () => {
    const url = selectedGenreId
      ? `http://localhost:3000/games?genre_id=${selectedGenreId}`
      : 'http://localhost:3000/games';

    fetch(url)
      .then(res => res.json())
      .then(data => setGames(data));
  };

  // Re-run fetchGames whenever the selected genre changes
  // An empty dependency array would only run once on mount, so we use [selectedGenreId]
  useEffect(() => {
    fetchGames();
  }, [selectedGenreId]);

  return (
    <main className="container">
      {/* Page title and the Add Game button live side by side */}
      <div className="page-header">
        <h2>My Video Games Collection</h2>
        <button className="button" onClick={() => setShowAddForm(true)}>
          + Add Game
        </button>
      </div>

      <div className="grid-container">
        {/* Left sidebar: genre filter dropdown */}
        <div className="col-3">
          <GenreFilter
            selectedGenreId={selectedGenreId}
            onGenreChange={setSelectedGenreId}
          />
        </div>

        {/* Main area: grid of GameCard components */}
        <div className="col-9">
          <div className="games-grid">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => onGameClick(game.id)}
              />
            ))}
            {/* Show a friendly message when the filtered list is empty */}
            {games.length === 0 && (
              <p>No games found. Try a different genre or add a new game!</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Game modal — only mounted when showAddForm is true */}
      {showAddForm && (
        <AddGameForm
          onClose={() => setShowAddForm(false)}
          onGameAdded={() => {
            // Refresh the list and close the modal after a successful add
            fetchGames();
            setShowAddForm(false);
          }}
        />
      )}
    </main>
  );
}

export default AllGames;
