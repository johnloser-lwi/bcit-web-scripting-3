import { useEffect, useState } from "react";
import { Link } from "react-router-dom";    
import { useParams } from "react-router";

function Tape() {

    const { id } = useParams();
    
    const [tapeData, setTapeData] = useState({});

		useEffect(() => {
			// Fetch the tape with the id
			fetch(`http://localhost:3000/tapes/${id}`)
				.then((response) => response.json())
				.then((data) => {
					setTapeData(data);
				});
		}, []);

    return (
			<main className="container">
				<div className="grid-container">
					<div className="col-4">
						<img src={`http://localhost:3000/images/${tapeData.image_name}`} />
					</div>
					<div className="col-8">
						<Link to='/' className="button small">
							&lt; All Tapes
						</Link>
						<h1
							className="h2 inline-flex items-center">
							{" "}
							{tapeData.name} by {tapeData.artist}
						</h1>
						<p>{tapeData.description}</p>
					</div>
				</div>
			</main>
		);

}

export default Tape;