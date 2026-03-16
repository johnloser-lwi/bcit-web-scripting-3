import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import AllTapes from "./pages/AllTapes";
import Tape from "./pages/Tape";
import Footer from "./components/Footer";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Header />
				<Routes>
					<Route path='/' element={<AllTapes />} />
					<Route path='/tapes' element={<Navigate to='/' />} />
					<Route path='/tapes/:id' element={<Tape />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
