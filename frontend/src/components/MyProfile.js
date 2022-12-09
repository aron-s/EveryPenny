import React, {useEffect ,useState} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
// import logo from './images/everypennylogo.png';
import Container from 'react-bootstrap/Container'
import { Button, Stack } from 'react-bootstrap';
import BudgetCard from './BudgetCard';

import './myStyles.css';
import AddBudgetModal from './Addbugets';
import AddExpenseModal from './addexpense';
import APIService from '../APIService';



function MyProfile() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

    

    const [token, setToken, removeToken] = useCookies(['mytoken'])

    function openAddExpenseModal(){
        setShowAddExpenseModal(true)
    }

    let navigate = useNavigate()

    useEffect(() => {
        if(!token['mytoken']) {
            alert('you are not logged in!')
            navigate("/")
        }
    }, [token])

    const logoutBtn = () => {
        removeToken(['mytoken'])
        alert('logging out.')
        navigate("/")
    }

    const expenses = APIService.GetExpensesUser(token['mytoken']);

    var result = (
        <>
        <Container className='my-4'>
            <Stack direction='horizontal' gap ='2' className='mb-4'>
                <Button variant = 'danger' className = 'logout' onClick={logoutBtn}>Logout</Button>
                <h1 className="me-auto heading">Budgets</h1>
                <Button variant='primary' onClick={setShowAddBudgetModal} className='newbud'>New Budget</Button>
                <Button variant='outline-primary' onClick={setShowAddExpenseModal} className='addexp'>Add Expense</Button>
            </Stack>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start",
                }}
                id="bugdetContainer"
            >
            {/* <script>
            for (let i = 0; i < expenses.length; i++) {
                expense = expenses[i];
                <BudgetCard name = "expense.Category" gray amount ={expense} max = {1000} onAddExpenseClick = {() => openAddExpenseModal()}></BudgetCard> 
            };
            </script> */}
            

               
            </div>
        </Container>
        <AddBudgetModal show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}/>

         <AddExpenseModal show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        />
        </>

    )

    // var budgetContainer = document.getElementById("bugdetContainer");
    console.log(expenses);
    for (let i = 0; i < expenses.length; i++) {
        var expense = expenses[i];
        console.log(expense);
       // budgetContainer.appendChild("<BudgetCard name = "expense.Category" gray amount ={expense} max = {1000} onAddExpenseClick = {() => openAddExpenseModal()}/> ");
    };


    return result;
}

export default MyProfile