import React, { useState } from 'react';
import '../styles/review.css'; // Import CSS file for styling
import ReviewImg from '../assets/Images/Review.jpg'; // Import image for review form

const ReviewForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
    };
  
    return (
        <div>
        <h1 style={{textAlign:'center'}}>Leave Us a Review!</h1>
      <div className="review-container">
        <div className="image-column">
          {/* Image or picture component goes here */}
          <img src={ReviewImg} style={{width: "30vw", marginLeft:'10vw'}} alt="Product" />
        </div>
        <div className="form-column">
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input type="number" min="1" max="5" required />
            </div>
            <div className="form-group">
              <label>Comment:</label>
              <textarea required />
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
      </div>
    );
  };
  
  export default ReviewForm;