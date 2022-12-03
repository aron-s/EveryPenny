import { Form, Modal, Button } from "react-bootstrap"


export default function AddExpenseModal({ show, handleClose }) {
  function handleSubmit(e) {

  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Description</Form.Label>
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
          <Form.Group className="mb-3" controlId="budgetID">
            <Form.Label>Select Which Budget</Form.Label>
            <Form.Select
              defaultValue="N/a"
              >

            </Form.Select>
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

