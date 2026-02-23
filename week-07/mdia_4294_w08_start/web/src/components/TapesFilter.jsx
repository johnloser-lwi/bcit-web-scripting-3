const TapeFilters = () => {
    return (
        <div className='filters-container'>
            <form>
                <div className='filter-section'>
                    <h4>Genre</h4>
                    <label>
                        <input type="checkbox" name="genre" value="rock" />
                        Genre Name
                    </label>
                </div>
                <div className='filter-section'>
                    <h4>Artists</h4>
                    <label>
                        <input type="checkbox" name="artist" value="artist1" />
                        Artist Name
                    </label>
                    <input type="submit" value="Apply" className='button' />
                </div>
            </form>
            <form className='filter-section'>
                <h4>Search</h4>
                <input type="text" placeholder="Search..." className='search-box' />
                <div>
                    <input type="submit" value="Search" className='button' />
                </div>
            </form>
        </div>
    );
};

export default TapeFilters;