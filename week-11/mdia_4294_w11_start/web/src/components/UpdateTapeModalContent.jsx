import { useState, useEffect } from "react";
function UpdateTapeModalContent({ onTapeUpdated, tape, onClose }) {
	const [artist, setArtist] = useState("");
	const [dbArtists, setDbArtists] = useState([]);
	const [title, setTitle] = useState(tape.name ?? "");
	const [description, setDescription] = useState(tape.description ?? "");
	const [image, setImage] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3000/artists")
			.then(res => res.json())
			.then(data => {
				setDbArtists(data);
				const matchedArtist = data.find(a => a.name === tape.artist_id);
				if (matchedArtist) {
					setArtist(matchedArtist.id);
				}
			});
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("artist_id", artist);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("image", image);

		const tapeResponse = await fetch(`http://localhost:3000/tapes/${tape.id}`, {
			method: "PUT",
			body: formData,
		});

		const tapeResult = await tapeResponse.json();

		onTapeUpdated();

		onClose();

		console.log("submitted");
	};

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
