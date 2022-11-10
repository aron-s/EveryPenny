import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import './myStyles.css';
import logo from './images/everypennylogo.png';


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
        // let validationFailed = false
        // APIService.ValidateCredentials({username, password})
        // .then(resp => {
        //     console.log(resp)
        //     if(resp.error){
        //         alert('Email already exists!')
        //         validationFailed = true
        //     } else {
        //         var errors = 'Errors found.'
        //         if(!resp.email){
        //             errors.concat(' Username is not an email.')
        //             validationFailed = true
        //         }
        //         if(!resp.password){
        //             errors.concat(' Password needs to be between 8-24 characters.')
        //             validationFailed = true
        //         }
        //         alert(errors)
        //     }
        // })
        // .catch(error => console.log(error))  

        // if(!validationFailed) {
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
        <div>
            <h1 className='welcome'>Welcome to Every Penny!</h1>
            <img className = 'logo'src={logo} alt="logo"/>
            <h2 className = 'reqlog'>Please {isLogin ? "Login" : "Register"}</h2>
            
            
            <div>
                <label htmlFor="username" className="form-label"></label>
                <input type="text" className="form-control" id="username" placeholder="email"
                value = {username} onChange = { e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password " className="form-label"></label>
                <input type="password" className="form-control" id="password" placeholder="password"
                value = {password} onChange = { e => setPassword(e.target.value)}/>
            </div> 
            {isLogin? <button onClick={loginBtn} className = 'logbtn'>Login</button>
            : <button className = 'logbtn' onClick={registerBtn}>Register</button>
            }
            <div>
                {isLogin? <h5><button className = 'logredir' onClick={() => setLogin(false)}>Register Here</button></h5>
                : <h5><button className = 'logredir' onClick={() => setLogin(true)}>Return to Login</button></h5>
                }
            </div> 
        </div>
    )
}

export default Login