import { useState } from "react";
import {createPortal} from "react-dom";
import ModalForm from "./AddAlbumModalForm";

const AddAlbumModal = ({onAlbumAdded}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button className="button" onClick={() => {
                setShowModal(true);
            }}>
                Add Album
            </button>
            {
                showModal && createPortal(
                    <ModalForm 
                        onAlbumAdded={onAlbumAdded}
                        onClose={() => setShowModal(false)}
                    />, document.body
                )
            }
        </div>
    );
}

export default AddAlbumModal;