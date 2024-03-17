import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({ show, onHide, spot, onSave, index }) => {
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (spot) {
            setEditForm({ ...spot });
        }
    }, [spot]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(editForm, index);
        onHide(); // Close the modal and reset the modalShow state
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
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditModal;
