//SpotDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function SpotDetail({ natureSpots }) {
    const { id } = useParams();
    console.log("Params:", useParams());

    const spot = natureSpots.find(s => s.id === id);
    console.log("Found spot:", spot);


    if (!spot) {
        return (
            <Container className="mt-5">
                <h2>Spot Not Found</h2>
                <p>The requested spot could not be found. Please check the URL or return to the homepage.</p>
                {/*<Button variant="primary" href="/VenturePal">Back to Home</Button>*/}
                <Link to='/VenturePal' className="btn btn-secondary">View</Link>

            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <Card className="justify-content-center">
                        <Card.Img variant="top" src={spot.imageUrl} alt={spot.name} />
                        <Card.Body>
                            <Card.Title>{spot.name}</Card.Title>
                            <Card.Text>{spot.description}</Card.Text>
                            <Button variant="primary" href="/VenturePal">Back to Spots</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Additional spot details or interactive elements can be added here */}
            </Row>
        </Container>
    );
}

export default SpotDetail;
