import logoInverted from '../assets/images/logo--invert.svg';

function Footer () {
  return (
    <footer className='footer-bg'>
        <div className='container footer-content'>
            <img src={logoInverted} width={50} alt="Lofi Tapes" />
            <p>© 2025</p>
        </div>
    </footer>
  );
}

export default Footer;