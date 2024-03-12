import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from "./Header";
import Footer from "./Footer";
import NatureSpot from './NatureSpot';
import EditModal from './EditModal';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const App = () => {

    const [natureSpots, setNatureSpots] = useState(() => {
        const savedSpots = localStorage.getItem('natureSpots');
        return savedSpots ? JSON.parse(savedSpots) : [];
    });
    // const [natureSpots, setNatureSpots] = useState(generateRandomSpots(10));
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
        const newSpot = { name, description, imageUrl };
        setNatureSpots([...natureSpots, newSpot]);
        setName('');
        setDescription('');
        setImageUrl('');
    };

    const handleDelete = (indexToDelete) => {
        const updatedSpots = natureSpots.filter((_, index) => index !== indexToDelete);
        setNatureSpots(updatedSpots);
    };

    const handleDeleteInitiation = (index) => {
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

    const generateRandomSpots = () => {
        const spots = [];
        for (let i = 0; i < 10; i++) {
            spots.push({
                name: `Spot ${i + 1}`,
                description: `Description for spot ${i + 1}`,
                imageUrl: `https://picsum.photos/200/300?random=${i}`, // Random image URL from Picsum
            });
        }
        return spots;
    };

    const handleGenerateSpots = () => {
        const randomSpots = generateRandomSpots();
        setNatureSpots(randomSpots);
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


            <div className='row'>
                {natureSpots.map((spot, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                            <NatureSpot spot={spot}/>
                            <button className="btn btn-primary" onClick={() => handleEditInitiation(index)}>Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDeleteInitiation(index)}>Delete</button>
                        </div>
                    ))}
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

            <Footer />
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));