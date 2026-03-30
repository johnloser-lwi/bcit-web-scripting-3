import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

function Header({handleLogout, isAuthenticated}) {
    return (
        <header className='header'>
            <div className='container main-nav'> 
                <img src={logo} width={100} alt="Lofi Tapes" />
                <p>lofi beats to code<span>/</span>design<span>/</span>study to<span>.</span></p>
                {isAuthenticated ? <button className='button danger' onClick={handleLogout}>Sign Out</button> :
                    <Link className="button" to="/sign-in">Sign In</Link>
                }
            </div>
        </header>
    )
}

export default Header;