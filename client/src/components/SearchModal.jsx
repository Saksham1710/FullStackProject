import React, { useEffect, useState } from 'react';
import { MDBModal } from 'mdb-react-ui-kit';

const SearchModal = ({ isOpen, toggle }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        // Call backend API to search for products
        const response = await fetch(`http://localhost:4000/api/v1/search?query=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.results);
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Call handleSearch when Enter key is pressed
        }
    };

    return (
        <MDBModal isOpen={isOpen} toggle={toggle} fullHeight position="right">
            <div className="modal-header">
                <h5 className="modal-title">Search</h5>
                <button type="button" className="btn-close" onClick={toggle}></button>
            </div>
            <div className="modal-body">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown} // Call handleKeyDown when a key is pressed
                />


                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                {/* Display search results */}
                {searchResults.map((result) => (
                    <div key={result.id}>{result.name}</div>
                ))}
            </div>
        </MDBModal>
    );
};

export default SearchModal;
