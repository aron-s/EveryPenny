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
import viewexpensesModal from './viewexpenses';
import APIService from '../APIService';



function MyProfile() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showviewexpensesModal, setShowviewexpensesModal] = useState('')

    const [showAddExpenseModal, setShowAddExpenseModal] = useState('')
 
    console.log("My profile was called.")

    const [token, setToken, removeToken] = useCookies(['mytoken'])

    // start getExpenses

    const [budgets, setBudgets] = useState([]);
    useEffect(() => {
        fetchBudget();
      }, []);
    const fetchBudget = () => {
        APIService.GetBudgetUser(token['mytoken'])
        .then((res) => {
            console.log(res);
            setBudgets(res);
          })
        .catch((err) => {
            console.log(err);
        });
    }

    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        fetchExpenses();
      }, []);
    const fetchExpenses = async () => {
        console.log("request sent");    
        await APIService.GetExpensesUser(token['mytoken'])
        .then((res) => {
            setExpenses(res);
          })
        .catch((err) => {
            console.log(err);
        });
    }

    // end getExpense

    function openAddExpenseModal(category){
        console.log("input is " + category);
        setShowAddExpenseModal(category);
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

    const findSumOfCategory = (categ) => {
        let result = 0;
        for(let i= 0; i < expenses.length; i++){
            if(expenses[i].category === categ){
                result += parseInt(expenses[i].amount);
            }
        }
        // expenses.forEach((expense) => {
        //     if(expense.category === categ){
        //         result += expense.amount;
        //     }
        // });
        console.log(categ + " , " + result);
        return result;
    }

    if (expenses === undefined) {
        return <>Loading...</>;
    }
    

    var result = (
        <>
        <Container className='my-4'>
            <Stack direction='horizontal' gap ='2' className='mb-4'>
                <Button variant = 'danger' className = 'logout' onClick={logoutBtn}>Logout</Button>
                <h1 className="me-auto heading">Budgets</h1>
                <Button variant='primary' onClick={setShowAddBudgetModal} className='newbud'>New Budget</Button>
                
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
            <Stack gap="3">
            {budgets?.map((budget) => (
            <div className='card' key ={budget.id}>
                <BudgetCard 
                id = {budget.id}
                category = {budget.category} 
                gray 
                amount = {findSumOfCategory(budget.category)} 
                max = {budget.max_amount} 
                onAddExpenseClick = {() => openAddExpenseModal(budget.category)}
                onViewExpenseClick = {() => setShowviewexpensesModal(showviewexpensesModal)}
                
                />
            </div>
            ))}
            </Stack>
            
            

               
            </div>
        </Container>
        <AddBudgetModal show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}/>

         <AddExpenseModal show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal('')}
        />

        <viewExpensesModal 
        show={showviewexpensesModal}
        handleClose={() => setShowviewexpensesModal()}
        />
        </>

    )

    return result;
}

export default MyProfile