import React from 'react';
import './Card.css'

const Card = ({ rank, suit }) => {
    const getImagePath = () => {
        const imageName = `${suit}_${rank}.svg`.toLowerCase();
        return `/cards/${imageName}`;
    };

    return (
        <img
            src={getImagePath()}
            alt={`${rank} of ${suit}`}
            className="card-image"
        />
    );
};

export default Card;