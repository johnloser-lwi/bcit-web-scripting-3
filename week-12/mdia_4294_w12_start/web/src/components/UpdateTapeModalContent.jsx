import { useState, useEffect } from "react";

function UpdateTapeModalContent({ onTapeUpdated, tape, onClose }) {
	const [artist, setArtist] = useState(tape.artist_id ?? "");
	const [dbArtists, setDbArtists] = useState([]);
	const [title, setTitle] = useState(tape.name ?? "");
	const [description, setDescription] = useState(tape.description ?? "");
	const [image, setImage] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3000/artists")
			.then((res) => res.json())
			.then((data) => {
				setDbArtists(data);
				const matchedArtist = data.find((a) => a.name === tape.artist_id);
				if (matchedArtist) {
					setArtist(matchedArtist.id);
				}
			});
	}, []);


	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// Create FormData object to send the tape data including the image file. This is required because we are sending a file
		const formData = new FormData();

		// Append the artist ID, title and image to the form data
		formData.append("artist_id", artist);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("image", image);

		// Send the POST request to the API to create new tape
		const tapeResponse = await fetch(`http://localhost:3000/tapes/${tape.id}`, {
			method: "PUT",
			body: formData,
		});

		// Get the response from the API
		const tapeResult = await tapeResponse.json();

		// Call the onTapeUpdated function that was passed as a prop
		//    @NOTE: This is passed down from AllTapes.jsx and just calls the fetchTapes function to repopulate the tapes
		onTapeUpdated();

		// Close the modal.
		onClose();
	};;

	return (
		<div className="modal-container">
			<div className="modal card">
				<h3>Edit Tape</h3>
				<form
					action=''
					className="form-group grid-container"
					onSubmit={handleFormSubmit}
					encType='multipart/form-data'
				>
					<div className="col-4">
						<label htmlFor='artist'>Artist</label>
						<select
							name='artist'
							id='artist'
							value={artist}
							onChange={(e) => setArtist(e.target.value)}
						>
							{dbArtists &&
								dbArtists.map((artist, index) => (
									<option key={artist.id} value={artist.id}>
										{artist.name}
									</option>
								))}
						</select>
						<label htmlFor='description'>Description</label>
						<textarea
							name='description'
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className="col-8">
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							name='title'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<label>Current Image</label>
						<img
							src={`http://localhost:3000/images/${tape.image_name}`}
							alt='Placeholder'
						/>
						<label htmlFor='image'>Upload New Image</label>
						<input
							type='file'
							name='image'
							id='image'
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
					<div className="col-12">
						<button className="button success" type='submit'>
							Save
						</button>
					</div>
				</form>
				<button onClick={onClose} className="modal__close-button">
					x
				</button>
			</div>
		</div>
	);
}

export default UpdateTapeModalContent;
