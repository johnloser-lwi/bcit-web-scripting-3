import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditGameForm from '../components/EditGameForm';

function SingleGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchGame = () => {
    // include the jwt token in the authorization header so the api allows the request
    fetch(`http://localhost:3000/games/${id}`, {
      headers: {
        Authorization: `Beaver ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setGame(data));
  };

  // whenever id changes, update the display
  useEffect(() => {
    fetchGame();
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm(`Delete "${game.title}"? This cannot be undone.`)) return;

    // include the jwt token so the api can verify the user is allowed to delete
    fetch(`http://localhost:3000/games/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Beaver ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(() => navigate("/"));
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
      <button className="button" onClick={() => navigate("/")}>
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
