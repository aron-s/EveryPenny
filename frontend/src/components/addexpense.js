import { Form, Modal, Button } from "react-bootstrap";
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import { useState } from "react";


export default function AddExpenseModal({ show, handleClose}) {
  
  const category = show;
  const [token] = useCookies(['mytoken'])
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    APIService.CreateExpense({amount, description, category}, token['mytoken'])
    .then((res) => {
      if(!res.id){
        alert("Unable to create. Error!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Amount">
            <Form.Label>Expense Amount</Form.Label>
            <Form.Control
              
              type="number"
              required
              min={0}
              step={0.01}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

