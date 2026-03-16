function DeleteTapeModalContent({ tape, onClose, onTapeDeleted }) {
	const handleDeleteTape = (event) => {
		event.preventDefault();

		fetch(`http://localhost:3000/tapes/${tape.id}`, {
			method: "DELETE"
		})
			.then(response => response.json())
			.then(data => {
				onTapeDeleted();
				
				onClose();
			});

		console.log("delete button pressed");
	};

	return (
		<div className="modal-container">
			<div className="modal card">
				<h3>
					Are you sure you want to delete {tape.name} by {tape.artist_id}?
				</h3>
				<form onSubmit={handleDeleteTape}>
					<button className="button delete" type='submit'>
						Yes, delete this tape... f in the chat ☠️
					</button>
				</form>
				<button className="modal__close-button" onClick={onClose}>
					x
				</button>
			</div>
		</div>
	);
}

export default DeleteTapeModalContent;
