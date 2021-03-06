import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';
import {PlusIcon} from "@primer/octicons-react";

const CreateResource = (props) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("Misc");
	const [rating, setRating] = useState(1);
	const [difficulty, setDifficulty] = useState(1);
	const [length, setLength] = useState(1);
	const [description, setDescription] = useState("");
	const [resourceLink, setResourceLink] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			name: name,
			rating: rating,
			difficulty: difficulty,
			length: length,
			resourceLink: resourceLink
		};
		if (category) {
			payload["category"] = category;
		}
		if (description) {
			payload["description"] = description;
		}
		console.log(payload);
		if (payload.name && payload.resourceLink) {
			axios.post(`/api/resources/create_resource`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	return (
		<>
			<button class="row btn px-1 py-1 mx-1 my-1" onClick={handleShow}>
				<PlusIcon/>
				<a class="mx-1 align-middle">Add</a>
			</button>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Adding Resource</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Resource Name</Form.Label>
							<Form.Control type="text" placeholder="Add a unique name here!" value={name} onChange={(event) => setName(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control as="select" value={category} onChange={(event) => setCategory(event.target.value)}>
								{
									props.categories.map(item => {
										return (
											<option>{item}</option>
										)
									})
								}
							</Form.Control>						</Form.Group>
						<Form.Group controlId="rating">
							<Form.Label>Rating</Form.Label>
							<Form.Control type="range" min="1" max="5" step="1" value={rating} onChange={(event) => setRating(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="difficulty">
							<Form.Label>Difficulty</Form.Label>
							<Form.Control type="range" min="1" max="5" step="1" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="length">
							<Form.Label>Length</Form.Label>
							<Form.Control type="range" min="1" max="5" step="1" value={length} onChange={(event) => setLength(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows="3" placeholder="Add a short description here!" value={description} onChange={(event) => setDescription(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="resourceLink">
							<Form.Label>Resource Link</Form.Label>
							<Form.Control as="textarea" rows="2" placeholder="Insert resource link here!" value={resourceLink} onChange={(event) => setResourceLink(event.target.value)}/>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default CreateResource;