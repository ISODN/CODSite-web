import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';
//import Modal from 'react-bootstrap/Modal';

//images
import plus from "../../node_modules/bootstrap-icons/icons/plus.svg";

const CreateFAQ = (props) => {
	const [show, setShow] = useState(false);
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			answer: answer,
			question: question
		};
		if (payload.answer && payload.answer) {
			axios.post(`http://localhost:3001/api/admin/create_faq`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	return (
		<>
			<button class="row btn px-1 py-1 mx-1 my-1" onClick={handleShow}>
				<img src={plus} alt="edit button" width="20" height="20"/>
				<a class="mx-1">Add</a>
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Adding FAQ</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="question">
							<Form.Label>Question</Form.Label>
							<Form.Control type="text" placeholder="Add your question here!" value={question} onChange={(event) => setQuestion(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="answer">
							<Form.Label>Answer</Form.Label>
							<Form.Control as="textarea" rows="5" placeholder="Add your answer here!" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
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

export default CreateFAQ;