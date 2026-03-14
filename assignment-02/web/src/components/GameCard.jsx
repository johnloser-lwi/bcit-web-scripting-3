// GameCard component — a clickable card displayed in the AllGames grid
// Shows the game's cover image, title, developer, genre, and release year
// Clicking the card triggers the onGameClick callback in AllGames to navigate
// to the SingleGame detail view

function GameCard({ game, onClick }) {
  return (
    <div className="card game-card" onClick={onClick}>
      {/* Cover image area — shows a placeholder text if no image has been uploaded */}
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

      {/* Text info below the image */}
      <div className="card-content">
        <h4>{game.title}</h4>
        <p>{game.developer}</p>
        <p>{game.genre} &mdash; {game.release_year}</p>
      </div>
    </div>
  );
}

export default GameCard;
