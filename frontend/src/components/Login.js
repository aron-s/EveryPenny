import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import logo from './images/everypennylogo.png';
import {Button} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import './myStyles.css';


function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)

    let navigate = useNavigate()

    useEffect(() => {
        if(token['mytoken']) {
            navigate('/MyProfile')
        }
    }, [token])

    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp => {
            if(resp.token){
                setToken('mytoken', resp.token)
            } else {
                alert('Invalid Credentials try again!')
            }
        })
        .catch(error => console.log(error))    
        // }
    }
    

    const registerBtn = () => {
        APIService.RegisterUser({username, password})
        .then(resp => {
            console.log(resp)
            if(resp.id){
                alert('Account created!')
                setLogin(true)
            } else if(resp.username) {
                alert('Account already exists!')
            } else {
                alert('Try again, your data failed validation. Username = email and the password between 8 to 24 digits.')
            }
            
        })
        .catch(error => console.log(error))
    }

    return (
        <Container>
            <div className='test'>
                <div  ><h1>Welcome to Every Penny!</h1></div>
                <div  ><img src={logo} alt="logo" class="img-fluid  w-25"/></div>
                <div  ><h2 className = 'reqlog'>Please {isLogin ? "Login" : "Register"}</h2></div>
                
                <div class="form-outline mb-4" >
                    <label htmlFor="username" className="form-label col-xs-4"></label>
                    <input type="text" className="form-control" id="username" placeholder="email"
                    value = {username} onChange = { e => setUsername(e.target.value)}/>
                    
                    <label htmlFor="password " className="form-label"></label>
                    <input type="password" className="form-control" id="password" placeholder="password"
                    value = {password} onChange = { e => setPassword(e.target.value)}/>
                </div> 
                <div className="p-3 d-grid gap-2">
                    {isLogin? <Button variant = "success" onClick={loginBtn}>Login</Button>
                    : <Button  variant = "success" onClick={registerBtn}>Register</Button>
                    }
                    
                    {isLogin? <h5><Button variant = "primary"  onClick={() => setLogin(false)}>Register Here</Button></h5>
                    : <h5><Button  variant = "primary" onClick={() => setLogin(true)}>Return to Login</Button></h5>
                    }   
                </div> 
            </div>
        </Container>
    )
}

export default Login