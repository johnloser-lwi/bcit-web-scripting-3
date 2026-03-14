import { useState, useEffect } from 'react';

function GenreFilter({ selectedGenreId, onGenreChange }) {
  const [genres, setGenres] = useState([]);

  // get the genres from the server
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
          onGenreChange(e.target.value ? Number(e.target.value) : null);
        }}
      >
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
