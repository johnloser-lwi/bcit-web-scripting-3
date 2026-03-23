import { useState, useEffect } from "react";

function ModalForm({onClose, onTapeAdded}) {
	// State to hold user input for new tape
	const [artist, setArtist] = useState("");
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");

	// State to GET and hold artists from the database
	const [dbArtists, setDbArtists] = useState("");

	// States to hold user input for new artists
	const [isNewArtist, setIsNewArtist] = useState("");
	const [newArtist, setNewArtist] = useState("");

	// Load artists from the db for the form <select>
	useEffect(() => {
		fetch("http://localhost:3000/artists")
			.then((res) => res.json())
			.then((data) => {
				setDbArtists(data);
                // set the default value of artist to the first db artist on page load
				if (data.length > 0) {
					setArtist(data[0].id);
				}
			});
	}, []);

	// Toggle the select and the input for artists, set the artist state
	const handleArtistSelectChange = (event) => {
		if (event.target.value === "-1") {
			setIsNewArtist(true);
			setArtist("");
		} else {
			setIsNewArtist(false);
			setArtist(event.target.value);
		}
	};
	// Send the form data to the API
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		let artistId = artist; //assume it's a db artist
		// Create a new artist before creating the tape
		if (isNewArtist) {
			const artistResponse = await fetch("http://localhost:3000/artists", {
				method: "POST",
                // we need headers this time because we aren't using the formData object
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: newArtist }),
			});

			// Get the new artist ID from the response
			const artistData = await artistResponse.json();
            // We must attach artistId to the response in our server-side code to use it here
			artistId = artistData.artistId;
		}

		// Create FormData object to send the tape data including the image file
		const formData = new FormData();
		formData.append("artist", artistId);
		formData.append("title", title);
		formData.append("image", image);

		// Send the POST request to the API to create new tape
		const tapeResponse = await fetch("http://localhost:3000/tapes", {
			method: "POST",
			body: formData,
		});

		// Get the response from the API
		const tapeResult = await tapeResponse.json();
		// Log the response to the console
		console.log("Result: ", tapeResult);

		// Call the onTapeAdded function that was passed as a prop
		// NOTE: This is passed down from AllTapes.jsx and calls the fetchTapes function to reload the tapes in that component
		onTapeAdded();

		// Close the modal
		onClose();
	};

	return (
		<div className='modal-container'>
			<div className='modal card'>
				<h3>Add a new tape</h3>
				<form
					onSubmit={handleFormSubmit}
					className='form-group grid-container'
					encType='multipart/form-data'
				>
					<div className='col-6'>
						<label htmlFor='artist'>Artist</label>
						{!isNewArtist ? (
							<select
								name='artist'
								id='artist'
								value={artist}
								onChange={handleArtistSelectChange}
							>
								{dbArtists &&
									dbArtists.map((artist, index) => (
										<option key={artist.id} value={artist.id}>
											{artist.name}
										</option>
									))}
								<option value='-1'>+ New Artist +</option>
							</select>
						) : (
							<div>
								<input
									type='text'
									name='artist'
									id='artist'
									value={newArtist}
									onChange={(e) => setNewArtist(e.target.value)}
								/>
								<button
									className='button modal__show-list'
									onClick={() => setIsNewArtist(false)}
								>
									Show List
								</button>
							</div>
						)}
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							name='title'
							id='title'
							onChange={(e) => setTitle(e.target.value)}
						/>
						<label htmlFor='image'>Image</label>
						<input
							type='file'
							name='image'
							id='image'
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
					<div className='col-12'>
						<button className='button' type='submit'>
							Add tape
						</button>
					</div>
				</form>

				<button className='modal__close-button' onClick={onClose}>
					x
				</button>
			</div>
		</div>
	);
}

export default ModalForm;
