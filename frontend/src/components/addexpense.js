import { Form, Modal, Button } from "react-bootstrap";
import APIService from '../APIService';
import {useCookies} from 'react-cookie';


export default function AddExpenseModal({ show, handleClose, category }) {
  const [token] = useCookies(['mytoken'])
  console.log("AddExpenseModal was called.");

  const handleSubmit2 = (amount, description, category) => {
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
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Amount">
            <Form.Label>Expense Amount</Form.Label>
            <Form.Control
              
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" onClick={() =>handleSubmit2("500", "description testing", "ONLINE_SERVICES")}>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

