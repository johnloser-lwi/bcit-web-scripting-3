import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TapeFilters from '../components/TapesFilter';
import AddTapesModal from '../components/AddTapeModal';
import UpdateTapeModal from '../components/UpdateTapeModal';
import DeleteTapeModal from "../components/DeleteTapeModal";

function MyTapes() {

    const [tapes, setTapes] = useState([]);

	const getAllTapes = function() {
		fetch("http://localhost:3000/tapes/my-tapes", {
			headers: {
				Authorization: `Beaver ${localStorage.getItem("token")}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setTapes(data);
			});
	}

		useEffect(() => {
			getAllTapes();
		}, []);

    return (
			<main className='container'>
				<h2>Lofi Cassettes</h2>
				<div className='grid-container'>
					<div className='col-3'>
						<h3>Filters</h3>
						<TapeFilters />
						{/* Add the component to the page where you want the modal button to appear */}
						<AddTapesModal onTapeAdded={getAllTapes} />
						<Link to="/tapes" className='button'>All Tpaes</Link>
					</div>
					<div className='col-9'>
						<h3>My Collection</h3>
						<div className='grid-container'>
							{/* map the state variable data to render on screen */}
							{tapes.map((tape) => {
								return (
									<div key={tape.id} className='col-4 flex flex-grow'>
										<div className='card'>
											<img
												src={`http://localhost:3000/images/${tape.image_name}`}
												alt='Placeholder'
											/>
											<div className='card-content'>
												<h4>{tape.name}</h4>
												<p>{tape.artist}</p>
												<div className="tape-actions">
													<Link to={`/tapes/${tape.id}`} className="button small">
													View
													</Link>
													<UpdateTapeModal
														onTapeUpdated={getAllTapes}
														tape={tape}
													/>
													<DeleteTapeModal
													onTapeDeleted={getAllTapes}
													tape={tape}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</main>
		);
}

export default MyTapes;
