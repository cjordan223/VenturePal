import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Navbar, Nav } from 'react-bootstrap';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch  = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
    };

    return (
        <Navbar expand="lg" className="header text-light">
            <Container fluid>
                <Navbar.Brand href="/VenturePal" className="fw-bold text-light">VenturePal</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="/VenturePal" className="text-light">Home</Nav.Link>
                        <Nav.Link href="#action2" className="text-light">Discover</Nav.Link>
                        <Nav.Link href="#" disabled className="text-light">Link</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch }>
                        <Form.Control
                            type="search"
                            placeholder="Where to?"
                            className="me-2"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
