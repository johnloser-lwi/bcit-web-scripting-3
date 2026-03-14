// AddGameForm component — a modal form for adding a new game to the collection
// Uses createPortal to render the modal directly on document.body so it floats
// above the rest of the page regardless of where in the tree it is used
// Submits data as FormData (multipart/form-data) to support cover image uploads

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function AddGameForm({ onClose, onGameAdded }) {
  // One state variable per form field
  const [title, setTitle] = useState('');
  const [developer, setDeveloper] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [description, setDescription] = useState('');
  const [genreId, setGenreId] = useState('');
  const [coverImage, setCoverImage] = useState(null); // the selected File object

  // genres is fetched from the API to populate the genre <select>
  const [genres, setGenres] = useState([]);

  // Fetch the genre list once when this form first renders
  useEffect(() => {
    fetch('http://localhost:3000/genres')
      .then(res => res.json())
      .then(data => setGenres(data));
  }, []);

  // handleSubmit builds a FormData object and POSTs it to the API
  // FormData is required instead of JSON because we are uploading a file
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('developer', developer);
    formData.append('release_year', releaseYear);
    formData.append('description', description);
    formData.append('genre_id', genreId);
    // Only append the image field if the user actually selected a file
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    const response = await fetch('http://localhost:3000/games', {
      method: 'POST',
      body: formData,
      // Do NOT set Content-Type manually — the browser sets it automatically
      // with the correct multipart boundary when using FormData
    });

    const result = await response.json();
    console.log('Add game result:', result);

    // Tell the parent (AllGames) to refresh the game list and close this modal
    onGameAdded();
  };

  // Render the modal into document.body using a portal
  return createPortal(
    <div className="modal-overlay">
      <div className="modal card">
        <h3>Add New Game</h3>

        <form encType="multipart/form-data">
          <label htmlFor="add-title">Title</label>
          <input
            type="text"
            id="add-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <label htmlFor="add-developer">Developer</label>
          <input
            type="text"
            id="add-developer"
            value={developer}
            onChange={e => setDeveloper(e.target.value)}
            required
          />

          <label htmlFor="add-release_year">Release Year</label>
          <input
            type="number"
            id="add-release_year"
            value={releaseYear}
            onChange={e => setReleaseYear(e.target.value)}
            min="1958"
            max="2030"
            required
          />

          <label htmlFor="add-description">Description</label>
          <textarea
            id="add-description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
          />

          <label htmlFor="add-genre_id">Genre</label>
          <select
            id="add-genre_id"
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

          <label htmlFor="add-cover_image">Cover Image</label>
          <input
            type="file"
            id="add-cover_image"
            accept="image/*"
            onChange={e => setCoverImage(e.target.files[0])}
          />

          <div className="form-actions">
            <button className="button" type="submit" onClick={handleSubmit}>
              Add Game
            </button>
            <button className="button" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

        {/* Close button in the top-right corner of the modal */}
        <button className="modal__close" type="button" onClick={onClose}>
          X
        </button>
      </div>
    </div>,
    document.body
  );
}

export default AddGameForm;
