// App.js

import React, { useEffect, useState } from 'react';
 import Header from "./Header";
import Footer from "./Footer";
import HorizontalScrollingCards from "./HorizontalScrollingCards";
import EditModal from './EditModal';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteConfirmationModal from "./DeleteConfirmationModal";

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
        const index = natureSpots.findIndex(spot => spot.id === id);
        setCurrentEditingIndex(index); // Set the index of the spot we're editing
        setModalShow(true); // Show the modal
        setName(natureSpots[index].name);
        setDescription(natureSpots[index].description);
        setImageUrl(natureSpots[index].imageUrl);
    };



    const handleDeleteInitiation = (id) => {
        const index = natureSpots.findIndex(spot => spot.id === id);
        setDeleteIndex(index);
        setShowDeleteModal(true);
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

        <div className="container-fluid custom-fluid">
            <Header />
            <div className="row mt-4" id="submitme">
                <h1>Add A Location</h1>
                {/*<button className="btn btn-secondary mb-3" onClick={handleGenerateSpots}>Generate Random Spots</button>*/}

                <form className="mb-3" onSubmit={handleSubmit}>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="Name" required/><br/>
                    <input type="text" className="form-control" value={description}
                           onChange={(e) => setDescription(e.target.value)} placeholder="Description" required/><br/>
                    <input type="text" className="form-control" value={imageUrl}
                           onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" required/><br/>
                    <button className="btn-primary" type="submit">Add Nature Spot</button>
                </form>
            </div>

            <HorizontalScrollingCards
                natureSpots={natureSpots}
                onEdit={handleEditInitiation}
                onDelete={handleDeleteInitiation}
            />


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



            <Footer />
        </div>
    );
};
export default App;
