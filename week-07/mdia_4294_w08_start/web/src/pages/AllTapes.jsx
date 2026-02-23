import TapeFilters from '../components/TapesFilter';
import { useState, useEffect } from 'react';

function AllTapes() {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/albums")
            .then(res => res.json())
            .then(data => {
                setAlbums(data);
            });
    }, []);

    return (
        <main className='container'>
            <h2>Lofi Cassettes</h2>
            <div className='grid-container'>
                <div className='col-3'>
                    <h3>Filters</h3>
                    <TapeFilters />
                </div>
                <div className='col-9'>
                    <h3>My Collection</h3>
                    {
                        albums.map(album => {
                            return (
                                <div key={album.div} 
                                className='col-4 flex flex-grow'>
                                    <img src={album.image_name} alt="Placeholder" />
                                    <div className='card-content'>
                                        <h4>{album.name}</h4>
                                        <p>{album.artist}</p>
                                    </div>    
                                </div>
                            );
                        })
                    }
                    <div className='grid-container'>
                        <div className='col-4'>
                            <div className='card'>
                                <img src="https://place-hold.it/300" alt="Placeholder" />
                                <div className='card-content'>
                                    <h4>Album Title</h4>
                                    <p>Artist Name</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='card'>
                                <img src="https://place-hold.it/300" alt="Placeholder" />
                                <div className='card-content'>
                                    <h4>Album Title</h4>
                                    <p>Artist Name</p>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>

        </main>
    )
}

export default AllTapes;
