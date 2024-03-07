import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

const BottledBeverageCard = (props) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    

    const handleBookmark = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsBookmarked(!isBookmarked);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const { name, description, image, price, overallStars, quantity, id } = props;

    return (
        <div style={{ padding: "20px", width: "340px", height: "600px", marginBottom: "60px" }}>
            <Link to={`/api/beverages/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={scrollToTop}>
                <div className="card" style={{ width: "300px", height: "600px" }}>
                    <img src={image} alt="Product Cover" style={{ width: "300px" }} className="card__cover" />
                    <div className="card__content">
                        <h2 className="card__title">{name}</h2>
                        <p className="card__desc">{description}</p>
                        <div className="card__bookmark" onClick={handleBookmark}>
                            {isBookmarked ? (
                                <i className="fas fa-bookmark card__bookmark-icon bookmarked"></i>
                            ) : (
                                <i className="far fa-bookmark card__bookmark-icon"></i>
                            )}
                        </div>
                        <div className="card__price" style={{ fontSize: '20px' }}>${price}/pc.</div>
                        <div className="card__quantity" style={{ fontSize: '18px' }}>Quantity: {quantity}</div>
                        <div className="card__rating" style={{ fontSize: '18px' }}>Overall Rating: {overallStars} stars</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BottledBeverageCard;
