import React, { useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const HorizontalScrollingCards = ({ natureSpots, onEdit, onDelete }) => {
    const scrollContainer = useRef(null);

    const scroll = (scrollOffset) => {
        scrollContainer.current.scrollLeft += scrollOffset;
    };

    return (
        <div className="d-flex justify-content-between align-items-center">
            <Button onClick={() => scroll(-200)}>&lt;</Button> {/* Left arrow button */}
            <Container fluid className="scrolling-wrapper" ref={scrollContainer}>
                <Row className="flex-nowrap" id="scroll-row">
                    {natureSpots.map((spot) => (
                        <Card key={spot.id} className="mx-2" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={spot.imageUrl} />
                            <Card.Body>
                                <Card.Title>{spot.name}</Card.Title>
                                <Card.Text>{spot.description}</Card.Text>
                                <Button variant="primary" onClick={() => onEdit(spot.id)}>Edit</Button>
                                <Button variant="secondary" onClick={() => onDelete(spot.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
            <Button onClick={() => scroll(200)}>&gt;</Button> {/* Right arrow button */}
        </div>
    );
};

export default HorizontalScrollingCards;
