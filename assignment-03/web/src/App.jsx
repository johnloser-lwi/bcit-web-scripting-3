import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from './components/Header';
import AllGames from './pages/AllGames';
import SingleGame from './pages/SingleGame';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import authRequired from './authRequired';
import './App.css';

function App() {
  const navigate = useNavigate();

  // track whether the user is logged in to control the header and route access
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // called after a successful sign in, updates auth state and redirects to the games list
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  // called when the user signs out, removes the token and redirects to sign in
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  // on first load, check if a token already exists in localStorage to restore the logged-in state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // wrap protected pages with authRequired so unauthenticated users are redirected to sign-up
  const ProtectedAllGames = authRequired(AllGames);
  const ProtectedSingleGame = authRequired(SingleGame);

  return (
    <div className="app">
      <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn handleLogin={handleLogin} />} />
        <Route path='/' element={<ProtectedAllGames />} />
        <Route path='/games/:id' element={<ProtectedSingleGame />} />
      </Routes>
    </div>
  );
}

export default App;
