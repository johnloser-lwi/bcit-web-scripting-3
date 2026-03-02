import { useState, useEffect } from "react";

const ModalForm = ({onAlbumAdded, onClose}) => {

    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const handleFormSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("artist", 1);
        formData.append("title", title);
        formData.append("image", image);

        const albumResponse = await fetch(
            "http://localhost:3000/albums",
            {
                method: "POST",
                body: formData
            }
        );

        const albumResult = await albumResponse.json();
        console.log("Result: ", albumResult);

        onAlbumAdded();

        // onCLose();
    }

    return (
        <div className="modal-container">
            <div className="modal card">
                <h3>Add a new album</h3>
                    <form
                        className="form-group grid-container"
                        encType='multipart/form-data'
                    >
                        
                        <div className="col-6">
                            <label htmlFor='artist'>Artist</label>
                            <input
                                type='text'
                                name='artist'
                                id='artist'
                                onChange={e => setArtist(e.target.value)}
                            />
                            <label htmlFor='title'>Title</label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                onChange={e => setTitle(e.target.value)}
                            />
                            <label htmlFor='image'>Image</label>
                            <input
                                type='file'
                                name='image'
                                id='image'
                                onChange={e => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="col-12">
                            <button className="button" type='submit' onClick={handleFormSubmit}>
                                Add tape
                            </button>
                        </div>
                    </form>
                <button className="modal__close-button">X</button>
            </div>
        </div>
    );
}

export default ModalForm;