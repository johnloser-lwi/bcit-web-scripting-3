import { Link } from 'react-router-dom';

function Header({ handleLogout, isAuthenticated }) {
  return (
    <header className="header">
      <div className="container">
        <h1>Video Games Collection</h1>
        {isAuthenticated
          ? <button className="button" onClick={handleLogout}>Sign Out</button>
          : <Link className="button" to="/sign-in">Sign In</Link>
        }
      </div>
    </header>
  );
}

export default Header;
