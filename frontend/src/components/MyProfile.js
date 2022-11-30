import React, {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
// import logo from './images/everypennylogo.png';
import Container from 'react-bootstrap/Container'
import { Button, Stack } from 'react-bootstrap';
import BudgetCard from './BudgetCard';

import './myStyles.css';



function MyProfile() {

    const [token, setToken, removeToken] = useCookies(['mytoken'])

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

    return (
        <Container className='my-4'>
            <Stack direction='horizontal' gap ='2' className='mb-4'>
                <Button variant = 'danger' className = 'logout' onClick={logoutBtn}>Logout</Button>
                <h1 className="me-auto heading">Budgets</h1>
                <Button variant='primary' className='newbud'>New Budget</Button>
                <Button variant='outline-primary' className='addexp'>Add Expense</Button>
            </Stack>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start",
                }}
            >
                <BudgetCard name = "TestBudget" amount ={100} max = {1000}></BudgetCard> 
            </div>

            

            


        </Container>

    )
}

export default MyProfile