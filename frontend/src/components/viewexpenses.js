import {Stack, Modal, Button } from "react-bootstrap"


export default function ViewExpensesModal({ show, handleClose, expensesList }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction = "vertical" gap = "2">
              <div> Expenses </div>
              {/* {expensesList?.map((expense) => {
                if(expense.category === show){
                  return (
                  <div className='' key ={expense.id}>

                  <li>
                  Description : {expense.description}, 
                  Amount: $ {expense.amount}</li>
                  </div>)
                }
                })} */}
            </Stack>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {expensesList?.map((expense) => {
                if(expense.category === show){
                  return (
                  <div className='mb-1' key ={expense.id}>
                  Description: {expense.description} <br></br>
                  Amount: ${expense.amount}
                  </div>
                  
                  )
                }
                })}

        </Modal.Body>
          
      
    </Modal>
  )
}

// Description: {expense.description} Amount: ${expense.amount}

