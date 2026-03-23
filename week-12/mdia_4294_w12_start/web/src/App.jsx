import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AllTapes from "./pages/AllTapes";
import Tape from "./pages/Tape";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/tapes' element={<AllTapes />} />
					<Route path='/tapes/:id' element={<Tape />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
