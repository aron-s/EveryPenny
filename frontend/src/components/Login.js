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
    })

    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken', resp.token))
        .catch(error => console.log(error))
    }

    const registerBtn = () => {
        APIService.RegisterUser({username, password})
        .then(() => loginBtn)
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