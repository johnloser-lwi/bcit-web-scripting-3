// GenreFilter component — a dropdown that lets the user filter games by genre
// Fetches the genre list from the API on mount and passes the selected genre
// back to the parent (AllGames) via the onGenreChange callback

import { useState, useEffect } from 'react';

function GenreFilter({ selectedGenreId, onGenreChange }) {
  // genres holds the list of genre objects fetched from the API
  const [genres, setGenres] = useState([]);

  // Fetch all genres once when the component first mounts
  // The empty dependency array [] means this effect only runs on mount
  useEffect(() => {
    fetch('http://localhost:3000/genres')
      .then(res => res.json())
      .then(data => setGenres(data));
  }, []);

  return (
    <div className="genre-filter">
      <h3>Filter by Genre</h3>
      <select
        value={selectedGenreId || ''}
        onChange={e => {
          // Convert the selected value to a number, or pass null for "All Genres"
          onGenreChange(e.target.value ? Number(e.target.value) : null);
        }}
      >
        {/* The first option resets the filter to show all games */}
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
