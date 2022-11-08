import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()
    const [token, setToken] = useCookies(['mytoken'])

    useEffect(() => {
        if(token['mytoken']) {
            alert('success!')
        }
    })

    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h1>Please login</h1>
            <button onClick={loginBtn}>Login</button>
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
        </div>
    )
}

export default Login