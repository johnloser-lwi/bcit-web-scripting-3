import { useEffect, useState } from "react";
import { createPortal } from "react-dom"
import UpdateTapeModalContent from "./UpdateTapeModalContent";

function UpdateTapeModal( { onTapeUpdated, tape } ) {

    const [showModal, setShowModal] = useState(false);



    return(
        <>
            <button    
                className="button small warning"
                onClick={ () => { setShowModal(true) }}
            >Edit</button>

            { showModal && createPortal(<UpdateTapeModalContent onClose={ () => { setShowModal(false) } } tape={tape} onTapeUpdated={onTapeUpdated} />, document.body) }
        </>
    );
}

export default UpdateTapeModal;