import logo from '../assets/images/logo.svg';

function Header() {
    return (
        <header className='header'>
            <div className='container main-nav'> 
                <img src={logo} width={100} alt="Lofi Tapes" />
                <p>lofi beats to code<span>/</span>design<span>/</span>study to<span>.</span></p>
            </div>
        </header>
    )
}

export default Header;