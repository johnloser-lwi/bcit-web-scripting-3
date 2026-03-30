import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AllTapes from "./pages/AllTapes";
import MyTapes from "./pages/MyTapes";
import Tape from "./pages/Tape";

import "./App.css";
import { useEffect, useState } from "react";
import authRequired from "./authRequired";

function App() {
	const navigate = useNavigate();

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = () => {
		setIsAuthenticated(true);
		navigate("/tapes")
	}

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		navigate("/sign-in");
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const ProtectedAllTapes = authRequired(AllTapes);
	const ProtectedTape = authRequired(Tape);
	const ProtectedMyTapes = authRequired(MyTapes);

	return (
		<div className='app'>
			<Header handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn handleLogin={handleLogin} />} />
				<Route path='/tapes' element={<ProtectedAllTapes />} />
				<Route path='my-tapes' element={<ProtectedMyTapes />}/>
				<Route path='/tapes/:id' element={<ProtectedTape />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
