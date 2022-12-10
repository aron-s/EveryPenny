import { Form, Modal, Button } from "react-bootstrap"
import { useState } from "react"


export default function AddBudgetModal({ show, handleClose }) {

  const [formData, setFormData] = useState({
    category: "",
    max_amount: 0
  })

  function handleSubmit(e) {
   
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select required>
          <option>ONLINE_SERVICES</option>
          <option>TRAVEL</option>
          <option>FOOD</option>
          <option>RENT</option>
          <option>ENTERTAINMENT</option>
          <option>BILLS</option>
          <option>OTHERS</option>
        </Form.Select>

          </Form.Group>
          <Form.Group className="mb-3" controlId="max_amount">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              
              type="number"
              required
              min={0}
              step={0.01}
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

