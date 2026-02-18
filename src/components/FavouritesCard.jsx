import React from 'react';
import './FavouritesCard.css';

const FavouritesCard = ({ title, image, onRemove }) => {
    return (
        <div className="favourites-card">
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                {rating && <p className="card-rating">⭐ {rating}</p>}
                <button 
                    className="remove-button"
                    onClick={() => onRemove(id)}
                >
                    Remove from Favourites
                </button>
            </div>
        </div>
    );
};

export default FavouritesCard;