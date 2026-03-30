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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
