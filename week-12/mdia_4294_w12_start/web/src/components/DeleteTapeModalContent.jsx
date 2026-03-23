function DeleteTapeModalContent({ tape, onClose, onTapeDeleted }) {
	// Send the data to the API when the user submits the form
	const handleDeleteTape = (event) => {
		// Stop the HTML form from submitting
		event.preventDefault();

		// Send the POST request to the API to create new tape
		fetch(`http://localhost:3000/tapes/${tape.id}`, { method: "DELETE" })
			.then((response) => response.json())
			.then((data) => {
				// Call the onTapeAdded function that was passed as a prop
				//    @NOTE: This is passed down from AllTapes.jsx and just calls the fetchTapes function to repopulate the tapes
				onTapeDeleted();

				// Close the modal.
				onClose();
			});
	};

	return (
		<div className='modal-container'>
			<div className='modal card'>
				<h3>
					Are you sure you want to delete {tape.name} by {tape.artist_id}?
				</h3>
				<form onSubmit={handleDeleteTape}>
					<button className='button delete' type='submit'>
						Yes, delete this tape... f in the chat ☠️
					</button>
				</form>
				<button className='modal__close-button' onClick={onClose}>
					x
				</button>
			</div>
		</div>
	);
}

export default DeleteTapeModalContent;
