import {Button, Stack, Card, ProgressBar} from "react-bootstrap";
import {currencyFormatter} from './utils'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';




export default function BudgetCard({id, category, amount,max, gray, onAddExpenseClick, onViewExpenseClick}){
    const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  const [token] = useCookies(['mytoken'])


  const sendDeleteRequest = () => {
    APIService.DeleteBudget(id, token["mytoken"])
    .then(res => {
          if(res == 204){
            window.location.reload();
          }
        })
        .catch(error => console.log(error));
  } 

    return(
        <Card mb-3 className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{category}</div>
                    <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)} 
                    <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)} </span>
                    </div>

                </Card.Title>
                <ProgressBar className="rounded-pill"  
                variant = {getProgressBarVariant(amount,max)} 
                min = {0}
                max ={max}
                now ={amount}
                
                />
                <Stack direction = "horizontal" gap = '3' className = "mt-4">
                 <Button variant="outline-primary" onClick={onAddExpenseClick} className="ms-auto">Add Expense</Button>  
                 <Button variant="outline-secondary" onClick={onViewExpenseClick} className="">View Expenses</Button>  
                 <Button variant="outline-danger" onClick={() => sendDeleteRequest()}>Delete</Button>{' '}

                </Stack>

            </Card.Body>
        </Card>
    )
}
function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
  }