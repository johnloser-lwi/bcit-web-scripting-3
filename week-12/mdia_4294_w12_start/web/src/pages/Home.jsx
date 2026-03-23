import { Link } from 'react-router';

import bannerImage from '../assets/images/home-bg.jpg';

function Home() {

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className='container full-width banner'>
            <div className='grid-container banner__content text-center'>
                <div className='col-12'>
                    <h1 className='h1'>Welcome, collector</h1>
                    <h3>Sign up and share your library</h3>
                    <div className='banner__buttons'>
                        <Link to="/sign-up" className='button success'>Sign Up</Link>
                        <Link to="/sign-in" className='button'>Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;