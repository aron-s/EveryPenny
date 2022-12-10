import {Stack, Modal, Button } from "react-bootstrap"


export default function viewexpensesModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction = "horizontal" gap = "2">
              <div> Expenses </div>

            </Stack>


          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
          
      
    </Modal>
  )
}

