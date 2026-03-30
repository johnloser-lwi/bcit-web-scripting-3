import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function EditGameForm({ game, onClose, onGameUpdated }) {
  // all the inputs availble for user
  const [title, setTitle] = useState(game.title);
  const [developer, setDeveloper] = useState(game.developer);
  const [releaseYear, setReleaseYear] = useState(game.release_year);
  const [description, setDescription] = useState(game.description || '');
  const [genreId, setGenreId] = useState(game.genre_id);
  const [coverImage, setCoverImage] = useState(null);
  const [genres, setGenres] = useState([]);

  // fetch available genres
  useEffect(() => {
    fetch('http://localhost:3000/genres')
      .then(res => res.json())
      .then(data => setGenres(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('developer', developer);
    formData.append('release_year', releaseYear);
    formData.append('description', description);
    formData.append('genre_id', genreId);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    const response = await fetch(`http://localhost:3000/games/${game.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Beaver ${localStorage.getItem("token")}`
      },
      body: formData,
    });

    const result = await response.json();
    console.log('Edit game result:', result);

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
