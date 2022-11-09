import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

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
        let validationFailed = false
        APIService.ValidateCredentials({username}, {password})
        .then(resp => {
            console.log(resp)
            if(resp.error){
                alert('Email already exists!')
                validationFailed = true
            } else {
                var errors = 'Errors found.'
                if(!resp.email){
                    errors.concat(' Username is not an email.')
                    validationFailed = true
                }
                if(!resp.password){
                    errors.concat(' Password needs to be between 8-24 characters.')
                    validationFailed = true
                }
                alert(errors)
            }
        })
        .catch(error => console.log(error))  

        if(!validationFailed) {
            APIService.LoginUser({username, password})
            .then(resp => {
                if(resp.token){
                    setToken('mytoken', resp.token)
                } else {
                    alert('Invalid Credentials try again!')
                }
            })
            .catch(error => console.log(error))    
        }
    }

    const registerBtn = () => {
        APIService.RegisterUser({username, password})
        .then(() => {
            alert('account created')
            setLogin(true)
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h1>Please {isLogin ? "Login" : "Register"}</h1>
            
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" placeholder="username"
                value = {username} onChange = { e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="password"
                value = {password} onChange = { e => setPassword(e.target.value)}/>
            </div> 
            {isLogin? <button onClick={loginBtn}>Login</button>
            : <button onClick={registerBtn}>Register</button>
            }

            <br/>
            <div>
                {isLogin? <h5>If you dont have account, please <button onClick={() => setLogin(false)}>Register</button> here</h5>
                : <h5>If you have account, please <button onClick={() => setLogin(true)}>Login</button> here</h5>
                }
            </div> 
        </div>
    )
}

export default Login