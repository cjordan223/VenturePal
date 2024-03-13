// HorizontalScrollingCards.js

import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// HorizontalScrollingCards.js
const HorizontalScrollingCards = ({ natureSpots, onEdit, onDelete }) => {
    return (
        <Container fluid className="scrolling-wrapper">
            <Row className="flex-nowrap">
                {natureSpots.map((spot) => (
                    <Card key={spot.id} className="mx-2">
                        <Card.Img variant="top" src={spot.imageUrl} />

                        <Card.Body>
                            <Card.Title>{spot.name}</Card.Title>
                            <Card.Text>
                                {spot.description}
                            </Card.Text>

                            <button onClick={() => onEdit(spot.id)}>Edit</button>
                            <button onClick={() => onDelete(spot.id)}>Delete</button>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
    );
};


export default HorizontalScrollingCards;