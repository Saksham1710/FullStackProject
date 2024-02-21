import React from 'react';
import { MDBModal } from 'mdb-react-ui-kit';

const SearchModal = ({ isOpen, toggle }) => {
  return (
    <MDBModal isOpen={isOpen} toggle={toggle} fullHeight position="right">
      <div className="modal-header">
        <h5 className="modal-title">Search</h5>
        <button type="button" className="btn-close" onClick={toggle}></button>
      </div>
      <div className="modal-body">
        {/* Add your search input and logic here */}
        <input type="text" className="form-control" placeholder="Search..." />
      </div>
    </MDBModal>
  );
};

export default SearchModal;
