//EditModal.js


import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({ show, onHide, spot, onSave, index }) => {
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        //  ensures that spot is defined before trying to set state
        if (spot) {
            setEditForm({ name: spot.name, description: spot.description, imageUrl: spot.imageUrl });
        }
    }, [spot]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editForm, index); // Pass the updated form and index back to the parent component
        onHide(); // Close the modal
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Nature Spot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={editForm.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={editForm.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
