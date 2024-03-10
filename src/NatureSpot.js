//NatureSpot.js

import React from 'react';


const NatureSpot = ({ spot }) => {
    return (
        <div className='card mb-3 mt-3' style={{ maxWidth: '300px' }}>
            <img src={spot.imageUrl} alt={spot.name} style={{ width: '100%', maxHeight: '500px', maxWidth: '500px' }} />
            <div className='card-body'>
                <h5 className='card-title'>{spot.name} </h5>
                <p className='card-text'>{spot.description}</p>
            </div>
        </div>
    );
};

export default NatureSpot;