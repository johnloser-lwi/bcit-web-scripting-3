// EditGameForm component — a modal form for editing an existing game
// Pre-populated with the game's current data passed in via the game prop
// Cover image upload is optional: if no new file is chosen, the existing image is kept
// Submits as FormData so multer on the server can handle the optional file upload

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function EditGameForm({ game, onClose, onGameUpdated }) {
  // Initialise each field with the existing game's current values
  const [title, setTitle] = useState(game.title);
  const [developer, setDeveloper] = useState(game.developer);
  const [releaseYear, setReleaseYear] = useState(game.release_year);
  const [description, setDescription] = useState(game.description || '');
  const [genreId, setGenreId] = useState(game.genre_id);
  // coverImage starts as null — null means "keep the existing image"
  const [coverImage, setCoverImage] = useState(null);

  // genres is fetched to populate the genre dropdown
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/genres')
      .then(res => res.json())
      .then(data => setGenres(data));
  }, []);

  // handleSubmit sends the updated fields to the PUT /games/:id endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData — the server uses multer which requires multipart/form-data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('developer', developer);
    formData.append('release_year', releaseYear);
    formData.append('description', description);
    formData.append('genre_id', genreId);
    // Only include a new file if the user actually chose one
    // The server router handles both cases: new image vs. no new image
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    const response = await fetch(`http://localhost:3000/games/${game.id}`, {
      method: 'PUT',
      body: formData,
    });

    const result = await response.json();
    console.log('Edit game result:', result);

    // Tell the parent (SingleGame) to refresh the displayed game data
    onGameUpdated();
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal card">
        <h3>Edit Game</h3>

        <form encType="multipart/form-data">
          <label htmlFor="edit-title">Title</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <label htmlFor="edit-developer">Developer</label>
          <input
            type="text"
            id="edit-developer"
            value={developer}
            onChange={e => setDeveloper(e.target.value)}
            required
          />

          <label htmlFor="edit-release_year">Release Year</label>
          <input
            type="number"
            id="edit-release_year"
            value={releaseYear}
            onChange={e => setReleaseYear(e.target.value)}
            min="1958"
            max="2030"
            required
          />

          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
          />

          <label htmlFor="edit-genre_id">Genre</label>
          <select
            id="edit-genre_id"
            value={genreId}
            onChange={e => setGenreId(e.target.value)}
            required
          >
            <option value="">Select a genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <label htmlFor="edit-cover_image">New Cover Image (optional)</label>
          <input
            type="file"
            id="edit-cover_image"
            accept="image/*"
            onChange={e => setCoverImage(e.target.files[0])}
          />
          {/* Show the current filename so the user knows what image is saved */}
          {game.cover_image && (
            <p>Current image: {game.cover_image}</p>
          )}

          <div className="form-actions">
            <button className="button" type="submit" onClick={handleSubmit}>
              Save Changes
            </button>
            <button className="button" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

        <button className="modal__close" type="button" onClick={onClose}>
          X
        </button>
      </div>
    </div>,
    document.body
  );
}

export default EditGameForm;
