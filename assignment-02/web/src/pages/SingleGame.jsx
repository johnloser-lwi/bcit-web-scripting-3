// SingleGame page — displays full details for one selected game
// Provides Edit (opens a modal form) and Delete (calls the API directly) actions

import { useState, useEffect } from 'react';
import EditGameForm from '../components/EditGameForm';

function SingleGame({ gameId, onBack }) {
  // game holds the single game object fetched from the API
  const [game, setGame] = useState(null);

  // showEditForm controls whether the Edit Game modal is visible
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch the game's full data from the API using its id
  const fetchGame = () => {
    fetch(`http://localhost:3000/games/${gameId}`)
      .then(res => res.json())
      .then(data => setGame(data));
  };

  // Run fetchGame once when the component mounts (or if gameId changes)
  useEffect(() => {
    fetchGame();
  }, [gameId]);

  // Delete button handler — asks for confirmation, then calls the DELETE endpoint
  // and navigates back to the AllGames listing on success
  const handleDelete = () => {
    if (!window.confirm(`Delete "${game.title}"? This cannot be undone.`)) return;

    fetch(`http://localhost:3000/games/${gameId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => onBack());
  };

  // Show a loading indicator while the fetch is in progress
  if (!game) {
    return (
      <main className="container">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      {/* Back button returns the user to the full games listing */}
      <button className="button" onClick={onBack}>
        Back to All Games
      </button>

      <div className="single-game">
        {/* Left column: cover image */}
        <div className="single-game__image">
          {game.cover_image ? (
            <img
              src={`http://localhost:3000/images/${game.cover_image}`}
              alt={`${game.title} cover`}
            />
          ) : (
            <div className="no-image">No Cover Image</div>
          )}
        </div>

        {/* Right column: game details and action buttons */}
        <div className="single-game__details">
          <h2>{game.title}</h2>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Genre:</strong> {game.genre}</p>
          <p><strong>Year:</strong> {game.release_year}</p>
          <p>{game.description}</p>

          <div className="single-game__actions">
            <button className="button" onClick={() => setShowEditForm(true)}>
              Edit Game
            </button>
            <button className="button button--danger" onClick={handleDelete}>
              Delete Game
            </button>
          </div>
        </div>
      </div>

      {/* Edit Game modal — only rendered when showEditForm is true */}
      {showEditForm && (
        <EditGameForm
          game={game}
          onClose={() => setShowEditForm(false)}
          onGameUpdated={() => {
            // Re-fetch the updated game data and close the modal
            fetchGame();
            setShowEditForm(false);
          }}
        />
      )}
    </main>
  );
}

export default SingleGame;
