function GameCard({ game, onClick }) {
  return (
    <div className="card game-card" onClick={onClick}>
      <div className="card__image">
        {game.cover_image ? (
          <img
            src={`http://localhost:3000/images/${game.cover_image}`}
            alt={`${game.title} cover`}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="card-content">
        <h4>{game.title}</h4>
        <p>{game.developer}</p>
        <p>{game.genre} &mdash; {game.release_year}</p>
      </div>
    </div>
  );
}

export default GameCard;
