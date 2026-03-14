import { useState, useEffect } from 'react';
import EditGameForm from '../components/EditGameForm';

function SingleGame({ gameId, onBack }) {
  const [game, setGame] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchGame = () => {
    fetch(`http://localhost:3000/games/${gameId}`)
      .then(res => res.json())
      .then(data => setGame(data));
  };

  // whenever gameId changes, update the display
  useEffect(() => {
    fetchGame();
  }, [gameId]);

  const handleDelete = () => {
    if (!window.confirm(`Delete "${game.title}"? This cannot be undone.`)) return;

    fetch(`http://localhost:3000/games/${gameId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => onBack());
  };

  if (!game) {
    return (
      <main className="container">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <button className="button" onClick={onBack}>
        Back to All Games
      </button>

      <div className="single-game">
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

      {/* show the edit form only when showEditForm is true */}
      {showEditForm && (
        <EditGameForm
          game={game}
          onClose={() => setShowEditForm(false)}
          onGameUpdated={() => {
            fetchGame();
            setShowEditForm(false);
          }}
        />
      )}
    </main>
  );
}

export default SingleGame;
