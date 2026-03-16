import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteTapeModalContent from "./DeleteTapeModalContent";

function DeleteTapeModal( { tape, onTapeDeleted }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button 
                className="button small delete" 
                onClick={ () => { setShowModal(true) } }
            >Delete</button>

            {showModal && createPortal(
            <DeleteTapeModalContent 
                tape={tape}
                onTapeDeleted={onTapeDeleted}
                onClose={ () => { setShowModal( false ) }} 
            />, 
            document.body)}

        </>
    )

}

export default DeleteTapeModal;