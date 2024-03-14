//SearchResults.js

import {useLocation} from "react-router-dom";
import {Container, Row, Col, Card, CardFooter} from 'react-bootstrap';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults({ natureSpots }) {
    const query = useQuery().get('q');
    const filteredSpots = natureSpots.filter(spot =>
    spot.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Container>
            <h1> Search Results for "{query}"</h1>
            <Row>
                {filteredSpots.map(spot => (
                    <Col key={spot.id} sm={12} md={6} lg={4} xl={3}>
                        <Card>
                            <Card.Img variant="top" src={spot.imageUrl} />
                            <Card.Body>
                                <Card.Title>{spot.name}</Card.Title>
                                <Card.Text>{spot.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SearchResults;