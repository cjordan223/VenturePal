// App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from 'react-bootstrap/Carousel';
import SearchResults from './pages/SearchResults';
import SpotDetail from './pages/SpotDetail';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import EditModal from "./components/EditModal";
import { Link } from 'react-router-dom';

import { generateDummyData, massDeleteItems  } from './scripts';
import {Button, ButtonGroup} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const App = () => {
    const [natureSpots, setNatureSpots] = useState(() => {
        const savedSpots = localStorage.getItem('natureSpots');
        return savedSpots ? JSON.parse(savedSpots) : [];
    });

    // const [natureSpots, setNatureSpots] = useState(generateDummyData(40));


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [currentEditingIndex, setCurrentEditingIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('natureSpots', JSON.stringify(natureSpots));
    }, [natureSpots]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newSpot = {
            id: Date.now().toString(), // unique ID generated from the current timestamp
            name: name,
            description: description,
            imageUrl: imageUrl,
        };
        setNatureSpots([...natureSpots, newSpot]);
        // reset the form state
        setName('');
        setDescription('');
        setImageUrl('');
    };

    // Add this function inside your App component
    const handleEditInitiation = (id) => {
        console.log("Edit initiation for ID:", id); // Log the ID being passed
        const index = natureSpots.findIndex(spot => spot.id === id);
        console.log("Found spot at index:", index); // Log the index found (-1 if not found)

        if (index !== -1) {
            setCurrentEditingIndex(index);
            setModalShow(true);
            const spot = natureSpots[index];
            console.log("Editing spot:", spot); // Log the spot being edited
            setName(spot.name);
            setDescription(spot.description);
            setImageUrl(spot.imageUrl);
        } else {
            console.error('Spot not found for id:', id);
        }
    };




    const handleDeleteInitiation = (id) => {
        console.log("Delete initiation for ID:", id); // Log the ID being passed
        const index = natureSpots.findIndex(spot => spot.id === id);
        console.log("Found spot at index:", index); // Log the index found (-1 if not found)

        if (index !== -1) {
            setDeleteIndex(index);
            setShowDeleteModal(true);
        } else {
            console.error('Spot not found for id:', id);
        }
    };


    const handleConfirmDelete = () => {
        const updatedSpots = natureSpots.filter((_, index) => index !== deleteIndex);
        setNatureSpots(updatedSpots);
        setShowDeleteModal(false); // Close the modal after confirming
    };

    const handleSaveChanges = (updatedSpot, index) => {
        const updatedSpots = [...natureSpots];
        updatedSpots[index] = updatedSpot;
        setNatureSpots(updatedSpots);
        setModalShow(false);
    };






    return (
        <Router>

        <div className="container-fluid custom-fluid">
            <Header />




                <Routes>

                <Route path="/VenturePal" element={
                    <>
                        <div id="cj-holder">
                        <Carousel fade>
                            {natureSpots.map((spot) => (
                                <Carousel.Item key={spot.id}>
                                    <img
                                        className="d-block w-100"
                                        src={spot.imageUrl}
                                        alt={spot.name}
                                    />
                                    <Carousel.Caption>
                                        <h3>{spot.name}</h3>
                                        <p>{spot.description}</p>
                                        <ButtonGroup aria-label="Basic example">
                                            <Link to={`/spot/${spot.id}`} className="btn btn-secondary">View</Link>
                                            <Button variant="primary" onClick={() => handleEditInitiation(spot.id)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteInitiation(spot.id)}>Delete</Button>
                                        </ButtonGroup>

                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        </div>



                        <div className="row mt-4" id="submitme">
                        <div id="form-div" className="col">
                            <h1 id="location">Add A Location</h1>
                            <form className="mb-3" onSubmit={handleSubmit}>
                                <input type="text" className="form-control" value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       placeholder="Name" required/><br/>
                                <input type="text" className="form-control" value={description}
                                       onChange={(e) => setDescription(e.target.value)} placeholder="Description"
                                       required/><br/>
                                <input type="text" className="form-control" value={imageUrl}
                                       onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL"
                                       required/><br/>
                                <button className="btn-primary" type="submit">Add Nature Spot</button>
                            </form>
                        </div>
                        <div className="col">


                            <img src="https://cdn.firstcry.com/education/2022/12/09111755/Learn-about-Weather.jpg"
                                 id="weather" alt="WEATHER"/>
                        </div>

                    </div>


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
            } />

                    <Route path="/search" element={<SearchResults natureSpots={natureSpots} />} />
                    <Route path="/spot/:id" element={<SpotDetail natureSpots={natureSpots} />} />





                </Routes>
            <Footer/>

        </div>
        </Router>
    );
};
export default App;
