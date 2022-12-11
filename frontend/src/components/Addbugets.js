import { Form, Modal, Button } from "react-bootstrap"
import { useState } from "react"
import APIService from "../APIService"
import {useCookies} from 'react-cookie';



export default function AddBudgetModal({ show, handleClose }) {

  const [token] = useCookies(['mytoken'])
  // const [formData, setFormData] = useState({
  //   category: "",
  //   max_amount: 0
  // })

  const [max_amount, setMax_amount] = useState('');
  const [category, setCategory] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    APIService.CreateBudget({max_amount, category},token['mytoken'])
    .then((res) => {
      if(res.error){
        alert(res.error);
      }
      else{
        window.location.reload();
      }
    })
    .catch((err) => {
        console.log(err);
    });
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

            <Form.Select required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
          <option value=''>Select</option>
          <option value='ONLINE_SERVICES'>ONLINE SERVICES</option>
          <option value='TRAVEL'>TRAVEL</option>
          <option value='FOOD'>FOOD</option>
          <option value='RENT'>RENT</option>
          <option value='ENTERTAINMENT'>ENTERTAINMENT</option>
          <option value='BILLS'>BILLS</option>
          <option value='OTHERS'>OTHERS</option>
        </Form.Select>

          </Form.Group>
          <Form.Group className="mb-3" controlId="max_amount">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={0.01}
              value={max_amount}
              onChange={(e) => setMax_amount(e.target.value)}
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

