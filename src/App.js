// App.js (Front-end)

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchResults from './pages/SearchResults';
import SpotDetail from './pages/SpotDetail';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import EditModal from "./components/EditModal";
import { Link } from 'react-router-dom';
import {Button, Carousel, ButtonGroup, Row, Col, Container, Modal} from "react-bootstrap";
import button from "bootstrap/js/src/button";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
const App = () => {
    const [natureSpots, setNatureSpots] = useState(() => {
        const savedSpots = localStorage.getItem('natureSpots');
        return savedSpots ? JSON.parse(savedSpots) : [];
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [currentEditingIndex, setCurrentEditingIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [showButtonGroup, setShowButtonGroup] = useState(Array(natureSpots.length).fill(false));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowRegisterModal = () => setShowRegisterModal(true);
    const handleCloseRegisterModal = () => setShowRegisterModal(false);
    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);



    useEffect(() => {
        localStorage.setItem('natureSpots', JSON.stringify(natureSpots));
    }, [natureSpots]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newSpot = {
            name: name,
            description: description,
            imageUrl: imageUrl,
        };

        try{
            const response = await fetch('/api/natureSpots/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSpot),
            });
            if (response.ok) {
                const addedSpot = await response.json();
                setNatureSpots([...natureSpots, addedSpot]);
                setName('');
                setDescription('');
                setImageUrl('');
             } else {
                throw new Error('Failed to add nature spot');
            }
        } catch(error){
            console.error(error);
        }
    };

    const toggleButtonGroup = (index) => {
        const updatedShowButtonGroup = [...showButtonGroup];
        updatedShowButtonGroup[index] = !updatedShowButtonGroup[index];
        setShowButtonGroup(updatedShowButtonGroup);
    }

     const handleEditInitiation = (id) => {
        console.log("Edit initiation for ID:", id);
        const spotToEdit = natureSpots.find(spot => spot._id === id);
        if (spotToEdit) {
            setCurrentEditingIndex(natureSpots.indexOf(spotToEdit));
            setModalShow(true);
            setName(spotToEdit.name);
            setDescription(spotToEdit.description);
            setImageUrl(spotToEdit.imageUrl);
        } else {
            console.error('Spot not found for id:', id);
        }
    };


    const handleDeleteInitiation = (id) => {
        setShowDeleteModal(true);
        setDeleteIndex(id);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`/api/natureSpots/delete/${deleteIndex}`, { method: 'DELETE' });
            if (response.ok) {
                const filteredSpots = natureSpots.filter(spot => spot._id !== deleteIndex);
                setNatureSpots(filteredSpots);
            } else {
                throw new Error('Failed to delete nature spot');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setShowDeleteModal(false); // Hide the delete confirmation modal
            setDeleteIndex(null); // Reset the delete index
        }
    };

    const handleSaveChanges = async (updatedSpot, index) => {
        console.log('Updated spot:', updatedSpot);

        try {
            const response = await fetch(`/api/natureSpots/editNatureSpot/${updatedSpot._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSpot),
            });

            if (response.ok) {
                const savedSpot = await response.json();
                const updatedSpots = [...natureSpots];
                updatedSpots[index] = savedSpot;
                setNatureSpots(updatedSpots);
                setModalShow(false);
            } else {
                throw new Error('Failed to update nature spot');
            }
        } catch (error) {
            console.error('Error updating spot:', error);
        }
    };

    const onLogin = async (username, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
            handleCloseLoginModal();
        } catch (error) {
            console.error(error);
        }
    };

    const onLogout = () => {
        localStorage.removeItem('token'); // Remove the stored token
        setIsLoggedIn(false); // Update the state to reflect that the user is logged out
    };


    const onRegister = async (username, email, password) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) throw new Error('Registration failed');

            // Optionally log in the user directly after registration
            await onLogin(username, password);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Router>

            <Container>
                <Header onShowRegisterModal={handleShowRegisterModal} onShowLoginModal={handleShowLoginModal}/>
                <Routes>
                    <Route path="/VenturePal" element={
                        <>
                            <Row className="justify-content-md-center mb-5 mt-5">
                                <Carousel fade>
                                    {natureSpots.map((spot, index) => (
                                        <Carousel.Item key={spot._id}>
                                            <img className="d-block w-100" src={spot.imageUrl} alt={spot.name}/>
                                            <Carousel.Caption>
                                                <h3>{spot.name}</h3>
                                                {showButtonGroup[index] && (
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Link to={`/spot/${spot._id}`}
                                                              className="btn btn-secondary">View</Link>
                                                        <Button variant="primary"
                                                                onClick={() => handleEditInitiation(spot._id)}>Edit</Button>
                                                        <Button variant="danger"
                                                                onClick={() => handleDeleteInitiation(spot._id)}>Delete</Button>
                                                    </ButtonGroup>
                                                )}
                                                <Button className="toggle-button"
                                                        onClick={() => toggleButtonGroup(index)}>Toggle</Button>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>


                            </Row>


                            <Row className="justify-content-md-center mb-5 mt-5">
                                <Col>
                                    <div id="form-div">

                                        <h1 id="location">Add A Location</h1>
                                        <form className="mb-3" onSubmit={handleSubmit}>
                                            <input type="text" className="form-control" value={name}
                                                   onChange={(e) => setName(e.target.value)}
                                                   placeholder="Name" required/><br/>
                                            <input type="text" className="form-control" value={description}
                                                   onChange={(e) => setDescription(e.target.value)}
                                                   placeholder="Description"
                                                   required/><br/>
                                            <input type="text" className="form-control" value={imageUrl}
                                                   onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL"
                                                   required/><br/>
                                            <button className="btn-primary" type="submit">Add Nature Spot</button>
                                        </form>
                                        <button onClick={() => console.log('Nature Spots:', natureSpots)}>Log Nature
                                            Spots
                                        </button>
                                    </div>
                                </Col>
                                <Col>
                                    <img
                                        src="https://cdn.firstcry.com/education/2022/12/09111755/Learn-about-Weather.jpg"
                                        id="weather" alt="WEATHER"/>
                                </Col>
                            </Row>


                            <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Register</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <RegisterForm onRegister={onRegister} />
                                </Modal.Body>
                            </Modal>

                            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Login</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <LoginForm onLogin={onLogin} />
                                </Modal.Body>
                            </Modal>


                            <EditModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                spot={natureSpots[currentEditingIndex] || {name: '', description: '', imageUrl: ''}}
                                onSave={handleSaveChanges}
                                index={currentEditingIndex}
                            />
                            <DeleteConfirmationModal
                                show={showDeleteModal}
                                onHide={() => setShowDeleteModal(false)}
                                onConfirm={handleConfirmDelete}
                            />
                        </>
                    }/>


                    <Route path="/search" element={<SearchResults natureSpots={natureSpots}/>}/>
                    <Route path="/spot/:_id" element={<SpotDetail natureSpots={natureSpots}/>}/>
                </Routes>


                <Footer/>

            </Container>
            {/*<div>*/}
            {/*    {isLoggedIn ? (*/}
            {/*        <div>Welcome! You're logged in.</div>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <LoginForm onLogin={onLogin}/>*/}
            {/*            <RegisterForm onRegister={onRegister}/>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}
        </Router>
    );
};
export default App;
